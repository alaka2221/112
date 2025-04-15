const axios = require("axios");
const CONFIG = require("./config");

const apiClient = {
  createProfile: async (name, proxy) => {
    try {
      const url = `${CONFIG.API_URL}/profiles/create`;
      const data = {
        profile_name: name,
        group_name: "All", // Tên của group (mặc định là "All")
        browser_core: "chromium", // Mặc định là "chromium"
        browser_name: "chrome", // Mặc định là "chrome"
        browser_version: "", // Có thể để trống hoặc chỉ định phiên bản
        is_random_browser_version: false,
        raw_proxy: proxy || "", // Đảm bảo proxy không null
        startup_urls: "",
        is_noise_canvas: false,
        is_noise_webgl: false,
        is_noise_client_rect: false,
        is_noise_audio_context: true,
        is_random_screen: false,
        is_masked_webgl_data: true,
        is_masked_media_device: true,
        is_masked_font: true,
        is_random_os: false,
        os: "windows 11", // Hệ điều hành mặc định
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.124 Safari/537.36",
        note: "",
        color: "#FFFFFF",
        group_id: 1, // ID của group (mặc định là 1)
      };
      console.log("createProfile URL:", url);
      console.log("createProfile Data:", data);

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_ACCESS_TOKEN", // Thay bằng token thực tế nếu cần
        },
      });
      console.log("createProfile Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in createProfile:", error.message);
      return { success: false, message: "GPM-Login" };
    }
  },

  updateProfile: async (profileId, name, proxy, note) => {
    try {
      const url = `${CONFIG.API_URL}/profiles/update/${profileId}`;
      const data = {
        profile_name: name,
        group_id: 1, // Thay đổi nếu cần
        raw_proxy: proxy,
        startup_urls: "",
        note: note,
        color: "#FFFFFF", // Thay đổi nếu cần
        user_agent: "auto",
      };
      console.log("updateProfile URL:", url); // Log URL để kiểm tra
      console.log("updateProfile Data:", data); // Log dữ liệu gửi đi

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("updateProfile Response:", response.data); // Log phản hồi từ API
      return response.data;
    } catch (error) {
      console.error("Error in updateProfile:", error.message);
      return "ERROR";
    }
  },

  stopProfile: async (profileId) => {
    try {
      const url = `${CONFIG.API_URL}/profiles/stop/${profileId}`;
      console.log("stopProfile URL:", url);

      const response = await axios.post(url, {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_ACCESS_TOKEN", // Thay bằng token thực tế nếu cần
        },
      });
      console.log("stopProfile Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in stopProfile:", error.message);
      return "GPM-Login";
    }
  },
};

module.exports = apiClient;