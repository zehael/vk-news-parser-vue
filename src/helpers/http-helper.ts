import type { API_METHOD } from "@/types/http";

interface IRequestData {
  queryParams: any;
  requestUrl: string;
}

// Данный токен имеет единственное право доступа: чтение новостей сообщества
// и не нуждается в замене или сокрытии
const vkAccessToken =
  "5a8f3293f0c0a95f0e37be6c0d07ea0851c709dc2c5c3c70728837fedb5436078c82ee015a2d169e7c57a";

const baseUrl = "https://api.vk.com/method";

const baseQueryParams = {
  access_token: vkAccessToken,
  v: "5.131",
};

function createRequestData(method: API_METHOD, params: any): IRequestData {
  return {
    queryParams: { ...params, ...baseQueryParams },
    requestUrl: `${baseUrl}/${method}`,
  };
}

export { createRequestData };
