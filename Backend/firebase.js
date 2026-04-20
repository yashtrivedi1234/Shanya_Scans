// // firebase.js
// import admin from "firebase-admin";
// import serviceAccount from "./serviceAccountKey.json" assert   { type: "json" };



// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// export default admin;



import fs from "fs";

import admin from "firebase-admin";

// JSON file read karo
const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json", "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
