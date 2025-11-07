import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { Activity, Lock, User, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock users for demonstration
  const mockUsers = [
    { username: 'admin', password: 'admin123', role: 'admin', name: 'Dr. Admin' },
    { username: 'user', password: 'user123', role: 'user', name: 'Healthcare User' }
  ];

  useEffect(() => {
    // Check if already logged in
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const user = mockUsers.find(
        u => u.username === formData.username && u.password === formData.password
      );

      if (user) {
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify({
          username: user.username,
          role: user.role,
          name: user.name
        }));
        
        toast.success('Login successful!', {
          description: `Welcome back, ${user.name}`
        });
        
        navigate('/dashboard');
      } else {
        toast.error('Login failed', {
          description: 'Invalid username or password'
        });
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-accent-light to-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-teal">
            <Activity className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold font-display text-foreground mb-2">
            Patient Portal Analytics
          </h1>
          <p className="text-muted-foreground">
            Secure healthcare engagement dashboard
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-display">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Demo credentials info */}
              <div className="bg-accent-light p-3 rounded-lg text-sm space-y-1">
                <p className="font-semibold text-accent">Demo Credentials:</p>
                <p className="text-muted-foreground">Admin: <span className="font-mono">admin / admin123</span></p>
                <p className="text-muted-foreground">User: <span className="font-mono">user / user123</span></p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
              
              <div className="flex items-center justify-between w-full text-sm">
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => toast.info('Demo Feature', { description: 'This is a demo. No registration needed.' })}
                >
                  Create account
                </button>
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => toast.info('Demo Feature', { description: 'Use demo credentials above to login.' })}
                >
                  Forgot password?
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Healthcare data security compliant • HIPAA certified
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
