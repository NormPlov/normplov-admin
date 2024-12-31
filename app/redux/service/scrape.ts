import { normPlovApi } from "../api";
import { ScrapeJobResponse, JobType } from "@/types/types";

export const scrape = normPlovApi.injectEndpoints({
    endpoints: (builder) => ({
        scrape: builder.mutation<JobType, { url: string }>({
            query: ({ url }) => ({
                url: "api/v1/django/job-scraper",
                method: "POST",
                body: { url },
            }),
        }),
        getScrape: builder.query<ScrapeJobResponse,  void>({
            query : ()=>({
                url:`api/v1/jobs`,
                method: "GET",
            })
        })
    }),
});

export const { 
    useScrapeMutation,
    useGetScrapeQuery
} = scrape;
