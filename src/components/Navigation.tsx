"use client";

import { useState } from "react";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "#map", label: "State Map" },
    { href: "#states", label: "State Detail" },
    { href: "#federal", label: "Federal" },
    { href: "#news", label: "News" },
    { href: "#resources", label: "Resources" },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <a href="#" className="font-bold text-gray-900 text-lg">
          ICHRA <span className="text-blue-600">Watch</span>
        </a>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden p-2 text-gray-600"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden bg-white border-b border-gray-200 px-4 pb-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
