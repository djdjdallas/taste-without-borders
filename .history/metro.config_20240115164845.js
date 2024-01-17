const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const defaultConfig = getDefaultConfig(__dirname);
const { exclusionList } = require("metro-config/src/defaults");

// Add a blacklist for files you want Metro to ignore
const blacklist = require("metro-config/src/defaults/exclusionList");
defaultConfig.resolver.blacklistRE = blacklist([/#current-cloud-backend\/.*/]);

module.exports = defaultConfig;
