export const fixacao = (string: string): Array<string> | null => {
  if (typeof string !== "string") {
    return null;
  }

  const stringSeparada = string.split("");

  return stringSeparada;
};
