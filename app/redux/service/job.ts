
import { normPlovApi } from "../api";
import {
    JobsResponse,
    GetAllJobType,
    GetJobCategoryType,
    UpdateJob,
    JobType,
    PostJob
} from "@/types/types";

export const jobApi = normPlovApi.injectEndpoints({
    endpoints: (builder) => ({
        postLogo: builder.mutation<GetAllJobType, { uuid: string, logo_url: File }>({

            query: ({ uuid, logo_url }) => {
                const formData = new FormData();
                // 'file' follow your backend if backend is file put file if backend image put image 
                formData.append('logo', logo_url);
                return {
                    url: `api/v1/jobs/${uuid}/upload-logo`,
                    method: 'POST',
                    body: formData
                };

            }
        }),
       
        getJob: builder.query<JobsResponse, { page?: number; pageSize?: number, search?: string }>({
            query: ({ page = 1, pageSize = 10 , search }) => {
                const query = new URLSearchParams();
        
                query.append("page", page.toString());
                query.append("page_size", pageSize.toString());
        
                if (search) query.append("search", search);
            
                return {
                url: `api/v1/jobs/admin/all-jobs?${query.toString()}`,
                method: 'GET',

            }},
            providesTags: ["job"]
        }),

        getJobCategory: builder.query<GetJobCategoryType, void>({
            query: () => ({
                url: `api/v1/jobs/categories`,
                method: 'GET',
            }),
            providesTags: ["job"]
        }),

        updateJob: builder.mutation<JobType, { uuid: string; update: UpdateJob }>({
            query: ({ uuid, update }) => ({
                url: `api/v1/jobs/${uuid}`,
                method: "PATCH",
                body: {
                    title: update.title,
                    company: update.company,
                    description: update.description,
                    requirements: update.requirements,
                    responsibilities: update.responsibilities,
                    benefits: update.benefits,
                    category: update.category,
                    location: update.location,
                    salary: update.salary,
                    job_type: update.job_type,
                    facebook_url: update.facebook_url,
                    email: update.email,
                    phone: update.phone,
                    website: update.website,
                    logo: update.logo_url,
                    posted_at: update.posted_at,
                    closing_date: update.closing_date,
                    schedule: update.schedule,
                },
            }),
            invalidatesTags: ["job"],
        }),


        deleteJob: builder.mutation<GetAllJobType, { uuid: string }>({
            query: ({ uuid }) => ({
                url: `api/v1/jobs/${uuid}`,
                method: "DELETE",
            }),
            invalidatesTags: ["job"]
        }),

        postJob: builder.mutation<GetAllJobType, {postJob: PostJob}>({
            query: ({postJob})=>({
                url: `api/v1/jobs`,
                method: 'POST',
                body: {
                    title: postJob.title,
                    company: postJob.company,
                    description: postJob.description,
                    requirements: postJob.requirements,
                    responsibilities: postJob.responsibilities,
                    benefits: postJob.benefits,
                    category: postJob.category,
                    location: postJob.location,
                    salary: postJob.salary,
                    job_type: postJob.job_type,
                    facebook_url: postJob.facebook_url,
                    email: postJob.email,
                    phone: postJob.phone,
                    website: postJob.website,
                    logo: postJob.logo,
                    posted_at: postJob.posted_at,
                    closing_date: postJob.closing_date,
                    schedule: postJob.schedule,
                }
            })
        })


    }),
});

export const {
    usePostJobMutation,
    usePostLogoMutation,
    useGetJobQuery,
    useGetJobCategoryQuery,
    useUpdateJobMutation,
    useDeleteJobMutation
} = jobApi;


