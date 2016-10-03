module.exports = {
  cacheDirectory: true,
  presets: [
    'babel-preset-stage-0',
    'babel-preset-es2015',
    'babel-preset-es2016',
    'babel-preset-react'
  ].map(require.resolve),
  plugins: [
    'babel-plugin-transform-decorators-legacy',
    'babel-plugin-syntax-flow',
    'babel-plugin-transform-flow-strip-types',
    'babel-plugin-syntax-trailing-function-commas',
    'babel-plugin-transform-class-properties',
    'babel-plugin-transform-object-rest-spread',
    'react-hot-loader/babel'
  ].map(require.resolve)
};
