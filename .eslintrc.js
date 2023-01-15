module.exports = {
  'env': {
    'es6': true,
  },
  'extends': [
    'eslint:recommended',
    'next/core-web-vitals'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};