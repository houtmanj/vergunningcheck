module.exports = {
  presets: ['@babel/env'], // "@babel/preset-env"
  plugins: [
    'styled-components',
    '@babel/transform-async-to-generator',
    '@babel/transform-arrow-functions',
    '@babel/transform-modules-commonjs',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
  ], // same as "@babel/plugin-transform-arrow-functions"
};
