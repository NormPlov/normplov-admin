import { createApi, fetchBaseQuery, FetchBaseQueryError, QueryReturnValue, BaseQueryApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { setAccessToken } from "./features/auth/authSlice";

// Correcting the BaseQueryArgs type definition
type BaseQueryArgs = {
  url: string;
  method: string;
  body?: unknown; // You can refine this type further depending on the structure of your request body
};

// Change to `Record<string, unknown>` instead of `{}` for object options
type BaseQueryOptions = Record<string, unknown>; // Object with unknown properties

// Setting up the baseQuery with headers, including the token in the request
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_NORMPLOV_API,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Adjusting the type for return value of `baseQueryWithReAuth`
type BaseQueryReturnType = QueryReturnValue<unknown, FetchBaseQueryError, Record<string, unknown>>;

// baseQueryWithReAuth with the proper type

const baseQueryWithReAuth = async (
  args: BaseQueryArgs,
  api: BaseQueryApi, 
  extraOptions: BaseQueryOptions
): Promise<BaseQueryReturnType> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
	// Attempt to refresh the token
	const refreshResponse = await fetch(`/api/refresh`, {
		method: "POST",
		credentials: "include",
	});

	if (refreshResponse.ok) {
		const refreshData = await refreshResponse.json();
		api.dispatch(setAccessToken(refreshData.accessToken));
		// Retry the original query with the new token
		result = await baseQuery(args, api, extraOptions);
	} else {
		// Handle token refresh failure (e.g., log out the user)
		const res = await fetch(`/api/logout`, {
			method: "POST",
			credentials: "include",
		});
		// You might want to clear the token from the state here
	//    api.dispatch(clearToken());
		const data = await res.json();
		console.log("Token refresh failed, user logged out", data);
	}
}
return result;
};

// Create the API service with Redux Toolkit's `createApi`
export const normPlovApi = createApi({
	tagTypes:["userProfile", "job", "media", "faculty", "university", "scrape"],
	reducerPath: "normPlovApi",
	baseQuery: baseQueryWithReAuth, // Use the custom base query with re-authentication logic
	endpoints: () => ({}),
});
