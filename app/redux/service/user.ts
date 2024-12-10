import { normPlovApi } from "../api";
import { UserMe } from "@/types/types";

export const userApi = normPlovApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<UserMe, void>({
            query: () => ({
                url: `user/me`,
                method: 'GET',
            }),
            // transformResponse: (response: { payload: UserMe }) => {
            //     console.log("Raw response from API:", response);
            //     return response.payload; // Transform response to return only payload
            // },
        }),
    }),
});

export const { useGetMeQuery } = userApi;
