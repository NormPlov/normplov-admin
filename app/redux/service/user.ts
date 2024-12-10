
import { normPlovApi } from "../api";
import { User, UserListResponse, FeedbackResponse} from "@/types/types";

export const userApi = normPlovApi.injectEndpoints({
    endpoints: (builder) => ({
        // Endpoint to get the current user's profile
        getMe: builder.query<User, void>({
            query: () => ({
                url: `api/v1/user/me`,
                method: 'GET',
            }),
        }),

        // Endpoint to get a paginated list of users
        getAllUser: builder.query<UserListResponse, { page?: number; pageSize?: number }>({
            query: ({ page = 1, pageSize = 10 }) => ({
                url: `api/v1/user/list?page=${page}&page_size=${pageSize}`,
                method: 'GET',
            }),
        }),
        
        // user feedback
        getUserFeedback: builder.query<FeedbackResponse,  { page?: number; pageSize?: number }>({
            query:({ page = 1, pageSize = 10 })=>({
                url: `api/v1/feedback/all?page=${page}&page-size=${pageSize}`,
                method:'GET'
            })
        }),

        // get user by uuid 
        getUserBYuuid: builder.query<User, void>({
            query:(uuid)=>({
                url:`api/v1/user/retrieve/${uuid}`,
                method:'GET'
            })
        }),

        // Block user
        blockUser: builder.mutation<User, string>({
            query:(uuid)=>({
                url: `api/v1/user/block/${uuid}`,
                method:'PUT'
            })
        })
    }),
});

// Export hooks for usage in components
export const { 
    useGetMeQuery, 
    useGetAllUserQuery ,
    useGetUserBYuuidQuery,
    useBlockUserMutation,
    useGetUserFeedbackQuery
} = userApi;
