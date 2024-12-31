import { normPlovApi } from "../api";
import { UniversitiesResponse, UniversityType } from "@/types/types";

export const universityApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    university: builder.query<
      UniversitiesResponse,
      { page: number; size: number; search?: string; type?: string }
    >({
      query: ({ page, size, search, type }) => ({
        url: `api/v1/schools`,
        method: "GET",
        params: { page, size, search, type },
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

    editUniversity: builder.mutation<
      UniversityType,
      { uuid: string; data: Partial<UniversityType> }
    >({
      query: ({ uuid, data }) => ({
        url: `api/v1/schools/${uuid}`,
        method: "PATCH",
        body: data,
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
