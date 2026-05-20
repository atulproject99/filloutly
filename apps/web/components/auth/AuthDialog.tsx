"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "~/components/ui/input-otp";
import { Loader2 } from "lucide-react";

// Schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const otpSchema = z.object({
  pin: z.string().length(6, "Please enter a 6-digit PIN."),
});

type ViewState = "login" | "register" | "otp";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialView?: ViewState;
}

export function AuthDialog({ isOpen, onOpenChange, initialView = "login" }: AuthDialogProps) {
  const [view, setView] = useState<ViewState>(initialView);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // Reset view when dialog opens
  useEffect(() => {
    if (isOpen) {
      setView(initialView);
      setCountdown(30);
    }
  }, [isOpen, initialView]);

  // Timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (view === "otp" && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [view, countdown]);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { pin: "" },
  });

  const onLoginSubmit = async (_values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setView("otp");
  };

  const onRegisterSubmit = async (_values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setView("otp");
  };

  const onOtpSubmit = async (_values: z.infer<typeof otpSchema>) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    onOpenChange(false); // Close dialog on success
  };

  const handleResend = () => {
    setCountdown(30);
    // Simulate resend logic here
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#0a0a0a] border border-white/10 text-white shadow-2xl glass-card">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.15)_0%,transparent_70%)] pointer-events-none" />
        
        <DialogHeader className="relative z-10">
          <div className="mx-auto w-12 h-12 rounded-xl bg-red-600/20 flex items-center justify-center mb-4 border border-red-500/30 crimson-glow">
            <div className="w-6 h-6 bg-red-500 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.8)]"></div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            {view === "login" && "Welcome back"}
            {view === "register" && "Join the elite"}
            {view === "otp" && "Verify your identity"}
          </DialogTitle>
          <DialogDescription className="text-center text-neutral-400">
            {view === "login" && "Enter your credentials to access the vault."}
            {view === "register" && "Create your cinematic creator account."}
            {view === "otp" && "We sent a 6-digit code to your email."}
          </DialogDescription>
        </DialogHeader>

        <div className="relative z-10 mt-4">
          {view === "login" && (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-300">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} className="bg-white/5 border-white/10 text-white focus-visible:ring-red-500 focus-visible:border-red-500 h-11" />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-300">Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} className="bg-white/5 border-white/10 text-white focus-visible:ring-red-500 focus-visible:border-red-500 h-11" />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full h-11 bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] mt-6 font-semibold">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Access Vault"}
                </Button>
                <div className="text-center text-sm text-neutral-400 mt-4">
                  Don&apos;t have an account?{" "}
                  <button type="button" onClick={() => setView("register")} className="text-red-400 hover:text-red-300 font-medium">
                    Register
                  </button>
                </div>
              </form>
            </Form>
          )}

          {view === "register" && (
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <FormField
                  control={registerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-300">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-white/5 border-white/10 text-white focus-visible:ring-red-500 focus-visible:border-red-500 h-11" />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-300">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} className="bg-white/5 border-white/10 text-white focus-visible:ring-red-500 focus-visible:border-red-500 h-11" />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-300">Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} className="bg-white/5 border-white/10 text-white focus-visible:ring-red-500 focus-visible:border-red-500 h-11" />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full h-11 bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] mt-6 font-semibold">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
                </Button>
                <div className="text-center text-sm text-neutral-400 mt-4">
                  Already have an account?{" "}
                  <button type="button" onClick={() => setView("login")} className="text-red-400 hover:text-red-300 font-medium">
                    Log in
                  </button>
                </div>
              </form>
            </Form>
          )}

          {view === "otp" && (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6 flex flex-col items-center">
                <FormField
                  control={otpForm.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center w-full">
                      <FormControl>
                        <InputOTP maxLength={6} {...field} className="gap-2">
                          <InputOTPGroup className="gap-2">
                            <InputOTPSlot index={0} className="w-12 h-14 bg-white/5 border-white/10 text-white text-lg rounded-md" />
                            <InputOTPSlot index={1} className="w-12 h-14 bg-white/5 border-white/10 text-white text-lg rounded-md" />
                            <InputOTPSlot index={2} className="w-12 h-14 bg-white/5 border-white/10 text-white text-lg rounded-md" />
                            <InputOTPSlot index={3} className="w-12 h-14 bg-white/5 border-white/10 text-white text-lg rounded-md" />
                            <InputOTPSlot index={4} className="w-12 h-14 bg-white/5 border-white/10 text-white text-lg rounded-md" />
                            <InputOTPSlot index={5} className="w-12 h-14 bg-white/5 border-white/10 text-white text-lg rounded-md" />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage className="text-red-400 mt-2" />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full h-11 bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] font-semibold">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Identity"}
                </Button>
                <div className="text-center text-sm text-neutral-400 w-full">
                  {countdown > 0 ? (
                    <span>Resend code in {countdown}s</span>
                  ) : (
                    <button type="button" onClick={handleResend} className="text-red-400 hover:text-red-300 font-medium">
                      Resend Code
                    </button>
                  )}
                </div>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
