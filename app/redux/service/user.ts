
import { normPlovApi } from "../api";
import { User, UserReponse, UserListResponse, FeedbackResponse, UpdateProfileResponse, ChangePasswordType, TestsResponse, MetricsResponse } from "@/types/types";


export const userApi = normPlovApi.injectEndpoints({
    endpoints: (builder) => ({
        // Endpoint to get the current user's profile
        getMe: builder.query<UserReponse, void>({
            query: () => ({
                url: `api/v1/user/me`,
                method: 'GET',
            }),
            providesTags: ["userProfile"]
        }),

        getAllUser: builder.query<UserListResponse, { page?: number; pageSize?: number; search?: string; is_active?:boolean }>({
            query: ({ page = 1, pageSize = 10, search, is_active }) => {
                const query = new URLSearchParams();
        
                query.append("page", page.toString());
                query.append("page_size", pageSize.toString());
        
                if (search) query.append("search", search);
                if (is_active !== undefined) query.append("is_active", is_active.toString());
                return {
                    url: `api/v1/user/list?${query.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["userProfile"],
        }),
        
        // user feedback
        getUserFeedback: builder.query<FeedbackResponse, { page?: number; pageSize?: number, search?: string , is_promoted}>({
            query: ({ page = 1, pageSize = 10, search, is_promoted }) => {
                const query = new URLSearchParams();
        
                query.append("page", page.toString());
                query.append("page_size", pageSize.toString());
        
                if (search) query.append("search", search);
                if (is_promoted !== undefined) query.append("is_promoted", is_promoted.toString());
                return {
                    
                url: `api/v1/feedback/all?${query.toString()}`,
                method: 'GET'
                }
            },
            providesTags:["userProfile"]
        }),

        // promote feedback
        promoteFeedback: builder.mutation<FeedbackResponse, { uuid: string }>({
            query: ({uuid}) => ({
                url: `api/v1/feedback/promote/${uuid}`,
                method: 'POST'
            }),
            invalidatesTags:["userProfile"]
        }),

        // get user by uuid 
        getUserBYuuid: builder.query<User, string | undefined>({
            query: (uuid) => ({
                url: `api/v1/user/retrieve/${uuid}`,
                method: 'GET'
            }),
            providesTags:["userProfile"]
        }),

        // Block user
        blockUser: builder.mutation<User, string>({
            query: (uuid) => ({
                url: `api/v1/user/block/${uuid}`,
                method: 'PUT',
                body: {
                    is_blocked: true
                }
            }),
            invalidatesTags:["userProfile"]
        }),
        // Unblock user
        unBlockUser: builder.mutation<User, string>({
            query: (uuid) => ({
                url: `api/v1/user/unblock/${uuid}`,
                method: 'PUT',
                body: {
                    is_blocked: false
                }
            }),
            invalidatesTags:["userProfile"]
        }),
        // Post image by uuid user
        postImage: builder.mutation<User, { uuid: string ; avatar_url: File }>({
            query: ({ uuid, avatar_url }) => {
                const formData = new FormData();
                // 'file' follow your backend if backend is file put file if backend image put image 
                formData.append('file', avatar_url); 
                return {
                    url: `api/v1/user/profile/upload/${uuid}`,
                    method: 'POST',
                    body: formData, 
                   
                };
            },
            invalidatesTags:["userProfile"]
        }),

        // update info user
        UpdateUserInfo: builder.mutation<UpdateProfileResponse, { uuid: string; user: UpdateProfileResponse }>({
            query: ({ uuid, user }) => ({
                url: `api/v1/user/profile/update/${uuid}`, 
                method: "PUT", 
                body: {
                    username: user.username,
                    address: user.address,
                    phone_number: user.phone_number,
                    bio: user.bio,
                    gender: user.gender,
                    date_of_birth: user.date_of_birth,
                },
            }),
            invalidatesTags:["userProfile"]
        }),

        // change password 
        changePassword: builder.mutation<UpdateProfileResponse, {changePassword:ChangePasswordType}>({
            query: ({changePassword}) => ({
                url:`api/v1/user/change-password`,
                method: 'POST',
                body: {
                    old_password: changePassword.old_password,
                    new_password: changePassword.new_password,
                    confirm_new_password: changePassword.confirm_new_password
                }
            }),
            invalidatesTags:["userProfile"]
        }),

        // list test history
        getTestHistory: builder.query<TestsResponse, { page: number; pageSize: number , search, is_draft }>({
            query: ({ page, pageSize, search, is_draft }) => {
                const query = new URLSearchParams();
        
                query.append("page", page.toString());
                query.append("page_size", pageSize.toString());
        
                if (search) query.append("search", search);
                if (is_draft !== undefined) query.append("is_draft", is_draft.toString());
            
            return {
              url: `api/v1/test/all-tests?${query.toString()}`,
              method: 'GET',
            }
        },
            providesTags: ["userProfile"], 
          }),

        // statitics
        getStatistics: builder.query<MetricsResponse, void>({
            query: () => ({
                url: `api/v1/admin/metrics`,
                method: 'GET',
            })
        })

    }),
});

// Export hooks for usage in components
export const {
    useGetMeQuery,
    useGetAllUserQuery,
    useGetUserBYuuidQuery,
    useBlockUserMutation,
    useUnBlockUserMutation,
    useGetUserFeedbackQuery,
    usePromoteFeedbackMutation,
    useUpdateUserInfoMutation,
    usePostImageMutation,
    useChangePasswordMutation,
    useGetTestHistoryQuery,
    useGetStatisticsQuery
} = userApi;
