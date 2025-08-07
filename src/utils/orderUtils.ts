import emailjs from '@emailjs/browser';
import { pakistaniCities, promoCodes } from '../data/cities';
import { Order } from '../types/order';

// Global counter for order numbers
let orderCounter = 1;

export const generateOrderNumber = (): string => {
  const paddedNumber = orderCounter.toString().padStart(12, '0');
  orderCounter++;
  return `MTW${paddedNumber}`;
};

export const calculateDeliveryCharges = (subtotal: number): number => {
  if (subtotal >= 1000 && subtotal < 2000) {
    return 350;
  } else if (subtotal >= 2000 && subtotal < 3000) {
    return 450;
  } else if (subtotal >= 3000 && subtotal < 4000) {
    return 500;
  } else if (subtotal >= 4000 && subtotal < 5000) {
    return 650;
  } else if (subtotal >= 5000 && subtotal < 10000) {
    return Math.round(subtotal * 0.125); // 12.5%
  } else if (subtotal >= 10000) {
    return Math.round(subtotal * 0.09); // 9%
  } else {
    return 250; // Default for orders below PKR 1000
  }
};

export const validatePromoCode = (code: string, subtotal: number): { valid: boolean; discount: number; message: string } => {
  const promoCode = promoCodes.find(p => p.code.toLowerCase() === code.toLowerCase() && p.active);
  
  if (!promoCode) {
    return { valid: false, discount: 0, message: 'Invalid promo code' };
  }
  
  if (subtotal < promoCode.minPurchase) {
    return { 
      valid: false, 
      discount: 0, 
      message: `Minimum purchase of PKR ${promoCode.minPurchase} required for this promo code` 
    };
  }
  
  const discountAmount = Math.round(subtotal * (promoCode.discount / 100));
  return { 
    valid: true, 
    discount: discountAmount, 
    message: `${promoCode.discount}% discount applied!` 
  };
};

export const isCODAvailable = (city: string): boolean => {
  return false; // COD disabled as per requirements
};

