const fingerprint = require("../src/backend/fingerprint");

describe("Fingerprint Module", () => {
  test("createFakeFingerprint should create a profile successfully", async () => {
    const response = await fingerprint.createFakeFingerprint("TestProfile", "socks5://127.0.0.1:5001");
    expect(response.status).toBe(true);
    expect(response.profile_id).toBeDefined();
  });

  test("updateFingerprint should update a profile successfully", async () => {
    const response = await fingerprint.updateFingerprint("example_profile_id", "UpdatedProfile", "socks5://127.0.0.1:5002", "Updated note");
    expect(response).toBe("OK");
  });

  test("stopFingerprint should stop a profile successfully", async () => {
    const response = await fingerprint.stopFingerprint("example_profile_id");
    expect(response).toBe("OK");
  });
});