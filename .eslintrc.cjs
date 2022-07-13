module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ['eslint:recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  ignorePatterns: ['*/dist/*'],
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': 'error',
    'brace-style': ['error', '1tbs'],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error'],
    'comma-style': ['error', 'last'],
    'consistent-return': ['error', { treatUndefinedAsUnspecified: false }],
    curly: ['error', 'all'],
    'dot-location': ['error', 'property'],
    'dot-notation': 'error',
    'eol-last': ['error', 'always'],
    eqeqeq: ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'guard-for-in': 'error',
    indent: ['error', 2, { ignoredNodes: ['TemplateLiteral *'], SwitchCase: 1 }],
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'linebreak-style': ['error', 'unix'],
    'lines-around-comment': [
      'error',
      {
        beforeLineComment: true,
        allowBlockStart: true,
        allowObjectStart: true
      }
    ],
    'max-len': ['error', { code: 100, ignoreStrings: true, ignoreTemplateLiterals: true }],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-empty-function': 'error',
    'no-eval': ['error', { allowIndirect: false }],
    'no-extra-label': 'error',
    'no-extra-parens': ['error', 'functions'],
    'no-floating-decimal': 'error',
    'no-implicit-coercion': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxBOF: 0,
        maxEOF: 0
      }
    ],
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-new': 'error',
    'no-param-reassign': 'error',
    'no-prototype-builtins': 'error',
    'no-sequences': 'error',
    'no-template-curly-in-string': 'error',
    'no-tabs': ['error'],
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-unused-vars': ['error', { args: 'all', argsIgnorePattern: '^_', ignoreRestSiblings: true }],
    'no-use-before-define': ['error', 'nofunc'],
    'no-useless-escape': 'error',
    'no-var': 'error',
    'no-whitespace-before-property': 'error',
    'object-curly-spacing': ['error', 'always'],
    'object-shorthand': 'error',
    'operator-linebreak': ['off'],
    'padded-blocks': ['error', { blocks: 'never' }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'let', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'any', prev: 'case', next: 'case' },
      { blankLine: 'always', prev: '*', next: 'function' }
    ],
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'semi-spacing': ['error', { before: false, after: true }],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': [
      'error',
      { anonymous: 'never', named: 'never', asyncArrow: 'always' }
    ],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'spaced-comment': [
      'error',
      'always',
      {
        block: { exceptions: ['-+'] }
      }
    ],
    yoda: 'error'
  }
};
