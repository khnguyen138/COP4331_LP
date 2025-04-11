import React from "react";
import { Tabs, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import Login from "../authentication/Login";
import Signup from "../authentication/Signup";

const LoginSignup: React.FC = () => {
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
          <Login
            onLoginSuccess={(username) =>
              console.log(`Logged in as ${username}`)
            }
          />
        </TabsContent>

        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginSignup;
