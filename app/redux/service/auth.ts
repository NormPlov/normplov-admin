import { normplovapi } from "../api";

type auth = {
    email:string,
    password:string
}

export const authApi = normplovapi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<any, auth>({
            query: ({ email, password }:auth) => ({
                url:`auth/login`,
                method: "POST",
                body: JSON.stringify({email, password}),
            })
        }),
    })
})
export const { useLoginMutation } = authApi;