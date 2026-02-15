function modInverse(a: number, m: number): number | null {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return null;
}

function gcd(a: number, b: number): number {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export function affineCipherEncrypt(
  text: string,
  a: number,
  b: number
): string {
  if (gcd(a, 26) !== 1) {
    return "Key 'a' must be coprime with 26.";
  }
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char.match(/[a-z]/)) {
      result += String.fromCharCode(
        ((a * (char.charCodeAt(0) - 97) + b) % 26) + 97
      );
    } else if (char.match(/[A-Z]/)) {
      result += String.fromCharCode(
        ((a * (char.charCodeAt(0) - 65) + b) % 26) + 65
      );
    } else {
      result += char;
    }
  }
  return result;
}

export function affineCipherDecrypt(
  text: string,
  a: number,
  b: number
): string {
  const aInv = modInverse(a, 26);
  if (aInv === null) {
    return "Key 'a' has no modular inverse mod 26.";
  }
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char.match(/[a-z]/)) {
      result += String.fromCharCode(
        ((aInv * (char.charCodeAt(0) - 97 - b + 26 * 10)) % 26) + 97
      );
    } else if (char.match(/[A-Z]/)) {
      result += String.fromCharCode(
        ((aInv * (char.charCodeAt(0) - 65 - b + 26 * 10)) % 26) + 65
      );
    } else {
      result += char;
    }
  }
  return result;
}

export function affine_brute_force_decrypt(
  text: string
): { a: number; b: number; plaintext: string }[] {
  const results: { a: number; b: number; plaintext: string }[] = [];
  const coprimes = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
  for (const a of coprimes) {
    for (let b = 0; b < 26; b++) {
      results.push({ a, b, plaintext: affineCipherDecrypt(text, a, b) });
    }
  }
  return results;
}
