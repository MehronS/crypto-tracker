import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoAPIHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "73da934584msh9a24d99159780b2p103af2jsn7eea22ab192c",
};

const baseURL = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoAPIHeaders });

export const cryptoApi = createApi({
  reducerPath: `cryptoApi`,
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest(`/coins`), // adds /coins to the end of baseURL to hit the needed endpoint
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
