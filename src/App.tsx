import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BuildYourOwnPage from './pages/BuildYourOwnPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderDashboard from './pages/OrderDashboard';
import SecureOrderDashboard from './pages/SecureOrderDashboard';
import NotFoundPage from './pages/NotFoundPage';
import OLevelPage from './pages/OLevelPage';
import ALevelPage from './pages/ALevelPage';
import IGCSEPage from './pages/IGCSEPage';
import CustomRequestsPage from './pages/CustomRequestsPage';
import OLevelNotesPage from './pages/notes/OLevelNotesPage';
import ASLevelNotesPage from './pages/notes/ASLevelNotesPage';
import ALevelNotesPage from './pages/notes/ALevelNotesPage';
import IGCSENotesPage from './pages/notes/IGCSENotesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="notes/o-level" element={<OLevelNotesPage />} />
        <Route path="notes/as-level" element={<ASLevelNotesPage />} />
        <Route path="notes/a-level" element={<ALevelNotesPage />} />
        <Route path="notes/igcse" element={<IGCSENotesPage />} />
        <Route path="o-level" element={<OLevelPage />} />
        <Route path="a-level" element={<ALevelPage />} />
        <Route path="igcse" element={<IGCSEPage />} />
        <Route path="build-your-own" element={<BuildYourOwnPage />} />
        <Route path="custom-requests" element={<CustomRequestsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="admin/orders" element={<OrderDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Secure admin route outside of main layout */}
      <Route path="/abdullahazeem/orders" element={<SecureOrderDashboard />} />
    </Routes>
  );
}

export default App;