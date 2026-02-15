function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod;
    }
    exp = exp / 2n;
    base = (base * base) % mod;
  }
  return result;
}

function gcdBig(a: bigint, b: bigint): bigint {
  while (b !== 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function modInverseBig(a: bigint, m: bigint): bigint {
  let [old_r, r] = [a, m];
  let [old_s, s] = [1n, 0n];
  while (r !== 0n) {
    const q = old_r / r;
    [old_r, r] = [r, old_r - q * r];
    [old_s, s] = [s, old_s - q * s];
  }
  return ((old_s % m) + m) % m;
}

export function generateRSAKeys(
  p: bigint,
  q: bigint
): { n: bigint; e: bigint; d: bigint } {
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);
  let e = 3n;
  while (gcdBig(e, phi) !== 1n) {
    e += 2n;
  }
  const d = modInverseBig(e, phi);
  return { n, e, d };
}

export function rsaEncrypt(
  message: string,
  key: { e: number; n: number }
): string {
  const e = BigInt(key.e);
  const n = BigInt(key.n);
  const encrypted: string[] = [];
  for (let i = 0; i < message.length; i++) {
    const m = BigInt(message.charCodeAt(i));
    const c = modPow(m, e, n);
    encrypted.push(c.toString());
  }
  return encrypted.join(" ");
}

export function rsaDecrypt(
  encryptedMessage: string,
  key: { d: number; n: number }
): string {
  const d = BigInt(key.d);
  const n = BigInt(key.n);
  const parts = encryptedMessage.trim().split(/\s+/);
  let decrypted = "";
  for (const part of parts) {
    const c = BigInt(part);
    const m = modPow(c, d, n);
    decrypted += String.fromCharCode(Number(m));
  }
  return decrypted;
}
