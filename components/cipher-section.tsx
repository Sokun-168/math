"use client";

import type { ReactNode } from "react";

interface CipherSectionProps {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}

export function CipherSection({
  id,
  title,
  description,
  icon,
  children,
}: CipherSectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-20 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-10 flex flex-col items-center text-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-card text-primary box-glow">
            {icon}
          </div>
          <h2 className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            <span className="text-primary text-glow">{">"}</span> {title}
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Content */}
        <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm p-6 box-glow sm:p-8">
          {/* Terminal bar */}
          <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-primary/60" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">
              cipher-tool://{id}
            </span>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
