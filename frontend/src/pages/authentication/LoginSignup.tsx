import React from "react";
import { Tabs, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import Login from "../authentication/Login";
import Signup from "../authentication/Signup";

interface UserData {
  userId: string;
  firstName: string;
  lastName: string;
  token: string;
}

interface LoginSignupProps {
  onLoginSuccess: (username: string, userData: UserData) => void;
}

const LoginSignup: React.FC<LoginSignupProps> = ({ onLoginSuccess }) => {
  return (
    <div className="login-signup-wrapper">
      <div className="login-signup-header">
        <h2>Welcome to TravelGenie</h2>
        <p className="text-muted">
          Sign in to your account or create a new one to start planning your
          next adventure.
        </p>
      </div>

      <Tabs defaultValue="login">
        <TabsTrigger value="login">Log In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>

        <TabsContent value="login">
          <Login onLoginSuccess={onLoginSuccess} />
        </TabsContent>

        <TabsContent value="signup">
          <Signup onSignupSuccess={onLoginSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginSignup;
