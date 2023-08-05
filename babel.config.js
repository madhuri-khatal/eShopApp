module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: [],
    },
  },
  plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin'],
};
