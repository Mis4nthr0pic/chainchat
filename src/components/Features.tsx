import React from "react";
import { motion } from "framer-motion";
import { Brain, Layout, Shield, Search } from "lucide-react";
import { useInView } from "react-intersection-observer";

const Features = () => {
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
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Search",
      description:
        "Make queries in natural language and get precise results. Our AI interprets your questions and finds exactly what you're looking for.",
    },
    {
      icon: Layout,
      title: "Fluid Interface",
      description:
        "Navigate the Stellar blockchain with ease thanks to an intuitive, responsive interface that adapts to any device.",
    },
    {
      icon: Shield,
      title: "Open-source & Privacy",
      description:
        "Open-source code focused on protecting your data. No tracking, no personal information collection.",
    },
    {
      icon: Search,
      title: "Detailed Analysis",
      description:
        "Get deep insights into contracts, transactions, and accounts with clear, comprehensible visualizations.",
    },
  ];

  return (
    <section
      id="features"
      className="section relative py-20"
      style={{
        background:
          "linear-gradient(135deg, rgba(15, 15, 35, 0.8) 0%, rgba(30, 27, 75, 0.6) 50%, rgba(15, 15, 35, 0.8) 100%)",
      }}
    >
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-stellar-primary/20 via-stellar-secondary/20 to-stellar-accent/20 text-white mb-6 border border-stellar-primary/30">
              <span className="text-sm font-medium gradient-text">
                Why choose ChainChat?
              </span>
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
          >
            Features designed to simplify your exploration
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-300">
            ChainChat redefines how you interact with the Stellar blockchain,
            combining advanced technology with ease of use.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card group hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-stellar-primary/20 to-stellar-accent/20 flex items-center justify-center mb-6 group-hover:from-stellar-primary/30 group-hover:to-stellar-accent/30 transition-all duration-300 border border-stellar-primary/20">
                <feature.icon className="w-7 h-7 text-stellar-primary group-hover:text-stellar-accent transition-colors" />
              </div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-stellar-primary transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 text-center"
        >
          
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
