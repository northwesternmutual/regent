export default (testRule) => { // eslint-disable-line arrow-body-style
  return typeof testRule === 'function' ||
  (testRule !== undefined
    && (Object.hasOwnProperty.call(testRule, ['left']) || Object.hasOwnProperty.call(testRule, ['right']))
    && Object.hasOwnProperty.call(testRule, ['fn']));
};
