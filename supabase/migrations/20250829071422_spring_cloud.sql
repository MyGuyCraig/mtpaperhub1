/*
  # Create orders table and related infrastructure

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `order_number` (text, unique)
      - `customer_info` (jsonb)
      - `delivery_info` (jsonb)
      - `payment_info` (jsonb)
      - `items` (jsonb)
      - `subtotal` (numeric)
      - `delivery_charges` (numeric)
      - `total` (numeric)
      - `status` (text, default 'pending')
      - `payment_status` (text, default 'pending')
      - `promo_code` (text, nullable)
      - `promo_discount` (numeric, default 0)
      - `notes` (text, nullable)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `orders` table
    - Add policies for public access (insert, select, update)

  3. Indexes
    - Index on created_at for sorting
    - Index on order_number for lookups
    - Index on status and payment_status for filtering

  4. Triggers
    - Auto-update updated_at column on record changes
*/

-- Create the 'update_updated_at_column' function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the 'orders' table
CREATE TABLE IF NOT EXISTS public.orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number text NOT NULL UNIQUE,
    customer_info jsonb NOT NULL,
    delivery_info jsonb NOT NULL,
    payment_info jsonb NOT NULL,
    items jsonb NOT NULL,
    subtotal numeric NOT NULL DEFAULT 0,
    delivery_charges numeric NOT NULL DEFAULT 0,
    total numeric NOT NULL DEFAULT 0,
    status text NOT NULL DEFAULT 'pending'::text,
    payment_status text NOT NULL DEFAULT 'pending'::text,
    promo_code text,
    promo_discount numeric DEFAULT 0,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders USING btree (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders USING btree (order_number);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders USING btree (payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders USING btree (status);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
DO $$
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Anyone can insert orders" ON public.orders;
    DROP POLICY IF EXISTS "Public can read orders" ON public.orders;
    DROP POLICY IF EXISTS "Public can update orders" ON public.orders;
    
    -- Create new policies
    CREATE POLICY "Anyone can insert orders" ON public.orders
        FOR INSERT WITH CHECK (true);

    CREATE POLICY "Public can read orders" ON public.orders
        FOR SELECT USING (true);

    CREATE POLICY "Public can update orders" ON public.orders
        FOR UPDATE USING (true) WITH CHECK (true);
END $$;

-- Create trigger for updated_at column
DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON public.orders 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();