"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import { Input } from "@repo/ui/components/ui/input";
import { signIn } from "next-auth/react";
import { useRef } from "react";
import { z } from "zod";
import { toast } from "sonner";

export default function Component() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const formInput = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const validate = formInput.safeParse({
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    });
    if (!validate.success) {
      toast("Validation failed", {
        description: JSON.stringify(validate.error),
      });
      return;
    }
    try {
      const output = await signIn("login", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        redirect: false,
      });
      if (output?.ok) {
        toast("Login successful");
      } else {
        toast("Can't login", {
          description: output?.error,
        });
      }
    } catch (error: any) {
      toast("Can't login", {
        description: error.message,
      });
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button
              variant="outline"
              onClick={() => {
                signIn("github");
              }}
            >
              <GithubIcon className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                signIn("google");
              }}
            >
              <ChromeIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              ref={emailRef}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" ref={passwordRef} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

function ChromeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function GithubIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
