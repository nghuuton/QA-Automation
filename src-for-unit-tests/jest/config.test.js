require("dotenv").config();
const getFirebaseConfig = require("../config");
const isRunningInsideFirebase = require("../isRunningInsideFirebase");

describe("Firebase Config Module", () => {
  test("should compare firebase cfg", () => {
    // Setup
    const cfgCompare = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };
    // Run
    const result = isRunningInsideFirebase();
    // Assert
    expect(result).not.toBeNull();
    expect(result).toBeFalsy();
    expect(getFirebaseConfig).toMatchObject(cfgCompare);
  });

  test("should compare .env FIREBASE_CONFIG && FIREBASE FUNCTION SET", () => {
    // Setup
    const cfg = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };
    // Run
    const result = isRunningInsideFirebase();
    const cfgCompare = result
      ? {
          ...cfg,
          ...JSON.parse(process.env.FIREBASE_CONFIG),
          messagingSenderId: "184084184088",
          appId: "2:184084184088:web:d249787da3a9d72d51d76d",
          apiKey: "AIzaSyBL-aOKr4-OO4ux6-MxBlxsVVtpYHO_PIY",
        }
      : {};
    // Assert
    expect(result).not.toBeNull();
    expect(result).toBeTruthy();
    expect(getFirebaseConfig).toMatchObject(cfgCompare);
  });
});
