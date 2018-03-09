export default (testRule) => { // eslint-disable-line arrow-body-style
  return testRule !== undefined
    && Object.hasOwnProperty.call(testRule, ['left'])
    && Object.hasOwnProperty.call(testRule, ['fn'])
    && Object.hasOwnProperty.call(testRule, ['right']);
};
