import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, ChevronRight, Clock, Database } from "lucide-react";
import { useInView } from "react-intersection-observer";

const BlockExplorer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeBlock, setActiveBlock] = useState(0);
  const [timestamp, setTimestamp] = useState(new Date());

  useEffect(() => {
    // Update the timestamp every second
    const timer = setInterval(() => {
      setTimestamp(new Date());
    }, 1000);

    // Rotate through blocks
    const blockTimer = setInterval(() => {
      setActiveBlock((prev) => (prev + 1) % blocks.length);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(blockTimer);
    };
  }, []);

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

  // Mock block data
  const blocks = [
    {
      id: "48921387",
      hash: "8ab7c9f045d8b84d06b493a784d5b45c8b9f302d19c59645107b8b152b39939e",
      transactions: 14,
      time: "2 seconds ago",
      size: "4.2 KB",
    },
    {
      id: "48921386",
      hash: "3ef7d29b86a5e314c49f8f2c8c3336103a823690384a25d942722ea66fb38726",
      transactions: 23,
      time: "5 seconds ago",
      size: "6.7 KB",
    },
    {
      id: "48921385",
      hash: "c25f89a5260e4cb8e3dc58c05e6b8bc98d9589a29e92a36fd3bf2e1bfcd4fbba",
      transactions: 8,
      time: "10 seconds ago",
      size: "3.1 KB",
    },
  ];

  return (
    <section id="explorer" className="section py-20 relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-stellar-primary/20 text-stellar-primary mb-6">
              <span className="text-sm font-medium">Real-time Query</span>
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            See the Stellar blockchain in action
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-300">
            Monitor transactions and blocks being added to the Stellar network
            in real-time, with detailed and accessible analysis.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="card bg-stellar-dark-800/70 overflow-hidden backdrop-blur-lg max-w-5xl mx-auto"
        >
          <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-6">
            <div className="flex items-center">
              <Database className="w-5 h-5 text-stellar-primary mr-2" />
              <h3 className="text-lg font-medium">Block Explorer</h3>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              <span>{timestamp.toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <h4 className="text-gray-300 mb-3 text-sm font-medium">
                  Recent Blocks
                </h4>
                <div className="space-y-3">
                  {blocks.map((block, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        activeBlock === index
                          ? "bg-stellar-primary/30 border border-stellar-primary/50"
                          : "bg-gray-700/30 hover:bg-gray-700/50"
                      }`}
                      onClick={() => setActiveBlock(index)}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-md bg-gray-700 flex items-center justify-center mr-3">
                          <span className="text-xs font-mono">
                            {block.id.slice(-2)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Block #{block.id}
                          </p>
                          <p className="text-xs text-gray-400">{block.time}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-gray-800/50 rounded-xl p-4 h-full">
                <h4 className="text-gray-300 mb-3 text-sm font-medium">
                  Block Details #{blocks[activeBlock].id}
                </h4>

                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <span className="text-sm text-gray-300">Hash</span>
                    <code className="text-xs md:text-sm font-mono text-stellar-primary bg-gray-800/50 px-2 py-1 rounded mt-1 md:mt-0 overflow-x-auto">
                      {blocks[activeBlock].hash}
                    </code>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-gray-700/30 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">
                        Transactions
                      </div>
                      <div className="text-xl font-medium">
                        {blocks[activeBlock].transactions}
                      </div>
                    </div>

                    <div className="p-3 bg-gray-700/30 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Time</div>
                      <div className="text-sm font-medium">
                        {blocks[activeBlock].time}
                      </div>
                    </div>

                    <div className="p-3 bg-gray-700/30 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Size</div>
                      <div className="text-sm font-medium">
                        {blocks[activeBlock].size}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-sm font-medium">
                        Transaction Activity
                      </h5>
                      <BarChart3 className="w-4 h-4 text-gray-400" />
                    </div>

                    <div className="h-24 flex items-end space-x-1">
                      {Array.from({ length: 24 }).map((_, i) => {
                        const height = Math.floor(Math.random() * 70) + 30;
                        return (
                          <div
                            key={i}
                            className="bg-stellar-primary/60 rounded-t w-full"
                            style={{ height: `${height}%` }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="#"
              className="inline-flex items-center text-stellar-primary hover:text-stellar-accent transition-colors text-sm"
            >
              <span>View all blocks</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlockExplorer;
