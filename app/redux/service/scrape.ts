import { normPlovApi } from "../api";
import { ScrapeJobResponse, JobScrapeType, JobDetailsResponse, UpdateJob } from "@/types/types";

export const scrape = normPlovApi.injectEndpoints({
    endpoints: (builder) => ({
        scrape: builder.mutation<JobScrapeType, { url: string }>({
            query: ({ url }) => ({
                url: "api/v1/django/job-scraper",
                method: "POST",
                body: { url },
            }),
            invalidatesTags: ["scrape"]
        }),
        getScrape: builder.query<ScrapeJobResponse, { page?: number; pageSize?: number }>({
            query: ({ page, pageSize }) => ({
                url: `api/v1/django/jobs?page=${page}&page_size=${pageSize}`,
                method: "GET",
            }),
            providesTags: ["scrape"]
        }),
        scrapeDetails: builder.query<JobDetailsResponse, { uuid: string }>({
            query: ({ uuid }) => ({
                url: `api/v1/django/jobs/${uuid}`,
                method: "GET",
            }),
            providesTags: ["scrape"]
        }),

        deleteScrape: builder.mutation<JobScrapeType, { uuid: string }>({
            query: ({ uuid }) => ({
                url: `api/v1/django/jobs/delete/${uuid}`,
                method: "DELETE",
            }),
            invalidatesTags: ["scrape"]
        }),
        
         updateScrapeJob: builder.mutation<JobScrapeType, { uuid: string; update: UpdateJob }>({
                    query: ({ uuid, update }) => ({
                        url: `api/v1/django/jobs/update/${uuid}`,
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
                            logo: update.logo,
                            posted_at: update.posted_at,
                            closing_date: update.closing_date,
                            schedule: update.schedule,
                        },
                    }),
                    invalidatesTags: ["scrape"],
                }),
    }),
});

export const {
    useScrapeMutation,
    useGetScrapeQuery,
    useScrapeDetailsQuery,
    useDeleteScrapeMutation,
    useUpdateScrapeJobMutation
} = scrape;
