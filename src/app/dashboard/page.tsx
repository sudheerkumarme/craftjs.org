"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  PenLine,
  Twitter,
  Github,
  ExternalLink,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";

type ExtendedUserData = {
  name: string;
  email: string;
  image?: string;
  signupDate?: string;
  lastLogin?: string;
  earlyAccess?: boolean;
  earlyAccessSignupDate?: string;
  role?: string;
  preferences?: {
    theme?: string;
    notifications?: boolean;
  };
};

function DiscordIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.07.07 0 00-.074.035c-.211.374-.444.86-.608 1.245-1.844-.276-3.68-.276-5.486 0-.164-.39-.405-.87-.616-1.245a.076.076 0 00-.074-.035 19.736 19.736 0 00-4.885 1.515.07.07 0 00-.032.027C.533 9.043-.319 13.579.099 18.057a.082.082 0 00.031.055 19.932 19.932 0 005.993 3.058.07.07 0 00.078-.027c.461-.63.874-1.295 1.226-1.994a.07.07 0 00-.041-.098 13.15 13.15 0 01-1.872-.898.07.07 0 01-.007-.12c.125-.094.25-.192.371-.291a.07.07 0 01.077-.01c3.927 1.793 8.18 1.793 12.061 0a.07.07 0 01.078.009c.121.099.246.197.371.291a.07.07 0 01-.006.12 12.94 12.94 0 01-1.873.898.07.07 0 00-.04.099c.36.7.772 1.364 1.225 1.994a.07.07 0 00.078.028 19.9 19.9 0 005.994-3.058.082.082 0 00.031-.055c.5-5.177-.838-9.673-3.548-13.661a.07.07 0 00-.03-.028zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.174 1.1 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.174 1.1 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z" />
    </svg>
  );
}

export default function Dashboard() {
  const { user, logout, status } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [extendedUserData, setExtendedUserData] =
    useState<ExtendedUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchUserData() {
      if (user && status === "authenticated") {
        try {
          const response = await fetch("/api/user");
          if (response.ok) {
            const data = await response.json();
            setExtendedUserData(data.user);
          }
        } catch (error) {
          console.error("Error fetching extended user data:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchUserData();
  }, [user, status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Use extended user data if available, otherwise fall back to session user data
  const displayUser = extendedUserData || user;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <PenLine className="h-6 w-6 text-primary" />
            </motion.div>
            <span className="font-bold text-xl">CraftJS</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="mr-2"
            >
              {mounted && (
                <>
                  {theme === "light" ? (
                    <Moon className="h-[1.2rem] w-[1.2rem]" />
                  ) : (
                    <Sun className="h-[1.2rem] w-[1.2rem]" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </>
              )}
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                {displayUser.image ? (
                  <img
                    src={displayUser.image || "/placeholder.svg"}
                    alt={displayUser.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <span className="text-sm font-medium">
                    {displayUser.name?.charAt(0)}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium hidden md:inline-block">
                {displayUser.name}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="border-primary/20 bg-card">
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  <h1 className="text-2xl font-bold">
                    Early Access Confirmation
                  </h1>
                </div>

                <div className="space-y-4 text-lg">
                  <p>
                    Hi {displayUser.name?.split(" ")[0]}, happy to see you
                    signup for early access!
                  </p>

                  <p className="text-foreground/90">
                    We are still under construction, but you will be one of the
                    first users to get access to the product as soon as we are
                    ready with it. We appreciate your patience.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 py-2">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      asChild
                    >
                      <a
                        href="https://x.com/sudheerkumarme"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="h-4 w-4" />
                        <span>Track progress on Twitter/X</span>
                        <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      asChild
                    >
                      <a
                        href="https://github.com/nextcrafter/craftjs"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                        <span>Find us on GitHub</span>
                        <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      asChild
                    >
                      <a
                        href="https://discord.gg/jwT9PkQFsj"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DiscordIcon className="h-4 w-4" />
                        <span>Join our Discord</span>
                        <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                      </a>
                    </Button>
                  </div>

                  <p className="text-foreground/90">
                    We would really like your support to build an awesome tool
                    that can help you build code by drawing things.
                  </p>

                  <div className="pt-2 border-t border-primary/10 mt-6">
                    <p className="text-sm text-muted-foreground">
                      We'll notify you via email when CraftJS is ready for you
                      to try. In the meantime, follow us on social media for
                      updates and sneak peeks!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">What's Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg border p-4 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <span className="text-primary font-medium">1</span>
                </div>
                <p className="text-sm text-foreground/80">
                  Follow our progress on social media
                </p>
              </div>

              <div className="bg-card rounded-lg border p-4 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <span className="text-primary font-medium">2</span>
                </div>
                <p className="text-sm text-foreground/80">
                  Join our community for early discussions
                </p>
              </div>

              <div className="bg-card rounded-lg border p-4 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <span className="text-primary font-medium">3</span>
                </div>
                <p className="text-sm text-foreground/80">
                  Be ready for our beta launch email
                </p>
              </div>
            </div>
          </div>

          {/* Only show this section for admins */}
          {/* {displayUser.role === "admin" && (
            <div className="mt-8 p-4 border rounded-lg bg-card">
              <h3 className="font-semibold mb-2">Admin Information</h3>
              <p className="text-sm text-muted-foreground">
                You have admin access. Additional admin features will be
                available soon.
              </p>
            </div>
          )} */}
        </motion.div>
      </main>
    </div>
  );
}
