const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const apiClient = require("../src/backend/apiClient");
const CONFIG = require("../src/backend/config");

describe("apiClient", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  describe("getProfiles", () => {
    test("should fetch profiles successfully", async () => {
      const mockData = [{ id: 1, name: "Test Profile" }];
      mock.onGet(`${CONFIG.API_URL}/profiles`).reply(200, mockData);

      const profiles = await apiClient.getProfiles();
      expect(profiles).toEqual(mockData);
    });

    test("should handle errors gracefully", async () => {
      mock.onGet(`${CONFIG.API_URL}/profiles`).reply(500);

      await expect(apiClient.getProfiles()).rejects.toThrow("Request failed with status code 500");
    });
  });

  describe("createProfile", () => {
    test("should create a profile successfully", async () => {
      const mockResponse = { status: true, profile_id: "12345" };
      mock.onGet(`${CONFIG.API_URL}/create`, {
        params: { name: "TestProfile", proxy: "socks5://127.0.0.1:5001" },
      }).reply(200, mockResponse);

      const result = await apiClient.createProfile("TestProfile", "socks5://127.0.0.1:5001");
      expect(result).toEqual(mockResponse);
    });

    test("should handle errors gracefully", async () => {
      mock.onGet(`${CONFIG.API_URL}/create`, {
        params: { name: "TestProfile", proxy: "socks5://127.0.0.1:5001" },
      }).reply(500);

      await expect(apiClient.createProfile("TestProfile", "socks5://127.0.0.1:5001")).rejects.toThrow(
        "Request failed with status code 500"
      );
    });
  });

  describe("deleteProfile", () => {
    test("should delete a profile successfully", async () => {
      const mockResponse = { status: true };
      mock.onGet(`${CONFIG.API_URL}/delete`, {
        params: { profile_id: "12345" },
      }).reply(200, mockResponse);

      const result = await apiClient.deleteProfile("12345");
      expect(result).toEqual(mockResponse);
    });

    test("should handle errors gracefully", async () => {
      mock.onGet(`${CONFIG.API_URL}/delete`, {
        params: { profile_id: "12345" },
      }).reply(500);

      await expect(apiClient.deleteProfile("12345")).rejects.toThrow("Request failed with status code 500");
    });
  });
});