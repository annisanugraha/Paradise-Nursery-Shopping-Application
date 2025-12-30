import Link from "next/link"
import { ArrowRight, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AboutUs } from "@/components/about-us"
import { Navbar } from "@/components/navbar"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: `url('/lush-indoor-jungle-plants-aesthetic.jpg')`,
              filter: "brightness(0.6)",
            }}
          />

          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <div className="flex justify-center mb-6">
              <Leaf className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-balance">
              Welcome to Paradise Nursery
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto text-pretty">
              Transform your space into a living sanctuary with our curated collection of premium indoor plants.
            </p>
            <Link href="/products">
              <Button size="lg" className="text-lg px-8 h-14 rounded-full gap-2">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <AboutUs />
      </main>

      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 font-bold text-xl text-primary mb-4">
            <Leaf className="h-5 w-5" />
            <span>Paradise Nursery</span>
          </div>
          <p className="text-muted-foreground">© 2025 Paradise Nursery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
