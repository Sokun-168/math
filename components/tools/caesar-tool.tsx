"use client";

import { useState } from "react";
import {
  shift_cipher_encryption,
  shift_cipher_decryption,
} from "@/lib/ciphers/caesar-cipher";

export function CaesarTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleEncrypt = () => {
    if (!input.length) {
      setResult("Please Enter Valid Input");
      return;
    }
    setResult(shift_cipher_encryption(input, 3));
  };

  const handleDecrypt = () => {
    if (!input.length) {
      setResult("Please Enter Valid Input");
      return;
    }
    setResult(shift_cipher_decryption(input, 3));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="caesar-input" className="font-mono text-xs text-muted-foreground">
          Plaintext / Ciphertext
        </label>
        <input
          id="caesar-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encrypt or decrypt..."
          className="rounded-lg border border-border bg-input px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          id="caesar-encrypt-btn"
          onClick={handleEncrypt}
          className="rounded-lg bg-primary px-5 py-2.5 font-mono text-xs font-semibold text-primary-foreground transition-all hover:box-glow-strong hover:scale-105 active:scale-95"
        >
          Encrypt
        </button>
        <button
          id="caesar-decrypt-btn"
          onClick={handleDecrypt}
          className="rounded-lg border border-border bg-secondary px-5 py-2.5 font-mono text-xs font-semibold text-secondary-foreground transition-all hover:border-primary/50 hover:text-primary active:scale-95"
        >
          Decrypt
        </button>
      </div>

      {result && (
        <div id="caesar-result" className="rounded-lg border border-border bg-terminal p-4 font-mono text-sm text-primary text-glow terminal-bg">
          <span className="text-muted-foreground">{">> "}</span>
          {result}
        </div>
      )}
    </div>
  );
}
