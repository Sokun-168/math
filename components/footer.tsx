import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2 text-primary font-mono text-sm font-bold text-glow">
          <Shield className="h-4 w-4" />
          {"<CipherCore />"}
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          Interactive Cryptography Toolkit — Classical & Modern Ciphers
        </p>
        <div className="flex items-center gap-6 font-mono text-xs text-muted-foreground">
          <span>Caesar</span>
          <span className="text-border">|</span>
          <span>Shift</span>
          <span className="text-border">|</span>
          <span>Affine</span>
          <span className="text-border">|</span>
          <span>Transposition</span>
          <span className="text-border">|</span>
          <span>RSA</span>
        </div>
        <p className="font-mono text-xs text-muted-foreground/50">
          Built for learning and exploration
        </p>
      </div>
    </footer>
  );
}
