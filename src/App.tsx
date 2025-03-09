import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "@/pages/signup";
import SigninPage from "@/pages/signin";
import Dashboard from "@/pages/dashboard";
import SendMoneyPage from "@/pages/sendMoney";
import { Navbar } from "@/components/custom/navbar";
import { Balance } from "@/components/custom/balance";
import { RecoilRoot } from "recoil";
import { Toaster } from "@/components/ui/toaster";
import { useRefreshToken } from "@/hooks/useRefreshToken";

function App() {
  useRefreshToken();
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar name="Md Mahtab Ansari" />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Balance balance={100000} />} />
          <Route path="/send/:userName" element={<SendMoneyPage />} />
        </Routes>
        <Toaster />
      </Router>

    </RecoilRoot>
  );
}

export default App;
