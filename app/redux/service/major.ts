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
      invalidatesTags: ["major"],
    }),

    major: builder.query<MajorType, void>({
      query: () => ({
        url: `api/v1/majors`,
        method: "GET",
      }),
      providesTags:["major"]
    }),
    updateMajor: builder.mutation({
      query: ({ id, ...major }) => ({
        url: `api/v1/majors/${id}`,
        method: "PATCH",
        body: major,
      }),
      invalidatesTags: ["major"],
    }),
    deleteMajor: builder.mutation({
      query: ({id}) => ({
        url: `api/v1/majors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["major"],
    }),
  }),
});

export const { 
  useCreateMajorMutation,
  useMajorQuery,
  useUpdateMajorMutation,
  useDeleteMajorMutation,
 } = majorApi;
