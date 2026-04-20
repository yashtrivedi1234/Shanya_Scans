// server.cjs
import('./server.js')
  .then(() => {
    console.log("✅ Server is running successfully.");
  })
  .catch((err) => {
    console.error("❌ Error loading server.js:", err);
  });
