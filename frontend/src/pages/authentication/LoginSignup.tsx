import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import Login from "../authentication/Login";
import Signup from "../authentication/Signup";

interface LoginSignupProps {
  onLoginSuccess: (username: string) => void;
}

const LoginSignup: React.FC<LoginSignupProps> = ({ onLoginSuccess }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    if (location.state?.showLogin) {
      setActiveTab("login");
    }
  }, [location.state]);
  return (
    <div className="login-signup-wrapper">
      <div className="login-signup-header">
        <h2>Welcome to TravelGenie</h2>
        <p className="text-muted">
          Sign in to your account or create a new one to start planning your
          next adventure.
        </p>
      </div>

      <Tabs defaultValue={activeTab}>
        <TabsTrigger value="login">Log In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>

        <TabsContent value="login">
          <Login onLoginSuccess={onLoginSuccess} />
        </TabsContent>

        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginSignup;
