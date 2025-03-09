"use client";
import Link from "next/link";
import { Twitter, Github, FileText, Mail, PenLine } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <PenLine className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">CraftJS</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Transform your sketches into production-ready Next.js code with
              the power of AI. Draw, generate, and build faster than ever
              before.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Connect</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  target="_blank"
                  href="https://x.com/sudheerkumarme"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter/X</span>
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://github.com/nextcrafter/craftjs"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>Docs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:hello@craftjs.org"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} CraftJS. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Crafted with ❤️ by{" "}
            <Link target="_blank" href="https://www.nextcrafter.com">
              NextCrafter
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
