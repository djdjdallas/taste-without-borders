module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env", // Path to your .env file
          blacklist: null, // Variables to ignore
          whitelist: null, // Variables to include
          safe: false, // Throw an error if .env doesn't include all the variables
          allowUndefined: true, // Include undefined variables
        },
      ],
    ],
  };
};
