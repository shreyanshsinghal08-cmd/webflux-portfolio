import { motion, useScroll } from "framer-motion";
import { BookCTA } from "./components/BookCTA";
import { Courses } from "./components/Courses";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Navbar } from "./components/Navbar";
import { Steps } from "./components/Steps";
import { Testimonials } from "./components/Testimonials";
import { WhyUs } from "./components/WhyUs";

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink font-sans text-frost">
      {/* scroll progress */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-mint to-mint-2"
      />

      {/* film grain */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[60] opacity-[0.05]" />

      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Courses />
        <WhyUs />
        <Steps />
        <Testimonials />
        <BookCTA />
      </main>
      <Footer />
    </div>
  );
}
