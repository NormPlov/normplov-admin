import { normPlovApi } from "../api";
import { UniversitiesResponse, UniversityType } from "@/types/types";

export const universityApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    university: builder.query<UniversitiesResponse, { page: number; size: number }>({
      query: ({ page }) => ({
        url: `api/v1/schools?page=${page}&size=50`,
        method: "GET", // Optional, 'GET' is the default
      }),
    }),

    universityDetails: builder.query<UniversityType, string>({
      query: (uuid) => ({
        url: `api/v1/schools/${uuid}/details`,
        method: "GET", // Optional, 'GET' is the default
      }),
    }),
  }),
});

export const { useUniversityQuery, useUniversityDetailsQuery } = universityApi;
