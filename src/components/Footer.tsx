import React from "react";
import { Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#0f0f23] py-2 border-t border-gray-800/50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <span className="text-gray-400 text-sm">© 2025 ChainChat. All rights reserved.</span>
        <a
          href="https://twitter.com/chainchat_ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-stellar-primary transition-colors"
        >
          <Twitter className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
