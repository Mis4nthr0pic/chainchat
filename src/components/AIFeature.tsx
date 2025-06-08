import { motion } from "framer-motion";
import { Search, Bot, CornerRightDown } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";

const AIFeature = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const chatMessages = [
    {
      type: "user",
      text: "What transactions did address GDTOLCAP3YQYGIZKRP5J27M5AV3RD4JBY make yesterday?",
    },
    {
      type: "ai",
      text: "Yesterday, address GDTOLCAP3Y... made 3 transactions:",
      details: [
        "1. Transferred 500 XLM to GD23FD... at 14:32 UTC",
        "2. Interacted with smart contract SCP03X... at 15:47 UTC",
        "3. Received 1200 XLM from GF87WE... at 20:15 UTC",
      ],
    },
    {
      type: "user",
      text: "Show me active contracts with errors in the last 30 days.",
    },
    {
      type: "ai",
      animatedText: true,
    },
  ];

  return (
    <section id="ai-feature" className="section py-20 relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <div className="card bg-stellar-dark-800/70 overflow-hidden backdrop-blur-lg max-w-xl mx-auto lg:ml-0">
              <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-4">
                <div className="flex items-center">
                  <Bot className="w-5 h-5 text-stellar-primary mr-2" />
                  <h3 className="text-lg font-medium">ChainChat AI</h3>
                </div>
                <div className="flex space-x-2">
                  <span className="w-3 h-3 rounded-full bg-error-light"></span>
                  <span className="w-3 h-3 rounded-full bg-warning-light"></span>
                  <span className="w-3 h-3 rounded-full bg-success-light"></span>
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto py-2 custom-scrollbar">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md rounded-2xl p-4 ${
                        message.type === "user"
                          ? "bg-stellar-primary/30 rounded-tr-none"
                          : "bg-gray-700/50 rounded-tl-none"
                      }`}
                    >
                      {message.text && (
                        <p className="text-sm md:text-base">{message.text}</p>
                      )}

                      {message.details && (
                        <ul className="mt-2 space-y-1 text-sm text-gray-300">
                          {message.details.map((detail, i) => (
                            <li key={i} className="flex items-start">
                              <span className="inline-block w-4 h-4 flex-shrink-0 mr-1">
                                {i === 0 && "•"}
                              </span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {message.animatedText && (
                        <div className="text-sm md:text-base">
                          <TypeAnimation
                            sequence={[
                              "Analyzing contracts on the Stellar network...",
                              1000,
                              "Found 4 contracts with errors in the last 30 days. Would you like to see details for any specific one?",
                              500,
                            ]}
                            wrapper="span"
                            cursor={true}
                            repeat={1}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700 flex">
                <input
                  type="text"
                  placeholder="Ask a question about the Stellar blockchain..."
                  className="flex-grow bg-gray-700/30 border border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stellar-primary"
                />
                <button className="ml-2 p-2 bg-stellar-primary rounded-lg">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <div className="lg:pl-12 max-w-xl mx-auto lg:mx-0">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-stellar-primary/20 text-stellar-primary mb-6">
                <span className="text-sm font-medium">Featured Capability</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Query the blockchain in natural language
              </h2>

              <p className="text-gray-300 mb-6">
                Forget complex queries and the need to understand blockchain's
                technical structure. With our integrated AI, you can simply ask
                what you want to know in natural language.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-stellar-primary/20 p-2 rounded-full mr-4 mt-1">
                    <CornerRightDown className="w-5 h-5 text-stellar-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Natural Language Queries
                    </h3>
                    <p className="text-gray-400">
                      Ask about transactions, contracts, addresses, or any other
                      aspect of the Stellar blockchain as if you were talking to
                      an expert.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-stellar-primary/20 p-2 rounded-full mr-4 mt-1">
                    <CornerRightDown className="w-5 h-5 text-stellar-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Contextualized Responses
                    </h3>
                    <p className="text-gray-400">
                      Receive clear, contextualized explanations, not just raw
                      data. Our AI understands context and provides relevant
                      information.
                    </p>
                  </div>
                </div>
              </div>

              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdG9eAHTx0Qp6wPvoqbCBWMjuO60FWgjTqfm50PZVAD8fwg7w/viewform" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
                Join Whitelist
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIFeature;
