const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

function stub(fileName) {
  return {
    filePath: path.resolve(__dirname, fileName),
    type: 'sourceFile',
  };
}

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react-native-worklets' || moduleName.startsWith('react-native-worklets/')) {
    return stub('shims/react-native-worklets.js');
  }

  if (moduleName === '@expo/ui' || moduleName.startsWith('@expo/ui/')) {
    return stub('shims/expo-ui.js');
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
