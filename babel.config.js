
module.exports = function (api) {
  api.cache(true);
  // const preset_react = () => process.env.NODE_ENV === 'development' || 'test' ? '@babel/plugin-transform-react-jsx-development' : '@babel/plugin-transform-react-jsx'

  return {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-react',
      '@babel/preset-typescript',
      "module:metro-react-native-babel-preset"
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
          ],
        },
      ],
    ],
    targets: {
      esmodules: true,
    },
  };
};