"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default ({ children }: { children: React.ReactNode }) => {
  const error = useSearchParams().get("error");
  const session = useSession();
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    if (error) {
      toast("Can't create a new account", {
        description: error,
      });
      router.push(path);
    }
  }, [error, session]);
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="bg-background border-b px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Chat</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </header>
      {children}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Acme Chat. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

function MountainIcon(props: any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
