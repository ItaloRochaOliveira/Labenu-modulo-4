export const pratica2 = (n: number): boolean | null => {
  if (typeof n !== "number") {
    //verifica se é do tipo number
    return null;
  }

  if (!Number.isInteger(n)) {
    //verifica se é inteiro
    return null;
  }

  return n % 2 == 0; //verifica se é par
};
