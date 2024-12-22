import { MajorType } from "@/types/major";
import { normPlovApi } from "../api";

export const majorApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    createMajor: builder.mutation<MajorType, Partial<MajorType>>({
      query: (major: Partial<MajorType>) => ({
        url: `api/v1/majors`,
        method: "POST",
        body: JSON.stringify(major),
      }),
    }),

    major: builder.query<MajorType, void>({
      query: () => ({
        url: `api/v1/majors`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateMajorMutation, useMajorQuery } = majorApi;
