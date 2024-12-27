
import { normPlovApi } from "../api";
import {
    JobsResponse,
    JobDetails,
    GetJobCategoryType,
    UpdateJob,
    JobType,
    PostJob
} from "@/types/types";

export const jobApi = normPlovApi.injectEndpoints({
    endpoints: (builder) => ({
        postLogo: builder.mutation<JobDetails, { uuid: string, logo_url: File }>({

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
        postJob: builder.mutation<JobType, { job: PostJob }>({
            query: ({ job }) => {
                const formData = new FormData();
                const logo = job.logo
        
                // Append fields to FormData
                formData.append("title", job.title);
                formData.append("company", job.company);
                formData.append("logo", logo); // Append logo only if it exists
                formData.append("facebook_url", job.facebook_url || "");
                formData.append("location", job.location || "");
                formData.append("posted_at", job.posted_at || new Date().toISOString());
                formData.append("description", JSON.stringify(job.description || [])); // Convert array to JSON
                formData.append("job_type", job.job_type || "");
                formData.append("schedule", job.schedule || "");
                formData.append("salary", job.salary || "");
                formData.append("closing_date", job.closing_date || "");
                formData.append("requirements", JSON.stringify(job.requirements || [])); // Convert array to JSON
                formData.append("responsibilities", JSON.stringify(job.responsibilities || [])); // Convert array to JSON
                formData.append("benefits", JSON.stringify(job.benefits || [])); // Convert array to JSON
                formData.append("email", job.email || "");
                formData.append("phone", job.phone || "");
                formData.append("website", job.website || ""); 
                formData.append("category", JSON.stringify(job.category || [])); // Convert array to JSON
        
                return {
                    url: "api/v1/jobs", // Replace with your actual endpoint
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags:["job"]
        }),
        

        getJob: builder.query<JobsResponse, { page?: number; pageSize?: number }>({
            query: ({ page = 1, pageSize = 10 }) => ({
                url: `api/v1/jobs/admin/all-jobs?page=${page}&page-size=${pageSize}`,
                method: 'GET',

            }),
            providesTags: ["job"]
        }),

        getJobCategory: builder.query<GetJobCategoryType, void>({
            query: () => ({
                url: `api/v1/jobs/categories`,
                method: 'GET',

            }),
            providesTags: ["job"]
        }),

        updateJob: builder.mutation<
            JobType,
            { uuid: string; job: UpdateJob;  }
        >({
            query: ({ uuid, job }) => {
                const formData = new FormData();
        
                // Append fields to FormData
                formData.append("title", job.title);
                formData.append("company", job.company);
                formData.append("facebook_url", job.facebook_url || "");
                formData.append("location", job.location || "");
                // formData.append("posted_at", job.posted_at || new Date().toISOString());
                formData.append("description", JSON.stringify(job.description || [])); // Convert array to JSON
                formData.append("job_type", job.job_type || "");
                // formData.append("schedule", job.schedule || "");
                formData.append("salary", job.salary || "");
                formData.append("closing_date", job.closing_date || "");
                formData.append("requirements", JSON.stringify(job.requirements || [])); // Convert array to JSON
                formData.append("responsibilities", JSON.stringify(job.responsibilities || []));
                formData.append("email", job.email || "");
                formData.append("phone", job.phone || "");
                formData.append("website", job.website || ""); 
                formData.append("category", JSON.stringify(job.category || []));
                if (job.logo instanceof File) {
                    formData.append("logo", job.logo); // Upload the file
                }
            

                return {
                    url: `api/v1/jobs/${uuid}`,
                    method: "PATCH",
                    body: formData,
                };
            },
            invalidatesTags: ["job"],
        }),

        deleteJob : builder.mutation<JobDetails, { uuid: string }>({
            query: ({ uuid }) => ({
                url: `api/v1/jobs/${uuid}`,
                method: "DELETE",
            }),
            invalidatesTags:["job"]
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