export const getEstimatedDelivery = (city: string): string => {
  const cityData = pakistaniCities.find(c => c.name === city);
  const days = cityData?.estimatedDays || '3-5 days';

  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + parseInt(days.split('-')[1] || '3'));

  return deliveryDate.toLocaleDateString('en-PK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatPhoneNumber = (phone: string, countryCode: string = '+92'): string => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on country code
  if (countryCode === '+92') {
    if (cleaned.startsWith('92')) {
      return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
    } else if (cleaned.startsWith('0')) {
      return `+92 ${cleaned.slice(1, 4)} ${cleaned.slice(4)}`;
    } else {
      return `+92 ${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    }
  } else {
    // For other countries, just add the country code
    return `${countryCode} ${cleaned}`;
  }
};

export const validatePhoneNumber = (phone: string, countryCode: string = '+92'): boolean => {
  const cleaned = phone.replace(/\D/g, '');

  if (countryCode === '+92') {
    // Pakistani mobile numbers: 03XX XXXXXXX (11 digits total including 0)
    // Or +92 3XX XXXXXXX (12 digits total including +92)
    if (cleaned.startsWith('92')) {
      return cleaned.length === 12 && cleaned.startsWith('923');
    } else if (cleaned.startsWith('0')) {
      return cleaned.length === 11 && cleaned.startsWith('03');
    } else {
      return cleaned.length === 10 && cleaned.startsWith('3');
    }
  } else {
    // Basic validation for other countries (at least 7 digits)
    return cleaned.length >= 7 && cleaned.length <= 15;
  }
};

// Helper function to format custom package details for display
export const formatCustomPackageDetails = (item: any): string => {
  if (item.type !== 'custom' || !item.details) {
    return item.name;
  }

  const { level, subjects, binding } = item.details;

  // Format subjects with papers and years
  const subjectDetails = subjects?.map((subject: any) => {
    const papers = subject.papers?.map((paperInfo: any) => {
      if (typeof paperInfo === 'string') {
        return paperInfo;
      }
      return `${paperInfo.paper} (${paperInfo.yearRange})`;
    }).join(', ') || 'No papers';
    return `${subject.name} (${papers})`;
  }).join('; ') || 'No subjects';

  return `${level} Package - ${subjects?.length || 0} Subjects: ${subjectDetails} | Binding: ${binding}`;
};

// Helper function to format custom package details for email (plain text)
export const formatCustomPackageForEmail = (item: any): string => {
  if (item.type !== 'custom' || !item.details) {
    return item.name;
  }

  const { level, subjects, binding } = item.details;

  // Create a more detailed description for email
  let description = `${level} Package (${subjects?.length || 0} subjects)`;

  if (subjects && subjects.length > 0) {
    description += ` - Subjects: `;
    const subjectList = subjects.map((subject: any) => {
      const papers = subject.papers?.map((paperInfo: any) => {
        if (typeof paperInfo === 'string') {
          return paperInfo;
        }
        return `${paperInfo.paper} (${paperInfo.yearRange})`;
      }).join(', ') || 'No papers';
      return `${subject.name} (${papers})`;
    }).join(', ');
    description += subjectList;
  }

  description += ` - Binding: ${binding}`;

  return description;
};

// Helper function to format detailed order items for dashboard
export const formatOrderItemDetails = (item: any): string => {
  if (item.type !== 'custom' || !item.details) {
    return 'Standard product';
  }

  const { level, subjects, binding, notes } = item.details;
  
  let details = `${level} Package\n`;
  
  if (subjects && subjects.length > 0) {
    details += `Subjects (${subjects.length}):\n`;
    subjects.forEach((subject: any, index: number) => {
      details += `${index + 1}. ${subject.name} (${subject.code || 'N/A'})\n`;
      if (subject.papers && subject.papers.length > 0) {
        const paperDetails = subject.papers.map((paperInfo: any) => {
          if (typeof paperInfo === 'string') {
            return paperInfo;
          }
          return `${paperInfo.paper} (${paperInfo.session}, ${paperInfo.yearRange})`;
        }).join(', ');
        details += `   Papers: ${paperDetails}\n`;
      }
    });
  }
  
  details += `Binding: ${binding}\n`;
  
  if (notes) {
    details += `Notes: ${notes}`;
  }
  
  return details;
};

// Initialize EmailJS
emailjs.init('wUkW3SvPviFH8AWJR');

export const sendOrderEmail = async (order: Order): Promise<boolean> => {
  try {
    // Format order items as a plain text string for the email
    const orderItems = order.items.map(item => {
      const itemName = formatCustomPackageForEmail(item);
      const itemTotal = `PKR ${item.price * item.quantity}`;
      
      // Create a simple, multi-line string for each item
      return `${itemName}\nQuantity: ${item.quantity}\nPrice: ${itemTotal}`;
    }).join('\n\n'); // Separate each item with two newlines for readability

    const templateParams = {
      order_id: order.orderNumber,
      order_date: new Date(order.createdAt).toLocaleDateString('en-PK'),
      order_total: order.total.toString(),
      payment_method: order.payment.type.toUpperCase(),
      customer_name: `${order.customer.firstName} ${order.customer.lastName}`,
      customer_email: order.customer.email,
      customer_phone: order.customer.phone,
      customer_address: `${order.delivery.address}, ${order.delivery.city}`,
      order_items: orderItems // This is now a plain text string
    };

    const response = await emailjs.send(
      'service_gb4ebv3',
      'template_6bjfc97',
      templateParams
    );

    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send order email:', error);
    return false;
  }
};

export const sendCustomerConfirmation = async (order: Order): Promise<boolean> => {
  try {
    // This would be a separate template for customer confirmation
    // For now, we'll just log it
    console.log('Customer confirmation would be sent to:', order.customer.email);
    return true;
  } catch (error) {
    console.error('Failed to send customer confirmation:', error);
    return false;
  }
};