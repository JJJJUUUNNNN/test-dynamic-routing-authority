/**
 *
 * @param {string} name
 * @param {string} value
 * @param {number|Date} maxAgeOrExpires---过期时间 传入值为number时表示传入的是秒  为Date时传入的是时间 (此处设置默认过期时间为7天)
 */
export function setCookie(name, value, maxAgeOrExpires = 60 * 60 * 24 * 7) {
  if (typeof maxAgeOrExpires === 'number') {
    document.cookie = `${name}=${value};max-age=${maxAgeOrExpires}`;
  } else if (maxAgeOrExpires instanceof Date) {
    document.cookie = `${name}=${value};expires=${maxAgeOrExpires}`;
  } else {
    console.log('wrong cookie!');
  }
}

// 获取cookie
// export function getCookie(name) {
//   let all = {};
//   let arr = [];

//   // document.cookie获取到的是一个包含所有cookie的字符串
//   // 格式:myToken=test-token-key-wjj; myToken2=test-token-key-wjj2
//   // 因此要先通过"; "切割,成一个数组: ["myToken=test-token-key-wjj","myToken2=test-token-key-wjj2"]
//   document.cookie.split("; ").forEach((e) => {
//     // 然后循环遍历数组在把其中的每个元素通过'='切成两个数组:["myToken","test-token-key-wjj"],["myToken2","test-token-key-wjj2"]
//     const cookie = e.split("=");
//     // 再把他们放进一个数组中变成了这个形式:[[],[]]
//     arr.push(cookie);
//   });
//   // 在调用Object.fromEntries([[],[]])方法,可以将其转化成键值对对象:{myToken:"test-token-key-wjj",myToken2:"test-token-key-wjj2"}
//   all = Object.fromEntries(arr);
//    // 最后就可以通过  对象[name]来获得想要的cookie
//   return all[name] || null;
// }
export function getCookie(name) {
  const cookieRecord = {};
  // document.cookie获取到的是一个包含所有cookie的字符串
  // 格式:myToken=test-token-key-wjj; myToken2=test-token-key-wjj2
  // 因此要先通过"; "切割,成一个数组: ["myToken=test-token-key-wjj","myToken2=test-token-key-wjj2"]
  document.cookie.split('; ').forEach((e) => {
    // 然后循环遍历数组在把其中的每个元素通过'='切成两个数组:["myToken","test-token-key-wjj"],["myToken2","test-token-key-wjj2"]
    const cookie = e.split('=');
    // const key = cookie[0]
    // const value = cookie[1]
    const [key, value] = cookie;
    cookieRecord[key] = value;
  });
  // 在调用Object.fromEntries([[],[]])方法,可以将其转化成键值对对象:{myToken:"test-token-key-wjj",myToken2:"test-token-key-wjj2"}
  // 最后就可以通过  对象[name]来获得想要的cookie
  return cookieRecord[name] || null;
}
// 移除cookie
export function removeCookie(name) {
  setCookie(name, '', -1);
}
