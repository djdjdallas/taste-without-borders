const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const defaultConfig = getDefaultConfig(__dirname);

// Import the exclusionList from Metro
const { exclusionList } = require("metro-config/src/defaults");

// Use exclusionList to define blacklistRE
defaultConfig.resolver.blacklistRE = exclusionList([
  /#current-cloud-backend\/.*/,
]);

module.exports = defaultConfig;
