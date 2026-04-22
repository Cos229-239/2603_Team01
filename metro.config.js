const { getDefaultConfig } = require('expo/metro-config');

/**
 * Metro configuration for Expo CLI
 * https://docs.expo.dev/guides/customizing-metro
 */
const config = getDefaultConfig(__dirname);

module.exports = config;
