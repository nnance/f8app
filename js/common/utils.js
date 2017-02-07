export const toHumanNumber = (number) => {
  let tail = '';
  let s_float_point = '';
  if (number >= 10000) {
    tail = 'k';
    const float_point = Math.floor(number / 100) % 10;
    s_float_point = float_point === 0 ? '' : `.${float_point}`;
    number = Math.floor(number / 1000);
    if (number >= 100) {
      s_float_point = '';
    }
  }
  const stringNumber = `${number}`;
  let result = '';
  const slen = stringNumber.length;
  for (let i = slen - 1; i >= 0; i--) {
    if (i !== slen - 1 && (slen - i - 1) % 3 === 0) {
      result = `,${result}`;
    }
    result = stringNumber[i] + result;
  }
  return result + s_float_point + tail;
};

export const random = to => Math.floor(Math.random() * to);

export function mapSource(source) {
  if (typeof source === 'string') {
    return {
      uri: source,
    };
  }
  return source;
}
