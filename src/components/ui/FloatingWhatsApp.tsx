import React, { useState } from "react";
import { Headphones, Mail, MessageCircle, Phone, X } from "lucide-react";
import { siteData } from "../../data/siteData";

export const FloatingWhatsApp: React.FC = () => {
  const { email, phoneUrl, whatsappDefaultMessage } = siteData.contact;
  const encodedMessage = encodeURIComponent(whatsappDefaultMessage);
  const whatsappUrl = `https://wa.me/${phoneUrl}?text=${encodedMessage}`;
  const [isOpen, setIsOpen] = useState(false);
  const phoneUrlValue = `tel:+${phoneUrl}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex flex-col items-end gap-2" aria-label="Contact options">
          <a
            href={`mailto:${email}`}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Email
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Mail className="h-4 w-4" />
            </span>
          </a>
          <a
            href={phoneUrlValue}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Call
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Phone className="h-4 w-4" />
            </span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            WhatsApp
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <MessageCircle className="h-4 w-4" />
            </span>
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
        aria-expanded={isOpen}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-900/30 transition-transform duration-300 hover:scale-105 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-black"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Headphones className="h-6 w-6" />}
      </button>
    </div>
  );
};
