import { normPlovApi } from "../api";

export const faculty = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    faculties: builder.query<FacultyResponse, { page: number; size: number }>({
      query: ({ page }) => ({
        url: `api/v1/faculties?page=${page}&size=50`,
        method: "GET",
      }),
      providesTags: ["faculty"],
    }),
  }),
  // This middleware will be applied to all queries in this slice.
});
