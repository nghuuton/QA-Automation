const isRunningInsideFirebase = require("./isRunningInsideFirebase");

function getFirebaseConfig() {
  const cfg = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };
  if (isRunningInsideFirebase()) {
    // eslint-disable-next-line import/no-unresolved,global-require
    const functions = require("firebase-functions");
    const config = functions.config();
    const runtimeConfig = JSON.parse(process.env.FIREBASE_CONFIG);
    return {
      ...cfg,
      ...runtimeConfig,
      apiKey: config.fbase.api_key,
      authDomain: `${runtimeConfig.projectId}.firebaseapp.com`,
      messagingSenderId: config.fbase.message_sender_id,
      appId: config.fbase.app_id
    };
  }
  return cfg;
}

module.exports = getFirebaseConfig();
