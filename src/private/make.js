import makeArgs from './make-args';

export default (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('make must be passed a function as argument 1');
  }

  return (...args) =>
    data =>
      fn(...Object.values(makeArgs(data, ...args)), data);
};

