const { makeMetroConfig } = require("@rnx-kit/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");

// Add your pattern to be excluded here
const blockList = exclusionList([/#current-cloud-backend\/.*/]);

module.exports = makeMetroConfig({
  resolver: {
    blacklistRE: blockList,
  },
});
