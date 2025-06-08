import Hero from "./components/Hero";
import AIFeature from "./components/AIFeature";
import Features from "./components/Features";
import Footer from "./components/Footer";
import StarBackground from "./components/StarBackground";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white relative">
      <StarBackground />
      <Hero />
      <AIFeature />
      <Features />
      <Footer />
    </div>
  );
}

export default App;
