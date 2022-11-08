module.exports = {
  extends: ['next', 'turbo', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'turbo/no-undeclared-env-vars': [
      'warn',
      {
        allowList: ['^[a-z_.]+']
      }
    ]
  }
}
