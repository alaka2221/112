const fingerprint = require("./fingerprint");

(async () => {
  try {
    console.log("Starting fake fingerprint tool...");

    // Tạo một profile giả
    const createResponse = await fingerprint.createFakeFingerprint("TestProfile", "socks5://127.0.0.1:5001");
    console.log("Create Response:", createResponse);

    if (!createResponse.success || !createResponse.data || !createResponse.data.id) {
      console.error("Không thể tạo hồ sơ.");
      return;
    }

    const profileId = createResponse.data.id;

    // Cập nhật profile
    const updateResponse = await fingerprint.updateFingerprint(profileId, "UpdatedProfile", "socks5://127.0.0.1:5002", "Updated note");
    console.log("Update Response:", updateResponse);

    // Dừng profile
    const stopResponse = await fingerprint.stopFingerprint(profileId);
    console.log("Stop Response:", stopResponse);

    console.log("Done!");
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();