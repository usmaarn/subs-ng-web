import { BrowserRouter, Route, Routes } from "react-router";
import { ErrorPage } from "./pages/ErrorPage";
import { HomePage } from "./pages/HomePage";
import RegisterPage from "./pages/auth/RegisterPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import LoginPage from "./pages/auth/LoginPage";
import { Toaster } from "./components/ui/toast";
import { DashboardPage } from "./pages/dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FundWalletPage from "./pages/dashboard/FundWallet";
import FlyOnProvider from "./components/FlyonProvider";

const queryClient = new QueryClient();


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FlyOnProvider>
          <Routes>
            <Route errorElement={<ErrorPage />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="verify-email" element={<VerifyEmailPage />} />
            </Route>
            <Route path="app">
              <Route index element={<DashboardPage />} />
              <Route path="wallet/fund" element={<FundWalletPage />} />
            </Route>
          </Routes>
        </FlyOnProvider>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}
