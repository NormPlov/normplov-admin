import { normPlovApi } from "../api";

type FacultyResponse = {
  uuid: string;
  name: string;
};

export const faculty = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    faculties: builder.query<FacultyResponse, void>({
      query: () => ({
        url: `api/v1/faculties?`,
        method: "GET",
      }),
    }),
  }),
});
