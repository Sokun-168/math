"use client";

import { useState } from "react";
import {
  affineCipherEncrypt,
  affineCipherDecrypt,
  affine_brute_force_decrypt,
} from "@/lib/ciphers/affine-cipher";

export function AffineTool() {
  const [input, setInput] = useState("");
  const [keyA, setKeyA] = useState("");
  const [keyB, setKeyB] = useState("");
  const [result, setResult] = useState("");

  const handleEncrypt = () => {
    const a = parseInt(keyA, 10);
    const b = parseInt(keyB, 10);
    const encrypted = affineCipherEncrypt(input, a, b);
    setResult(`Encrypted: ${encrypted}`);
  };

  const handleDecrypt = () => {
    const a = parseInt(keyA, 10);
    const b = parseInt(keyB, 10);
    if (isNaN(a) || isNaN(b)) {
      setResult("Invalid keys!");
      return;
    }
    const decrypted = affineCipherDecrypt(input, a, b);
    setResult(`Decrypted: ${decrypted}`);
  };

  const handleBruteForce = () => {
    const results = affine_brute_force_decrypt(input);
    const lines = results.map(
      (r) => `KeyA: ${r.a} KeyB: ${r.b} => ${r.plaintext}`
    );
    setResult(lines.join("\n"));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="affine-input" className="font-mono text-xs text-muted-foreground">
          Plaintext / Ciphertext
        </label>
        <input
          id="affine-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text..."
          className="rounded-lg border border-border bg-input px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="affine-key-a" className="font-mono text-xs text-muted-foreground">
            Key A (coprime with 26)
          </label>
          <input
            id="affine-key-a"
            type="number"
            value={keyA}
            onChange={(e) => setKeyA(e.target.value)}
            placeholder="e.g. 5"
            className="rounded-lg border border-border bg-input px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="affine-key-b" className="font-mono text-xs text-muted-foreground">
            Key B
          </label>
          <input
            id="affine-key-b"
            type="number"
            value={keyB}
            onChange={(e) => setKeyB(e.target.value)}
            placeholder="e.g. 8"
            className="rounded-lg border border-border bg-input px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          id="affine-encrypt-btn"
          onClick={handleEncrypt}
          className="rounded-lg bg-primary px-5 py-2.5 font-mono text-xs font-semibold text-primary-foreground transition-all hover:box-glow-strong hover:scale-105 active:scale-95"
        >
          Encrypt
        </button>
        <button
          id="affine-decrypt-btn"
          onClick={handleDecrypt}
          className="rounded-lg border border-border bg-secondary px-5 py-2.5 font-mono text-xs font-semibold text-secondary-foreground transition-all hover:border-primary/50 hover:text-primary active:scale-95"
        >
          Decrypt
        </button>
        <button
          id="affine-brute-force-btn"
          onClick={handleBruteForce}
          className="rounded-lg border border-destructive/50 bg-secondary px-5 py-2.5 font-mono text-xs font-semibold text-destructive transition-all hover:bg-destructive/10 active:scale-95"
        >
          Brute Force
        </button>
      </div>

      {result && (
        <div id="affine-result" className="max-h-64 overflow-y-auto rounded-lg border border-border bg-terminal p-4 font-mono text-sm text-primary text-glow terminal-bg">
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
