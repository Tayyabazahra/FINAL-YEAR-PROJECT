import { About, Features, FAQs, Footer, Hero, Navbar } from "./components";

export const LandingPage = () => {
  return (
    <main className="bg-surface-2 w-full min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <FAQs />
      <Footer />
    </main>
  );
};
