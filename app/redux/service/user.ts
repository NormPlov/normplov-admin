// import { normplovapi } from "../api";

// export const userApi = normplovapi.injectEndpoints({
//     endpoints: (builder) => ({
//         getAllUser: builder.query<any, { page: number; pageSize: number }>({
//             query: ({ page = 1, pageSize = 10 }) =>
//                 `api/user/?page=${page}&page_size=${pageSize}`,
//         }),
//     })
// })
// export const { useGetAllUserQuery } = userApi;