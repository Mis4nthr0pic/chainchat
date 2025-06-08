import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden py-20"
    >
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-stellar-primary/20 via-stellar-secondary/20 to-stellar-accent/20 text-white mb-6 border border-stellar-primary/30">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-stellar-primary to-stellar-accent mr-2 animate-pulse"></div>
              <span className="text-sm font-medium gradient-text">
                Blockchain Explorer + AI
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold md:h-16 h-24 mb-6 gradient-text"
          >
            Explore Stellar with intelligence.
          </motion.h1>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Access blocks, transactions, and smart contracts with AI
              assistance.
              <span className="block mt-2">
                <TypeAnimation
                  sequence={[
                    "Clarity and speed in every query.",
                    2000,
                    "Natural language questions.",
                    2000,
                    "Detailed AI-powered analysis.",
                    2000,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  className="gradient-text"
                />
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdG9eAHTx0Qp6wPvoqbCBWMjuO60FWgjTqfm50PZVAD8fwg7w/viewform" target="_blank" rel="noopener noreferrer" className="btn-primary group">
              Join Whitelist
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#features" className="btn-secondary" onClick={e => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Why ChainChat?
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 md:mt-24 max-w-5xl mx-auto"
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 0 50px rgba(99, 102, 241, 0.3), 0 0 100px rgba(245, 158, 11, 0.2)",
            }}
          >
            <video
              src="/video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto rounded-2xl object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
