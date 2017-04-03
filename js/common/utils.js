import isUrl from 'is-url';

export const toHumanNumber = (fNumber) => {
  let number = fNumber;
  let tail = '';
  let sFloatPoint = '';
  if (number >= 10000) {
    tail = 'k';
    const floatPoint = Math.floor(number / 100) % 10;
    sFloatPoint = floatPoint === 0 ? '' : `.${floatPoint}`;
    number = Math.floor(number / 1000);
    if (number >= 100) {
      sFloatPoint = '';
    }
  }
  const stringNumber = `${number}`;
  let result = '';
  const slen = stringNumber.length;
  for (let i = slen - 1; i >= 0; i -= 1) {
    if (i !== slen - 1 && (slen - i - 1) % 3 === 0) {
      result = `,${result}`;
    }
    result = stringNumber[i] + result;
  }
  return result + sFloatPoint + tail;
};

export const random = to => Math.floor(Math.random() * to);

export function mapSource(source) {
  if (typeof source === 'string' && isUrl(source)) {
    return {
      uri: source,
    };
  }
  return source;
}

export function bindFn(fn, ...args) {
  if (!fn) {
    return fn;
  }
  return fn.bind(null, ...args);
}

export function liftEdges(edges) {
  return edges.map(edge => edge.node);
}
