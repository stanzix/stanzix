import AnimateInView from "@/components/ui/AnimateInView";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import BeforeAfter from "@/components/sections/BeforeAfter";
import UseCases from "@/components/sections/UseCases";
import Testimonial from "@/components/sections/Testimonial";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <AnimateInView><Problem /></AnimateInView>
      <AnimateInView><HowItWorks /></AnimateInView>
      <AnimateInView><Features /></AnimateInView>
      <AnimateInView><BeforeAfter /></AnimateInView>
      <AnimateInView><UseCases /></AnimateInView>
      <AnimateInView><Testimonial /></AnimateInView>
      <AnimateInView><Pricing /></AnimateInView>
      <AnimateInView><FAQ /></AnimateInView>
      <AnimateInView><FinalCTA /></AnimateInView>
      <Footer />
    </main>
  );
}
