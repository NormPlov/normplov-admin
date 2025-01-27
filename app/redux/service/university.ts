import { SchoolDetailResponse } from "@/types/university";
import { normPlovApi } from "../api";
import { UniversitiesResponse, UniversityType, SchoolsResponse, UniversitiesDetailsResponse, CreateUniversityType } from "@/types/types";

export const universityApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    university: builder.query<
    SchoolsResponse,
      { page: number; size: number; search?: string; type?: string }
    >({
      query: ({ page, size, search, type }) => ({
        url: `api/v1/schools`,
        method: "GET",
        params: { page, size, search, type },
      }),
      providesTags: ["university"],
    }),

    universityDetails: builder.query<SchoolDetailResponse, string>({
      query: (uuid) => ({
        url: `api/v1/schools/${uuid}`,
        method: "GET",
      }),
      providesTags: ["university"],
    }),

    createUniversity: builder.mutation<UniversitiesResponse, { newUniversity: CreateUniversityType }>({

      query: ({ newUniversity }) => ({
        url: "api/v1/schools",
        method: "POST",
        body: newUniversity,
      }),
      invalidatesTags: ["university"]
    }
    ),

    editUniversity: builder.mutation<
      UniversitiesDetailsResponse,
      { uuid: string; data: UniversityType }
    >({
      query: ({ uuid, data }) => ({
        url: `api/v1/schools/${uuid}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["university"]
    }),

    deleteUniversity: builder.mutation<void, {uuid:string}>({
      query: ({uuid}) => ({
        url: `api/v1/schools/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["university"]
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
        url: "api/v1/faculties/",
        method: "POST",
        body: faculty,
      }),
      invalidatesTags: ["faculty"],
    }),
    
    updateFaculty: builder.mutation({
      query: ({ id, ...faculty }) => ({
        url: `api/v1/faculties/${id}`,
        method: "PUT",
        body: faculty,
      }),
      invalidatesTags: ["faculty"],
    }),
    deleteFaculty: builder.mutation({
      query: (id) => ({
        url: `/api/v1/faculties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faculty"],
    }),

  })
});

export const {
  useUniversityQuery,
  useUniversityDetailsQuery,
  useCreateUniversityMutation,
  useEditUniversityMutation,
  useDeleteUniversityMutation,
  useCreateFacultyMutation,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
} = universityApi;
