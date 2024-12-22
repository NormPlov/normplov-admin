import { normPlovApi } from "../api";
import { UniversitiesResponse, UniversityType } from "@/types/types";

export const universityApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    university: builder.query<
      UniversitiesResponse,
      { page: number; size: number }
    >({
      query: ({ page, size }) => ({
        url: `api/v1/schools?page=${page}&size=${size}`,
        method: "GET",
      }),
    }),

    universityDetails: builder.query<UniversityType, string>({
      query: (uuid) => ({
        url: `api/v1/schools/${uuid}`,
        method: "GET",
      }),
    }),

    createUniversity: builder.mutation<UniversityType, Partial<UniversityType>>(
      {
        query: (newUniversity) => ({
          url: "api/v1/schools",
          method: "POST",
          body: newUniversity,
        }),
      }
    ),

    editUniversity: builder.mutation<UniversityType, Partial<UniversityType>>({
      query: (updatedUniversity) => ({
        url: `api/v1/schools/${updatedUniversity.uuid}`,
        method: "PUT",
        body: updatedUniversity,
      }),
    }),

    deleteUniversity: builder.mutation<void, string>({
      query: (uuid) => ({
        url: `api/v1/schools/${uuid}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useUniversityQuery,
  useUniversityDetailsQuery,
  useCreateUniversityMutation,
  useEditUniversityMutation,
  useDeleteUniversityMutation,
} = universityApi;
