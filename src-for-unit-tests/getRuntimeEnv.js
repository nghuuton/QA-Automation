module.exports = function getRuntimeEnv() {
  return process.env.JUPITER_RUNTIME_ENV || process.env.NODE_ENV || "development";
};
