import { customFetch } from "../utils";

export const createNewChat = async ({ botId }) => {
  return await customFetch.post("/chat/start", { botId });
};

export const getAllChat = async ({ page }) => {
  return await customFetch.get(`/chat?page=${page || "1"}`);
};

export const getChat = async (id) => {
  return await customFetch.get(`chat/${id}`);
};

export const getShareLink = async (chatId) => {
  return await customFetch.post("chat/share", { chatId });
};

export const getShareChat = async ({ shareChatId, page = 1 }) => {
  return await customFetch.get(`chat/share/${shareChatId}?page=${page}`);
};
