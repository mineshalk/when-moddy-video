function plural(n: number, forms: [string, string, string]) {
  const nAbs = Math.abs(n) % 100;
  const n1 = nAbs % 10;
  if (nAbs > 10 && nAbs < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}
export default plural;
