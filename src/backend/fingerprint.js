const apiClient = require("./apiClient");

const fingerprint = {
  createFakeFingerprint: async (name, proxy) => {
    const response = await apiClient.createProfile(name, proxy);
    console.log("Phản hồi từ createFakeFingerprint:", response);

    if (response.success && response.data && response.data.id) {
      console.log("Tạo hồ sơ thành công:", response.data.id);
      return response; // Trả về phản hồi thành công
    } else {
      console.error("Không thể tạo hồ sơ.");
      return response; // Trả về phản hồi lỗi
    }
  },

  updateFingerprint: async (profileId, name, proxy, note) => {
    const response = await apiClient.updateProfile(profileId, name, proxy, note);
    console.log("Phản hồi từ updateFingerprint:", response);
    if (response === "OK") {
      console.log("Cập nhật hồ sơ thành công.");
      return response; // Trả về phản hồi
    } else {
      console.error("Không thể cập nhật hồ sơ.");
      return response; // Trả về phản hồi lỗi
    }
  },

  stopFingerprint: async (profileId) => {
    const response = await apiClient.stopProfile(profileId);
    console.log("Phản hồi từ stopFingerprint:", response);
    if (response === "OK") {
      console.log("Dừng hồ sơ thành công.");
      return response; // Trả về phản hồi
    } else {
      console.error("Không thể dừng hồ sơ.");
      return response; // Trả về phản hồi lỗi
    }
  },
};

module.exports = fingerprint;