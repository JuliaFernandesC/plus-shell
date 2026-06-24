import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const LoginPage    = lazy(() => import("mfe_auth/LoginPage"));
const RegisterPage = lazy(() => import("mfe_auth/RegisterPage"));
const SuccessPage  = lazy(() => import("mfe_auth/SuccessPage"));
const DashboardPage = lazy(() => import("mfe_auth/DashboardPage"));

const ProductListPage      = lazy(() => import("mfe_product/ProductListPage"));
const ProductDetailPage    = lazy(() => import("mfe_product/ProductDetailPage"));
const ProductEditAdminPage = lazy(() => import("mfe_product/ProductEditAdminPage"));

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Carregando...</p>}>
        <Routes>
          {/* Auth */}
          <Route path="/login"    element={<LoginPage onLogin={() => (window.location.href = "/success")} />} />
          <Route path="/success"  element={<SuccessPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/"         element={<PrivateRoute><DashboardPage /></PrivateRoute>} />

          {/* Produtos - público */}
          <Route path="/products"     element={<PrivateRoute><ProductListPage title="Produtos" products={[]} /></PrivateRoute>} />
          <Route path="/products/:id" element={<PrivateRoute><ProductDetailPage product={null} /></PrivateRoute>} />

          {/* Produtos - admin */}
          <Route path="/admin/products" element={<PrivateRoute><ProductEditAdminPage products={[]} onCreateProduct={() => {}} onLoadProduct={() => {}} onUpdateProduct={() => {}} /></PrivateRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}