const styleVars1 = {
  'global': {
    '$a': {
      'type': 'SassNumber',
      'value': 123,
      'unit': 'px',
      'sources': ['/Users/John/code/babel-plugin-sass-extract/examples/basic/test.scss'],
      'expressions': ['123px']
    }
  }
};

const styleVars2 = {
  'global': {
    '$a': {
      'type': 'SassNumber',
      'value': 123,
      'unit': 'px',
      'sources': ['/Users/John/code/babel-plugin-sass-extract/examples/basic/test.scss'],
      'expressions': ['123px']
    }
  }
};

console.log('styleVars1', styleVars1);
console.log('styleVars2', styleVars2);