import axios from "axios";

const LOGIN_URL = "https://react-interview.xm.com/login";

export const login = async (name: string, password: string) => {
  try {
    const response = await axios.post(LOGIN_URL, { name, password });
    const token = response.data.token;
    const expiresIn = 10 * 60 * 1000;
    const expirationTime = new Date().getTime() + expiresIn;

    localStorage.setItem("jwtToken", token);
    localStorage.setItem("tokenExpiration", expirationTime.toString());

    return token;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("tokenExpiration");
};

export const getToken = () => {
  const token = localStorage.getItem("jwtToken");
  const expirationTime = parseInt(
    localStorage.getItem("tokenExpiration") || "0",
    10,
  );

  if (new Date().getTime() > expirationTime) {
    logout();
    return null;
  }

  return token;
};
