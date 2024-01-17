const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Customize the configuration. For example, to add a new asset extension:
defaultConfig.resolver.assetExts.push("db");

// To add a new exclusion pattern:
const exclusionList = require("metro-config/src/defaults/exclusionList");
const blockList = exclusionList([
  // Add the pattern(s) you want to exclude
  /some_pattern_to_exclude/,
]);

defaultConfig.resolver.blacklistRE = blockList;

module.exports = defaultConfig;
