export function transpositionCipherEncrypt(
  plaintext: string,
  key: string
): string {
  const numCols = key.length;
  const numRows = Math.ceil(plaintext.length / numCols);
  const grid: string[][] = [];

  let idx = 0;
  for (let r = 0; r < numRows; r++) {
    const row: string[] = [];
    for (let c = 0; c < numCols; c++) {
      row.push(idx < plaintext.length ? plaintext[idx] : "");
      idx++;
    }
    grid.push(row);
  }

  const order = key
    .split("")
    .map((ch, i) => ({ ch, i }))
    .sort((a, b) => a.ch.localeCompare(b.ch))
    .map((item) => item.i);

  let ciphertext = "";
  for (const col of order) {
    for (let r = 0; r < numRows; r++) {
      ciphertext += grid[r][col];
    }
  }
  return ciphertext;
}

export function transpositionCipherDecrypt(
  ciphertext: string,
  key: string
): string {
  const numCols = key.length;
  const numRows = Math.ceil(ciphertext.length / numCols);

  const order = key
    .split("")
    .map((ch, i) => ({ ch, i }))
    .sort((a, b) => a.ch.localeCompare(b.ch))
    .map((item) => item.i);

  const colLengths: number[] = new Array(numCols).fill(numRows);
  const totalCells = numCols * numRows;
  const emptySpaces = totalCells - ciphertext.length;
  for (let i = numCols - emptySpaces; i < numCols; i++) {
    colLengths[order[i]] = numRows - 1;
  }

  const grid: string[][] = Array.from({ length: numRows }, () =>
    new Array(numCols).fill("")
  );

  let idx = 0;
  for (const col of order) {
    for (let r = 0; r < colLengths[col]; r++) {
      grid[r][col] = ciphertext[idx] || "";
      idx++;
    }
  }

  let plaintext = "";
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      plaintext += grid[r][c];
    }
  }
  return plaintext;
}
