import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`请求超时! 在 ${s} 秒内没有响应数据`));
    }, s * 1000);
  });
};

const AJAX = async function(url, uploadData = void 0){
  try {
    const fetchPro = uploadData ? fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadData)
    }) : fetch(url)
    const result = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await result.json();
    if (!result.ok) throw new Error(`${data.message}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export { AJAX };
