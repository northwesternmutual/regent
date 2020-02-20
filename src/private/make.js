import makeArgs from './make-args';

export default fn =>
  (...args) =>
    data =>
      fn(...Object.values(makeArgs(data, ...args)));
