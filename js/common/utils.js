export const toHumanNumber = number => {
  const stringNumber = number + '';
  let result = '';
  const slen = stringNumber.length;
  for(let i=slen - 1; i >= 0; i--) {
    if (i !== slen - 1 && (slen - i - 1) % 3 === 0) {
      result = ',' + result;
    }
    result = stringNumber[i] + result;
  }
  return result
}
