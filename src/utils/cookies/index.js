import { setCookie, getCookie, removeCookie } from "./cookies";

const TokenKey = "myToken";

export function getToken() {
  return getCookie(TokenKey);
}

export function setToken(token) {
  setCookie(TokenKey, token, );
}

export function removeToken() {
  removeCookie(TokenKey);
}
