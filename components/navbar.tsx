"use client";

import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "caesar", label: "Caesar" },
  { id: "shift", label: "Shift" },
  { id: "affine", label: "Affine" },
  { id: "transposition", label: "Transposition" },
  { id: "rsa", label: "RSA" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 text-primary font-mono text-lg font-bold tracking-wider text-glow"
        >
          <Shield className="h-6 w-6" />
          <span>{"<CipherCore />"}</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="rounded-md px-3 py-2 font-mono text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-muted-foreground md:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="rounded-md px-3 py-3 text-left font-mono text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
