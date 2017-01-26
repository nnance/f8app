export const toHumanNumber = number => {
  let tail = '';
  if (number >= 100000) {
    tail = 'k';
    number = Math.floor(number / 1000);
  }
  const stringNumber = number + '';
  let result = '';
  const slen = stringNumber.length;
  for (let i = slen - 1; i >= 0; i--){
    if (i !== slen - 1 && (slen - i - 1) % 3 === 0) {
      result = ',' + result;
    }
    result = stringNumber[i] + result;
  }
  return result + tail;
};

export const random = to => {
  return Math.floor(Math.random() * to);
};

export function mapSource(source) {
  if (typeof source === 'string') {
    return {
      uri: source
    };
  }
  return source;
}
