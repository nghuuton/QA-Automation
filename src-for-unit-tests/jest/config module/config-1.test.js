require("dotenv").config();
const getFirebaseConfig = require("../../config");
const isRunningInsideFirebase = require("../../isRunningInsideFirebase");

jest.mock("../../isRunningInsideFirebase", () => jest.fn(() => false));

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
    // Assert
    expect(getFirebaseConfig).toMatchObject(cfgCompare);
  });
});
