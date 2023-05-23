import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`请求超时! 在 ${s} 秒内没有响应数据`));
    }, s * 1000);
  });
};

const getJSON = async function (url) {
  try {
    const result = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await result.json();
    if (!result.ok) throw new Error(`${data.message}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export { getJSON };
