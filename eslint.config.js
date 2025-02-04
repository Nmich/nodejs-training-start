import antfu from '@antfu/eslint-config'

export default antfu(
  {},
  {
    rules: {
      'style/operator-linebreak': [
        'error',
        'after',
        { overrides: { '?': 'before', ':': 'before' } },
      ],
      'style/space-before-function-paren': ['error', 'always'],
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'curly': ['error', 'all'],
      'ts/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
      'import/order': [
        1,
        {
          'newlines-between': 'always',
        },
      ],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
)
