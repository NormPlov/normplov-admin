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
    // getAllFaculties: builder.query({
    //   query: (uuid) => ({
    //     url: `api/v1/faculties`,
    //     method: "GET",
    //   }),
    // }),
    // getAllMajors: builder.query({
    //   query: (uuid) => ({
    //     url: `api/v1/majors`,
    //     method: "GET",
    //   }),
    // }),
    createFaculty: builder.mutation({
      query: (faculty) => ({
        url: "api/v1/faculties",
        method: "POST",
        body: faculty,
      }),
    }),
    createMajor: builder.mutation({
      query: (major) => ({
        url: "api/v1/majors",
        method: "POST",
        body: major,
      }),
    }),
    updateFaculty: builder.mutation({
      query: ({ id, ...faculty }) => ({
        url: `faculties/${id}`,
        method: "PUT",
        body: faculty,
      }),
    }),
    deleteFaculty: builder.mutation({
      query: (id) => ({
        url: `faculties/${id}`,
        method: "DELETE",
      }),
    }),
    updateMajor: builder.mutation({
      query: ({ id, ...major }) => ({
        url: `majors/${id}`,
        method: "PUT",
        body: major,
      }),
    }),
    deleteMajor: builder.mutation({
      query: (id) => ({
        url: `majors/${id}`,
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
  useCreateFacultyMutation,
  useCreateMajorMutation,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
  useUpdateMajorMutation,
  useDeleteMajorMutation,
} = universityApi;
