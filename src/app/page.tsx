import { SiteNavbar } from "@/components/marketing/site-navbar"
import { HeroSection } from "@/components/marketing/hero-section"
import { FeaturesSection } from "@/components/marketing/features-section"
import { HowItWorksSection } from "@/components/marketing/how-it-works-section"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"
import { PricingSection } from "@/components/marketing/pricing-section"
import { SiteFooter } from "@/components/marketing/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteNavbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <SiteFooter />
    </div>
  )
}
