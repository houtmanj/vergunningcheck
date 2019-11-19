module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: '11',
        },
        useBuiltIns: 'entry',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'styled-components',
    '@babel/transform-async-to-generator',
    '@babel/transform-arrow-functions',
    '@babel/transform-modules-commonjs',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
  ],
  env: {
    production: {
      only: ['app'],
      plugins: [
        'lodash',
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs', 'dynamic-import-node'],
    },
  },
};
