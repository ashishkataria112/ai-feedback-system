import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

const Home = () => (
  <div className="min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
    <Navbar />
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTASection />
    </main>
    <Footer />
  </div>
);

export default Home;
