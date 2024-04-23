import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getCookie = (name: string) => {
  return cookies.get(name);
};
