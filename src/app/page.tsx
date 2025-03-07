import Header from "@/components/header";
import Hero from "@/components/hero";
import Features from "@/components/features";
import HowItWorks from "@/components/how-it-works";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <Features />
          <HowItWorks />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
