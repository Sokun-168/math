"use client";

import { useState } from "react";
import {
  generateRSAKeys,
  rsaEncrypt,
  rsaDecrypt,
} from "@/lib/ciphers/rsa-cipher";

export function RsaTool() {
  // Key generation state
  const [p, setP] = useState("");
  const [q, setQ] = useState("");
  const [keygenResult, setKeygenResult] = useState("");

  // Encryption state
  const [encryptInput, setEncryptInput] = useState("");
  const [encryptE, setEncryptE] = useState("");
  const [encryptN, setEncryptN] = useState("");
  const [encryptResult, setEncryptResult] = useState("");

  // Decryption state
  const [decryptInput, setDecryptInput] = useState("");
  const [decryptD, setDecryptD] = useState("");
  const [decryptN, setDecryptN] = useState("");
  const [decryptResult, setDecryptResult] = useState("");

  const handleKeygen = () => {
    const pVal = BigInt(p || "0");
    const qVal = BigInt(q || "0");
    if (pVal <= 1n || qVal <= 1n) {
      setKeygenResult("Both p and q must be greater than 1.");
      return;
    }
    const { n, e, d } = generateRSAKeys(pVal, qVal);
    setKeygenResult(`Public Key: (e: ${e}, n: ${n}) | Private Key: (d: ${d}, n: ${n})`);
  };

  const handleEncrypt = () => {
    const e = parseInt(encryptE, 10);
    const n = parseInt(encryptN, 10);
    if (!encryptInput || isNaN(e) || isNaN(n)) {
      setEncryptResult("Please provide a valid message and keys.");
      return;
    }
    try {
      const encrypted = rsaEncrypt(encryptInput, { e, n });
      setEncryptResult(`Encrypted: ${encrypted}`);
    } catch {
      setEncryptResult("Encryption failed. Please check your input.");
    }
  };

  const handleDecrypt = () => {
    const d = parseInt(decryptD, 10);
    const n = parseInt(decryptN, 10);
    if (!decryptInput || isNaN(d) || isNaN(n)) {
      setDecryptResult("Please provide a valid encrypted message and keys.");
      return;
    }
    try {
      const decrypted = rsaDecrypt(decryptInput, { d, n });
      setDecryptResult(`Decrypted: ${decrypted}`);
    } catch {
      setDecryptResult("Decryption failed. Please check your input.");
    }
  };

  const inputClass =
    "rounded-lg border border-border bg-input px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors";

  return (
    <div className="flex flex-col gap-10">
      {/* Key Generation */}
      <div className="flex flex-col gap-5">
        <h3 className="font-mono text-sm font-semibold text-foreground flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
          RSA Key Generation
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="rsa-keygen-p" className="font-mono text-xs text-muted-foreground">
              Prime p
            </label>
            <input
              id="rsa-keygen-p"
              type="number"
              value={p}
              onChange={(e) => setP(e.target.value)}
              placeholder="e.g. 61"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="rsa-keygen-q" className="font-mono text-xs text-muted-foreground">
              Prime q
            </label>
            <input
              id="rsa-keygen-q"
              type="number"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. 53"
              className={inputClass}
            />
          </div>
        </div>
        <button
          id="rsa-keygen-btn"
          onClick={handleKeygen}
          className="self-start rounded-lg bg-primary px-5 py-2.5 font-mono text-xs font-semibold text-primary-foreground transition-all hover:box-glow-strong hover:scale-105 active:scale-95"
        >
          Generate Keys
        </button>
        {keygenResult && (
          <div id="rsa-keygen-result" className="rounded-lg border border-border bg-terminal p-4 font-mono text-sm terminal-bg break-all">
            <span className="text-green-400">
              {keygenResult.includes("Public Key") ? keygenResult.split(" | ")[0] : ""}
            </span>
            {keygenResult.includes("|") && (
              <>
                <br />
                <span className="text-destructive">
                  {keygenResult.split(" | ")[1]}
                </span>
              </>
            )}
            {!keygenResult.includes("|") && (
              <span className="text-destructive">{keygenResult}</span>
            )}
          </div>
        )}
      </div>

      <div className="h-px bg-border" />

      {/* Encryption */}
      <div className="flex flex-col gap-5">
        <h3 className="font-mono text-sm font-semibold text-foreground flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
          RSA Encrypt
        </h3>
        <div className="flex flex-col gap-2">
          <label htmlFor="rsa-encrypt-input" className="font-mono text-xs text-muted-foreground">
            Message
          </label>
          <input
            id="rsa-encrypt-input"
            type="text"
            value={encryptInput}
            onChange={(e) => setEncryptInput(e.target.value)}
            placeholder="Enter message to encrypt..."
            className={inputClass}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="rsa-encrypt-key-e" className="font-mono text-xs text-muted-foreground">
              Public Key e
            </label>
            <input
              id="rsa-encrypt-key-e"
              type="number"
              value={encryptE}
              onChange={(e) => setEncryptE(e.target.value)}
              placeholder="e"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="rsa-encrypt-key-n" className="font-mono text-xs text-muted-foreground">
              Public Key n
            </label>
            <input
              id="rsa-encrypt-key-n"
              type="number"
              value={encryptN}
              onChange={(e) => setEncryptN(e.target.value)}
              placeholder="n"
              className={inputClass}
            />
          </div>
        </div>
        <button
          id="rsa-encrypt-btn"
          onClick={handleEncrypt}
          className="self-start rounded-lg bg-primary px-5 py-2.5 font-mono text-xs font-semibold text-primary-foreground transition-all hover:box-glow-strong hover:scale-105 active:scale-95"
        >
          Encrypt
        </button>
        {encryptResult && (
          <div id="rsa-encrypt-result" className="rounded-lg border border-border bg-terminal p-4 font-mono text-sm text-primary text-glow terminal-bg break-all">
            <span className="text-muted-foreground">{">> "}</span>
            {encryptResult}
          </div>
        )}
      </div>

      <div className="h-px bg-border" />

      {/* Decryption */}
      <div className="flex flex-col gap-5">
        <h3 className="font-mono text-sm font-semibold text-foreground flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
          RSA Decrypt
        </h3>
        <div className="flex flex-col gap-2">
          <label htmlFor="rsa-decrypt-input" className="font-mono text-xs text-muted-foreground">
            Encrypted Message (space-separated numbers)
          </label>
          <input
            id="rsa-decrypt-input"
            type="text"
            value={decryptInput}
            onChange={(e) => setDecryptInput(e.target.value)}
            placeholder="e.g. 2790 2950 65 ..."
            className={inputClass}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="rsa-decrypt-key-d" className="font-mono text-xs text-muted-foreground">
              Private Key d
            </label>
            <input
              id="rsa-decrypt-key-d"
              type="number"
              value={decryptD}
              onChange={(e) => setDecryptD(e.target.value)}
              placeholder="d"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="rsa-decrypt-key-n" className="font-mono text-xs text-muted-foreground">
              Private Key n
            </label>
            <input
              id="rsa-decrypt-key-n"
              type="number"
              value={decryptN}
              onChange={(e) => setDecryptN(e.target.value)}
              placeholder="n"
              className={inputClass}
            />
          </div>
        </div>
        <button
          id="rsa-decrypt-btn"
          onClick={handleDecrypt}
          className="self-start rounded-lg border border-border bg-secondary px-5 py-2.5 font-mono text-xs font-semibold text-secondary-foreground transition-all hover:border-primary/50 hover:text-primary active:scale-95"
        >
          Decrypt
        </button>
        {decryptResult && (
          <div id="rsa-decrypt-result" className="rounded-lg border border-border bg-terminal p-4 font-mono text-sm text-primary text-glow terminal-bg break-all">
            <span className="text-muted-foreground">{">> "}</span>
            {decryptResult}
          </div>
        )}
      </div>
    </div>
  );
}
