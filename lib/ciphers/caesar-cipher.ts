export function shift_cipher_encryption(plaintext: string, key: number): string {
  let ciphertext = "";
  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];
    if (char.match(/[a-z]/)) {
      ciphertext += String.fromCharCode(
        ((char.charCodeAt(0) - 97 + key) % 26) + 97
      );
    } else if (char.match(/[A-Z]/)) {
      ciphertext += String.fromCharCode(
        ((char.charCodeAt(0) - 65 + key) % 26) + 65
      );
    } else {
      ciphertext += char;
    }
  }
  return ciphertext;
}

export function shift_cipher_decryption(
  ciphertext: string,
  key: number
): string {
  let plaintext = "";
  for (let i = 0; i < ciphertext.length; i++) {
    const char = ciphertext[i];
    if (char.match(/[a-z]/)) {
      plaintext += String.fromCharCode(
        ((char.charCodeAt(0) - 97 - key + 26) % 26) + 97
      );
    } else if (char.match(/[A-Z]/)) {
      plaintext += String.fromCharCode(
        ((char.charCodeAt(0) - 65 - key + 26) % 26) + 65
      );
    } else {
      plaintext += char;
    }
  }
  return plaintext;
}

export function caesar_brute_force_decrypt(
  ciphertext: string
): { key: number; plaintext: string }[] {
  const results: { key: number; plaintext: string }[] = [];
  for (let k = 1; k <= 25; k++) {
    results.push({
      key: k,
      plaintext: shift_cipher_decryption(ciphertext, k),
    });
  }
  return results;
}
