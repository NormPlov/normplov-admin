import { normPlovApi } from "../api";
import { LoginType } from "@/types/types";


export const authApi = normPlovApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginType, LoginType>({
            query: ({ email, password }:LoginType) => ({
                url:`auth/login`,
                method: "POST",
                body: JSON.stringify({email, password}),
            })
        }),
    })
})
export const { useLoginMutation } = authApi;