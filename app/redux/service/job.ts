import { normPlovApi } from "../api";
import { JobDetails, JobsResponse, PostJobType } from "@/types/types";

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
        postJob: builder.mutation<JobDetails, { job: PostJobType; logo?: File }>({
            query: ({ job, logo }) => {
              const formData = new FormData();
          
              // Append fields to FormData
              formData.append("title", job.title);
              formData.append("company", job.company);
              formData.append("facebook_url", job.facebook_url);
              formData.append("location", job.location);
              formData.append("posted_at", job.posted_at);
              formData.append("description", job.description);
              formData.append("job_type", job.job_type);
              formData.append("schedule", job.schedule);
              formData.append("salary", job.salary);
              formData.append("closing_date", job.closing_date);
              formData.append("requirements", job.requirements);
              formData.append("responsibilities", job.responsibilities);
              formData.append("benefits", job.benefits);
              formData.append("email", job.email);
              formData.append("phone", job.phone);
              formData.append("website", job.website);
              formData.append("is_active", job.is_active.toString()); // Convert boolean to string
              if (logo) formData.append("logo", logo); // Append logo only if it exists
          
              return {
                url: "api//v1/jobs", // Replace {{normplov}} with your actual endpoint
                method: "POST",
                body: formData,
              };
            },
          }),
          
        getJob: builder.query<JobsResponse, { page?: number; pageSize?: number }>({
            query: ({ page = 1, pageSize = 10 }) => ({
                url: `api/v1/jobs/admin/all-jobs?page=${page}&page-size=${pageSize}`,
                method: 'GET',

            })
        })

    }),
});

export const {
    usePostJobMutation,
    usePostLogoMutation,
    useGetJobQuery,
} = jobApi;


