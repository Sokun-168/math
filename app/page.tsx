import { Lock, KeyRound, ShieldCheck, Binary, Key } from "lucide-react";
import { MatrixRain } from "@/components/matrix-rain";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { CipherSection } from "@/components/cipher-section";
import { CaesarTool } from "@/components/tools/caesar-tool";
import { ShiftTool } from "@/components/tools/shift-tool";
import { AffineTool } from "@/components/tools/affine-tool";
import { TranspositionTool } from "@/components/tools/transposition-tool";
import { RsaTool } from "@/components/tools/rsa-tool";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <MatrixRain />

      <div className="relative z-10">
        <Navbar />
        <HeroSection />

        {/* Divider */}
        <div className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        <CipherSection
          id="caesar"
          title="Caesar Cipher"
          description="The classic substitution cipher with a fixed shift of 3. One of the earliest known encryption techniques used by Julius Caesar."
          icon={<Lock className="h-6 w-6" />}
        >
          <CaesarTool />
        </CipherSection>

        <div className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        <CipherSection
          id="shift"
          title="Shift Cipher"
          description="A generalized Caesar cipher where you choose the shift key. Includes brute force decryption to try all 25 possible keys."
          icon={<Key className="h-6 w-6" />}
        >
          <ShiftTool />
        </CipherSection>

        <div className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        <CipherSection
          id="affine"
          title="Affine Cipher"
          description="A mathematical cipher using modular arithmetic with two keys (a, b). Key 'a' must be coprime with 26."
          icon={<ShieldCheck className="h-6 w-6" />}
        >
          <AffineTool />
        </CipherSection>

        <div className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        <CipherSection
          id="transposition"
          title="Transposition Cipher"
          description="Rearranges the positions of characters using a keyword-based columnar transposition technique."
          icon={<Binary className="h-6 w-6" />}
        >
          <TranspositionTool />
        </CipherSection>

        <div className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        <CipherSection
          id="rsa"
          title="RSA Cryptosystem"
          description="Public-key cryptography using prime factorization. Generate key pairs, encrypt with public keys, and decrypt with private keys."
          icon={<KeyRound className="h-6 w-6" />}
        >
          <RsaTool />
        </CipherSection>

        <Footer />
      </div>
    </main>
  );
}
