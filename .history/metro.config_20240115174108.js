const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const defaultConfig = getDefaultConfig(__dirname);

// Use the Metro blacklist utility, ensuring compatibility with your Metro version
const { exclusionList } = require("metro-config/src/defaults");

defaultConfig.resolver.blacklistRE = blacklist([/#current-cloud-backend\/.*/]);

module.exports = defaultConfig;
