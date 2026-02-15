"use client";

import { useState } from "react";
import {
  shift_cipher_encryption,
  shift_cipher_decryption,
  caesar_brute_force_decrypt,
} from "@/lib/ciphers/caesar-cipher";

export function ShiftTool() {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  const handleEncrypt = () => {
    const k = parseInt(key);
    if (!input.length) {
      setResult("Please Enter Valid Input");
      return;
    }
    setResult(shift_cipher_encryption(input, k));
  };

  const handleDecrypt = () => {
    const k = parseInt(key);
    if (!input.length) {
      setResult("Please Enter Valid Input");
      return;
    }
    setResult(shift_cipher_decryption(input, k));
  };

  const handleBruteForce = () => {
    if (!input.length) {
      setResult("Please Enter Valid Input");
      return;
    }
    const results = caesar_brute_force_decrypt(input);
    setResult(
      results.map((r, i) => `k=${i + 1}: ${r.plaintext}`).join("\n")
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="shift-input" className="font-mono text-xs text-muted-foreground">
            Plaintext / Ciphertext
          </label>
          <input
            id="shift-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text..."
            className="rounded-lg border border-border bg-input px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="shift-key" className="font-mono text-xs text-muted-foreground">
            Shift Key
          </label>
          <input
            id="shift-key"
            type="number"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="e.g. 5"
            className="rounded-lg border border-border bg-input px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          id="shift-encrypt-btn"
          onClick={handleEncrypt}
          className="rounded-lg bg-primary px-5 py-2.5 font-mono text-xs font-semibold text-primary-foreground transition-all hover:box-glow-strong hover:scale-105 active:scale-95"
        >
          Encrypt
        </button>
        <button
          id="shift-decrypt-btn"
          onClick={handleDecrypt}
          className="rounded-lg border border-border bg-secondary px-5 py-2.5 font-mono text-xs font-semibold text-secondary-foreground transition-all hover:border-primary/50 hover:text-primary active:scale-95"
        >
          Decrypt
        </button>
        <button
          id="shift-brute-force-btn"
          onClick={handleBruteForce}
          className="rounded-lg border border-destructive/50 bg-secondary px-5 py-2.5 font-mono text-xs font-semibold text-destructive transition-all hover:bg-destructive/10 active:scale-95"
        >
          Brute Force
        </button>
      </div>

      {result && (
        <div id="shift-result" className="max-h-64 overflow-y-auto rounded-lg border border-border bg-terminal p-4 font-mono text-sm text-primary text-glow terminal-bg">
          {result.split("\n").map((line, i) => (
            <div key={i}>
              <span className="text-muted-foreground">{">> "}</span>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
