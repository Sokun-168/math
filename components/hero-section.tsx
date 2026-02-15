"use client";

import { Lock, ShieldCheck, KeyRound, Binary } from "lucide-react";

export function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center"
    >
      {/* Grid background overlay */}
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,65,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-8">
        {/* Badge */}
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 font-mono text-xs text-primary animate-fade-in">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
          Cryptographic Toolkit v2.0
        </div>

        {/* Heading */}
        <h1 className="text-balance font-mono text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-7xl animate-slide-up">
          Explore the
          <span className="block text-primary text-glow-strong">
            Science of Ciphers
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-pretty text-lg text-muted-foreground animate-slide-up md:text-xl"
          style={{ animationDelay: "0.15s" }}
        >
          Interactive tools for Caesar, Shift, Affine, RSA, and Transposition
          ciphers. Encrypt, decrypt, and brute-force your way through classical
          and modern cryptography.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <button
            onClick={() => scrollTo("caesar")}
            className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:box-glow-strong hover:scale-105"
          >
            <Lock className="h-4 w-4" />
            Start Encrypting
          </button>
          <button
            onClick={() => scrollTo("rsa")}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-mono text-sm text-foreground transition-all hover:border-primary/50 hover:text-primary hover:box-glow"
          >
            <KeyRound className="h-4 w-4" />
            RSA Toolkit
          </button>
        </div>

        {/* Feature grid */}
        <div className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 animate-slide-up"
          style={{ animationDelay: "0.45s" }}
        >
          {[
            { icon: Lock, label: "Caesar Cipher", desc: "Shift-based" },
            { icon: ShieldCheck, label: "Affine Cipher", desc: "Math-based" },
            { icon: Binary, label: "Transposition", desc: "Column-based" },
            { icon: KeyRound, label: "RSA Crypto", desc: "Public key" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card/50 p-4 transition-all hover:border-primary/30 hover:box-glow"
            >
              <item.icon className="h-6 w-6 text-primary" />
              <span className="font-mono text-xs font-semibold text-foreground">
                {item.label}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-muted-foreground animate-glow-pulse">
        <span className="font-mono text-xs">Scroll to explore</span>
        <div className="h-8 w-px bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
    </section>
  );
}
