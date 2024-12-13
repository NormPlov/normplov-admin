import { normPlovApi } from "../api";
import { UniversityType } from "@/types/types";

export const universityApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    university: builder.query<UniversityType, { page: number; size: number }>({
      query: ({ page }) => ({
        url: `schools?page=${page}&size=50`,
        method: "GET", // Optional, 'GET' is the default
      }),
    }),

    universityDetails: builder.query<UniversityType, string>({
      query: (uuid) => ({
        url: `schools/${uuid}/details`,
        method: "GET", // Optional, 'GET' is the default
      }),
    }),
  }),
});

export const { useUniversityQuery, useUniversityDetailsQuery } = universityApi;
