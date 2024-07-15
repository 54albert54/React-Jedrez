

export function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function uniqueElements(arr1: string[], arr2: string[]) {
  const uniqueInArr1 = arr1.filter((element) => !arr2.includes(element));
  const uniqueInArr2 = arr2.filter((element) => !arr1.includes(element));

  
  // console.log('[input]',[...arr1]);
  // console.log('[output]',[...uniqueInArr1]);
  

  return [...uniqueInArr1];
}