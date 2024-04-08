import axios from 'axios';

const wordsToSearch = ['ゾをネツキ', 'ゾをネツ', 'word3']; // Mảng các từ cần tìm kiếm

async function fetchData(query) {
  try {
    let data = JSON.stringify({
      "dict": "javi",
      "type": "word",
      "query": query,
      "limit": 1,
      "page": 1
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://mazii.net/api/search',
      headers: { 
        'authority': 'mazii.net', 
        'accept': 'application/json, text/plain, */*', 
        'accept-language': 'vi,en;q=0.9,vi-VN;q=0.8,fr-FR;q=0.7,fr;q=0.6,en-US;q=0.5', 
        'content-type': 'application/json', 
        'cookie': '_ga_LKB9Y1209V=GS1.2.1696903616.1.1.1696904892.60.0.0; G_ENABLED_IDPS=google; _cc_id=e8e8a14b53e840d91eb656e7812601af; _gid=GA1.2.931165698.1697679078; panoramaId_expiry=1698283910324; panoramaId=1bb9aec2c9ff57a7024e0c5715fb16d539385c804ecd9fda89bb9cb011947800; panoramaIdType=panoIndiv; cto_bundle=Wortfl9QJTJCc0FuUkNrcmRoRXNoSkQwT3g3YmZLdUNid0Jtcm53aHZ4dFlBM2hzQ2VQa2lzZlU1RThDRmslMkZXRXUybjN2TXN5T01jbmlTbmdzZnRoeGFEdWdPbkNibUx1eUZseFZ2dzRQZkpNTjAzd1pxUEpqbHNGOWZzaThveXNwNTBwSEN4TkJvUlNybk5LRURTSSUyRjI1RGJ1eW8wcXFkJTJCYjJJcDF2aGRKRm9LUjg5ZiUyRnNvWDlnTXhiSmdhbTlJN2N3UURCVWxKTExyRVN0V0cySnBKSk05WWxWblVmeFE2U3dUV2R4QURmS05wc012MiUyRlJsRmh4WFdUcTZuWUtKVUYyanZmVnFVRUxrWVMxdHZ4ajFEZ3lCSVg3OG9lNVBDT2xta3pOcDlpUTJBWEp5THZFMkZBNmVqUlB3ZFhLRzN3WEtMUg; _ga=GA1.2.2025072498.1696903616; ph_phc_C8t1V9riJI8sIm2fcxyciTpdSEpI2KUFL8RFG2jdTSn_posthog=%7B%22distinct_id%22%3A%220189b5bf-08e6-7d27-9f74-fe0a140e3f1c%22%2C%22%24device_id%22%3A%220189b5bf-08e6-7d27-9f74-fe0a140e3f1c%22%2C%22%24user_state%22%3A%22anonymous%22%2C%22%24sesid%22%3A%5B1697683331925%2C%22018b458e-f3e4-7029-ac1c-7bfe65e9ed06%22%2C1697679078372%5D%7D; _ga_XN196EXE2T=GS1.1.1697679077.9.1.1697683892.60.0.0', 
        'origin': 'https://mazii.net', 
        'referer': 'https://mazii.net/my-MM/discover', 
        'sec-ch-ua': '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"', 
        'sec-ch-ua-mobile': '?1', 
        'sec-ch-ua-platform': '"Android"', 
        'sec-fetch-dest': 'empty', 
        'sec-fetch-mode': 'cors', 
        'sec-fetch-site': 'same-origin', 
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36'
      },
      data: data
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function searchWords(words) {
  try {
    const results = [];
    for (const word of words) {
      const data = await fetchData(word); // Gọi hàm fetchData cho từ hiện tại trong vòng lặp
      results.push({ word, data }); // Lưu kết quả cho từ hiện tại vào mảng results
    }
    return results; // Trả về mảng kết quả
  } catch (error) {
    console.error('Error searching words:', error);
    throw error;
  }
}

// Gọi hàm searchWords với mảng các từ cần tìm kiếm
searchWords(wordsToSearch)
  .then(results => {
    console.log('Search results:', results); // Log kết quả tìm kiếm
  })
  .catch(error => {
    console.error('Error:', error); // Log lỗi nếu có
  });