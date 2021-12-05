import axios from 'axios';

const BASE_PATH = 'http://130.193.44.96:8080/fmh';

export const request = async (
  methodType,
  path,
  body,
) => {
  const client = axios.request({
    method: methodType,
    url: BASE_PATH + path,
    data: body,
  });
  
  return await client();
};

