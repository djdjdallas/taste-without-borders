const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const defaultConfig = getDefaultConfig(__dirname);

// Use the Metro blacklist utility, ensuring compatibility with your Metro version
const blacklist = require("metro-config/src/defaults/blacklist");

defaultConfig.resolver.blacklistRE = blacklist([/#current-cloud-backend\/.*/]);

module.exports = defaultConfig;
