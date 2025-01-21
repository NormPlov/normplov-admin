import { MajorType } from "@/types/major";
import { normPlovApi } from "../api";

export const majorApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    // create major
    createMajor: builder.mutation({
      query: (major) => ({
        url: "api/v1/majors/",
        method: "POST",
        body: major,
      }),
      invalidatesTags: ["faculty"],
    }),

    major: builder.query<MajorType, void>({
      query: () => ({
        url: `api/v1/majors`,
        method: "GET",
      }),
      providesTags:["faculty"]
    }),
    updateMajor: builder.mutation({
      query: ({ id, ...major }) => ({
        url: `api/v1/majors/${id}`,
        method: "PATCH",
        body: major,
      }),
      invalidatesTags: ["faculty"],
    }),
    deleteMajor: builder.mutation({
      query: ({id}) => ({
        url: `api/v1/majors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faculty"],
    }),
  }),
});

export const { 
  useCreateMajorMutation,
  useMajorQuery,
  useUpdateMajorMutation,
  useDeleteMajorMutation,
 } = majorApi;
