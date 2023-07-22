/**
 *
 * @param {string} name
 * @param {string} value
 * @param {number|Date} maxAgeOrExpires
 */
export function setCookie(name, value, maxAgeOrExpires = 60 * 60 * 24 * 7) {
  if (typeof maxAgeOrExpires === "number") {
    document.cookie = name + "=" + value + ";max-age=" + maxAgeOrExpires;
  } else if (maxAgeOrExpires instanceof Date) {
    document.cookie = name + "=" + value + ";expires=" + maxAgeOrExpires;
  } else {
    console.log("wrong cookie!");
  }
}

export function getCookie(name) {
  let all = {};
  let arr = [];
  document.cookie.split("; ").forEach((e) => {
    const cookie = e.split("=");
    arr.push(cookie);
  });
  all = Object.fromEntries(arr);
  return all[name] || null;
}

export function removeCookie(name) {
  setCookie(name, "", -1);
}
