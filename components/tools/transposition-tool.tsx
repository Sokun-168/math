"use client";

import { useState } from "react";
import {
  transpositionCipherEncrypt,
  transpositionCipherDecrypt,
} from "@/lib/ciphers/transposition-cipher";

export function TranspositionTool() {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  const handleEncrypt = () => {
    const ciphertext = transpositionCipherEncrypt(input, key);
    setResult(ciphertext);
  };

  const handleDecrypt = () => {
    const plaintext = transpositionCipherDecrypt(input, key);
    setResult(plaintext);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="transposition-input" className="font-mono text-xs text-muted-foreground">
            Plaintext / Ciphertext
          </label>
          <input
            id="transposition-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text..."
            className="rounded-lg border border-border bg-input px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="transposition-key" className="font-mono text-xs text-muted-foreground">
            Key (word)
          </label>
          <input
            id="transposition-key"
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="e.g. ZEBRAS"
            className="rounded-lg border border-border bg-input px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          id="transposition-encrypt-btn"
          onClick={handleEncrypt}
          className="rounded-lg bg-primary px-5 py-2.5 font-mono text-xs font-semibold text-primary-foreground transition-all hover:box-glow-strong hover:scale-105 active:scale-95"
        >
          Encrypt
        </button>
        <button
          id="transposition-decrypt-btn"
          onClick={handleDecrypt}
          className="rounded-lg border border-border bg-secondary px-5 py-2.5 font-mono text-xs font-semibold text-secondary-foreground transition-all hover:border-primary/50 hover:text-primary active:scale-95"
        >
          Decrypt
        </button>
      </div>

      {result && (
        <div id="transposition-result" className="rounded-lg border border-border bg-terminal p-4 font-mono text-sm text-primary text-glow terminal-bg break-all">
          <span className="text-muted-foreground">{">> "}</span>
          {result}
        </div>
      )}
    </div>
  );
}
