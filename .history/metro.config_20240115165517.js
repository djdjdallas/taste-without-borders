const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const defaultConfig = getDefaultConfig(__dirname);

// Import exclusionList from the defaults
const { exclusionList } = require("metro-config/src/defaults");

// Add a blacklist for files you want Metro to ignore
// Use the exclusionList function directly
defaultConfig.resolver.blacklistRE = exclusionList([
  /#current-cloud-backend\/.*/,
]);

module.exports = defaultConfig;
