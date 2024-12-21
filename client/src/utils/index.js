import axios from "axios";
import toast from "react-hot-toast";

const productionUrl = "http://localhost:5000/api/v1";

export const customFetch = axios.create({
  baseURL: productionUrl,
  withCredentials: true,
});

export const validateUsername = (userName) => {
  const trimmedUserName = userName.trim();
  const minLength = 3;

  if (/\s/.test(trimmedUserName)) {
    return { valid: false, msg: "First name must not contain spaces." };
  }

  if (trimmedUserName.length < minLength) {
    return {
      valid: false,
      msg: `First name must be at least ${minLength} characters long.`,
    };
  }

  return { valid: true, msg: "First name is valid." };
};

export const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  if (emailRegex.test(email)) {
    return { valid: true, msg: "Email is valid." };
  }

  return { valid: false, msg: "Email is not valid." };
};

export function validatePassword(password) {
  const minLength = 8;

  if (/\s/.test(password)) {
    return { valid: false, msg: "Password must not contain any spaces." };
  }

  if (password.length < minLength) {
    return {
      valid: false,
      msg: `Password must be at least ${minLength} characters long.`,
    };
  }
  return { valid: true, msg: "Password is valid." };
}

export const toastError = (error) => {
  if (!error.response) {
    // Network or server unreachable error
    toast.error("Network error. Please check your connection.");
  } else if (error.response.status === 400) {
    // Validation error from server
    toast.error(error.response.data.message || "Invalid request.");
  } else if (error.response.status === 500) {
    // Server error
    toast.error(
      "Server is currently experiencing issues. Please try again later."
    );
  } else {
    // Fallback for unknown errors
    toast.error("Something went wrong.");
  }
};

export const userMessage = ({ message, index }) => {
  return {
    role: { type: "user" },
    index,
    message,
  };
};

export const botMessage = ({ bot, index, message, questions = [] }) => {
  return {
    role: { type: "bot", bot },
    message,
    index,
    questions: [...questions],
  };
};

export const systemMessage = ({ index, isContextClear }) => {
  return {
    role: { type: "system" },
    index,
    isContextClear,
  };
};

export const fakeFetch = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const fakeResponse = {
        status: 200,
        data: { message: "Success! This is fake data." },
      };
      resolve(fakeResponse);
    }, 2000);
  });
};
