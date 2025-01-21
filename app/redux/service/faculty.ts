import { normPlovApi } from "../api";
// import { FacultyResponse } from "@/types/faculty";

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
