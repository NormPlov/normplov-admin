import { normPlovApi } from "../api";
import { ScrapeJobResponse, JobScrapeType } from "@/types/types";

export const scrape = normPlovApi.injectEndpoints({
    endpoints: (builder) => ({
        scrape: builder.mutation<JobScrapeType, { url: string }>({
            query: ({ url }) => ({
                url: "api/v1/django/job-scraper",
                method: "POST",
                body: { url },
            }),
        }),
        getScrape: builder.query<ScrapeJobResponse,  { page?: number; pageSize?: number }>({
            query : ({page, pageSize})=>({
                url:`api/v1/jobs?page=${page}&page_size=${pageSize}`,
                method: "GET",
            })
        })
    }),
});

export const { 
    useScrapeMutation,
    useGetScrapeQuery
} = scrape;
