import { normPlovApi } from "../api";
// // Define the general structure of an assessment result.
// // interface AssessmentResult {
// //   assessmentType: string;
// //   testUUID: string;
// //   testName: string;
// //   createdAt: string;
// // }

// // Define specific types for each result type.
// // interface LearningStyleResult extends AssessmentResult {
// //   learningStyle: string;
// //   chart: { labels: string[]; values: number[] };
// //   dimensions: { dimension_name: string; dimension_description: string; level: number }[];
// //   recommendedTechniques: { technique_name: string; description: string; image_url?: string }[];
// //   relatedCareers: { career_name: string; description: string; majors: string[] }[];
// // }

// // interface ValueResult extends AssessmentResult {
// //   chartData: { label: string; score: number }[];
// //   valueDetails: { name: string; definition: string; characteristics: string; percentage: string }[];
// //   careerRecommendations: { career_name: string; description: string; majors: string[] }[];
// // }

// // interface InterestResult extends AssessmentResult {
// //   hollandCode: string;
// //   typeName: string;
// //   description: string;
// //   keyTraits: string[];
// //   careerPath: string[];
// //   chartData: { label: string; score: number }[];
// //   dimensionDescriptions: { dimension_name: string; description: string }[];
// // }

// // interface SkillResult  {
// //   assessmentType: string;
// //   testUUID: string;
// //   testName: string;
// //   createdAt: string;
// //   categoryPercentages: { [key: string]: number };
// //   skillsGrouped: { [key: string]: { skill: string; description: string }[] };
// //   strongCareers: { career_name: string; description: string; majors: string[] }[];
// // }

// // interface PersonalityResult extends AssessmentResult {
// //   personalityType: { name: string; title: string; description: string };
// //   dimensions: { dimension_name: string; score: number }[];
// //   traits: { positive: string[]; negative: string[] };
// //   strengths: string[];
// //   weaknesses: string[];
// //   careerRecommendations: { career_name: string; description: string; majors: string[] }[];
// }
type Tests = {
  test_uuid: string;
  test_name: string;
  assessment_type_name: string;
  created_at: string;
}

// Define the type for pagination metadata
type Metadata = {
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
}

type UserTestResponse = {
  date: string;
  status: number;
  payload: {
    tests: Tests[];  // Array of test items
    metadata: Metadata;  // Pagination metadata
  };
  message: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-an
export const resultApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAssessmentDetails: builder.query({
      // Accept both uuid and resultType in the query
      query: ({ testUUID }: { testUUID: string; resultType: string }) => ({
        url: `api/v1/admin/responses/${testUUID}`, // Dynamic query parameter
        method: 'GET',
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-an
      
      transformResponse: (response: any, _meta, arg) => {
        const responseData = response?.payload[0];
       
        const resultType = arg.resultType
        console.log("data from api: ", responseData);

        if (!responseData) {
          console.error("No response data found");
          return [];  
        }

        console.log("result typee: ", arg.resultType)

        const parsedData = JSON.parse(responseData.user_response_data);

        console.log("parsed json: ", parsedData)
       
        // Process data based on the provided resultType
        switch (resultType) {
          case "LearningStyle":
            return [{
              assessmentType: resultType,
              testUUID: parsedData.test_uuid,
              testName: resultType,
              createdAt: responseData.created_at,
              learningStyle: parsedData.learning_style || 'Unknown',
              chart: parsedData.chart || { labels: [], values: [] },
              dimensions: parsedData.dimensions || [],
              recommendedTechniques: parsedData.recommended_techniques || [],
              relatedCareers: parsedData.related_careers || []
            }] as any; 
        
          case "value":
            return [{
              assessmentType: resultType,
              testUUID: parsedData.test_uuid,
              testName: resultType,
              createdAt: responseData.created_at,
              chartData: parsedData.chart_data || [],
              valueDetails: parsedData.value_details || [],
              careerRecommendations: parsedData.career_recommendations || []
            }];
        
          case "Interest":
            return [{
              assessmentType: resultType,
              testUUID: parsedData.test_uuid,
              testName: resultType,
              createdAt: responseData.created_at,
              hollandCode: parsedData.holland_code || '',
              typeName: parsedData.type_name || '',
              description: parsedData.description || '',
              keyTraits: parsedData.key_traits || [],
              careerPath: parsedData.career_path || [],
              chartData: parsedData.chart_data || [],
              dimensionDescriptions: parsedData.dimension_descriptions || []
            }];
        // eslint-disable-next-line @typescript-eslint/no-explicit-an
          case "Skills":
            return [{
              assessmentType: resultType,
              testUUID: parsedData.test_uuid,
              testName: resultType,
              createdAt: responseData.created_at,
              categoryPercentages: parsedData.category_percentages || {},
              skillsGrouped: parsedData.skills_grouped || {},
              strongCareers: parsedData.strong_careers || []
            }] as any;
        
          case "personality":
            return [{
              assessmentType: resultType,
              testUUID: parsedData.test_uuid,
              testName: resultType,
              createdAt: responseData.created_at,
              personalityType: parsedData.personality_type || {},
              dimensions: parsedData.dimensions || [],
              traits: parsedData.traits || {},
              strengths: parsedData.strengths || [],
              weaknesses: parsedData.weaknesses || [],
              careerRecommendations: parsedData.career_recommendations || []
            }];
        
          default:
            console.error("Unknown result type:", resultType);
            return [];  // Return an empty array for unknown tests
        }
      }
    }),
        getAllUserTest: builder.query<UserTestResponse, { page: number; page_size: number }>({
      query: ({ page = 1, page_size = 10 }) => ({
        url: `api/v1/test/all-tests?page=${page}&page_size=${page_size}`,
        method: "GET",
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-an
    getTestAllAssessment: builder.query<any, { uuid: string; }>({
      query: ({uuid}) => ({
        url: `api/v1/admin/responses/${uuid}`, 
        method: 'GET',
      }),
    }),
  }),
});

export const { useFetchAssessmentDetailsQuery, useGetAllUserTestQuery,
   useGetTestAllAssessmentQuery 
  } = resultApi;

// import { normPlovApi } from "../api"; // Import the main API instance
// Define the general structure of an assessment result.
// interface AssessmentResult {
//   assessmentType: string;
//   testUUID: string;
//   testName: string;
//   createdAt: string;
// }

// Define specific types for each result type.
// interface LearningStyleResult extends AssessmentResult {
//   learningStyle: string;
//   chart: { labels: string[]; values: number[] };
//   dimensions: { dimension_name: string; dimension_description: string; level: number }[];
//   recommendedTechniques: { technique_name: string; description: string; image_url?: string }[];
//   relatedCareers: { career_name: string; description: string; majors: string[] }[];
// }

// interface ValueResult extends AssessmentResult {
//   chartData: { label: string; score: number }[];
//   valueDetails: { name: string; definition: string; characteristics: string; percentage: string }[];
//   careerRecommendations: { career_name: string; description: string; majors: string[] }[];
// }

// interface InterestResult extends AssessmentResult {
//   hollandCode: string;
//   typeName: string;
//   description: string;
//   keyTraits: string[];
//   careerPath: string[];
//   chartData: { label: string; score: number }[];
//   dimensionDescriptions: { dimension_name: string; description: string }[];
// }

// interface SkillResult  {
//   assessmentType: string;
//   testUUID: string;
//   testName: string;
//   createdAt: string;
//   categoryPercentages: { [key: string]: number };
//   skillsGrouped: { [key: string]: { skill: string; description: string }[] };
//   strongCareers: { career_name: string; description: string; majors: string[] }[];
// }

// interface PersonalityResult extends AssessmentResult {
//   personalityType: { name: string; title: string; description: string };
//   dimensions: { dimension_name: string; score: number }[];
//   traits: { positive: string[]; negative: string[] };
//   strengths: string[];
//   weaknesses: string[];
//   careerRecommendations: { career_name: string; description: string; majors: string[] }[];
// }
// Define the type for each test item

  // Define the type for pagination metadata

// export const resultApi = normPlovApi.injectEndpoints({
//   endpoints: (builder) => ({
//     fetchAssessmentDetails: builder.query({
//       // Accept both uuid and resultType in the query
//       query: ({ testUUID }: { testUUID: string; resultType: string }) => ({
//         url: `api/v1/admin/responses/${testUUID}`, // Dynamic query parameter
//         method: 'GET',
//       }),
      
//       transformResponse: (response: any, meta, arg) => {
//         const responseData = response?.payload[0];
       
//         const resultType = arg.resultType
//         console.log("data from api: ", responseData);

//         if (!responseData) {
//           console.error("No response data found");
//           return [];  
//         }

//         console.log("result typee: ", arg.resultType)

//         const parsedData = JSON.parse(responseData.user_response_data);

//         console.log("parsed json: ", parsedData)
       
//         // Process data based on the provided resultType
//         switch (resultType) {
//           case "LearningStyle":
//             return [{
//               assessmentType: resultType,
//               testUUID: parsedData.test_uuid,
//               testName: resultType,
//               createdAt: responseData.created_at,
//               learningStyle: parsedData.learning_style || 'Unknown',
//               chart: parsedData.chart || { labels: [], values: [] },
//               dimensions: parsedData.dimensions || [],
//               recommendedTechniques: parsedData.recommended_techniques || [],
//               relatedCareers: parsedData.related_careers || []
//             }] ; 
        
//           case "Values":
//             return [{
//               assessmentType: resultType,
//               testUUID: parsedData.test_uuid,
//               testName: resultType,
//               createdAt: responseData.created_at,
//               chartData: parsedData.chart_data || [],
//               valueDetails: parsedData.value_details || [],
//               careerRecommendations: parsedData.career_recommendations || []
//             }];
        
//           case "Interests":
//             return [{
//               assessmentType: resultType,
//               testUUID: parsedData.test_uuid,
//               testName: resultType,
//               createdAt: responseData.created_at,
//               hollandCode: parsedData.holland_code || '',
//               typeName: parsedData.type_name || '',
//               description: parsedData.description || '',
//               keyTraits: parsedData.key_traits || [],
//               careerPath: parsedData.career_path || [],
//               chartData: parsedData.chart_data || [],
//               dimensionDescriptions: parsedData.dimension_descriptions || []
//             }];
        
//           case "Skills":
//             return [{
//               assessmentType: resultType,
//               testUUID: parsedData.test_uuid,
//               testName: resultType,
//               createdAt: responseData.created_at,
//               categoryPercentages: parsedData.category_percentages || {},
//               skillsGrouped: parsedData.skills_grouped || {},
//               strongCareers: parsedData.strong_careers || []
//             }] as any;
        
//           case "Personality":
//             return [{
//               assessmentType: resultType,
//               testUUID: parsedData.test_uuid,
//               testName: resultType,
//               createdAt: responseData.created_at,
//               personalityType: parsedData.personality_type || {},
//               dimensions: parsedData.dimensions || [],
//               traits: parsedData.traits || {},
//               strengths: parsedData.strengths || [],
//               weaknesses: parsedData.weaknesses || [],
//               careerRecommendations: parsedData.career_recommendations || []
//             }];
        
//           default:
//             console.error("Unknown result type:", resultType);
//             return [];  // Return an empty array for unknown tests
//         }
//       }
//     }),
//     getAllUserTest: builder.query<UserTestResponse, { page: number; page_size: number }>({
//       query: ({ page = 1, page_size= 10 }) =>({
//           url: `api/v1/test/all-tests?page=${page}&page_size=${page_size}`,
//           method: "GET",
//       })
       
//   })
//   }),
// });

// export const { useFetchAssessmentDetailsQuery,useGetAllUserTestQuery } = resultApi;

// type Tests ={
//   test_uuid: string;
//   test_name: string;
//   assessment_type_name:string;
//   created_at: string;
// }

// type Metadata ={
//   page: number;
//   page_size: number;
//   total_items: number;
//   total_pages: number;
// }

// // Define the response structure for the API
// type UserTestResponse ={
//   date: string;
//   status: number;
//   payload: {
//     tests: Tests[];  // Array of test items
//     metadata: Metadata;  // Pagination metadata
//   };
//   message: string;
// }

// interface LearningStyleResponse {
//   assessmentType: "LearningStyle";
//   testUUID: string;
//   testName: string;
//   createdAt: string;
//   learningStyle: string;
//   chart: { labels: string[]; values: number[] };
//   dimensions: string[];
//   recommendedTechniques: string[];
//   relatedCareers: string[];
// }

// interface ValuesResponse {
//   assessmentType: "Values";
//   testUUID: string;
//   testName: string;
//   createdAt: string;
//   chartData: { label: string; value: number }[];
//   valueDetails: string[];
//   careerRecommendations: string[];
// }

// interface InterestsResponse {
//   assessmentType: "Interests Test" | "Interests Tests" | "Interests"; // Allow all variations
//   testUUID: string;
//   testName: string;
//   createdAt: string;
//   hollandCode: string;
//   typeName: string;
//   description: string;
//   keyTraits: string[];
//   careerPath: CareerPath[]; // Updated type for careerPath
//   chartData: { label: string; score: number }[]; // Changed `value` to `score` to match your chartData
//   dimensionDescriptions: DimensionDescription[]; // Updated to an array of objects
// }

// interface CareerPath {
//   career_name: string;
//   description: string;
//   majors: Major[]; // Array of majors
// }

// interface Major {
//   major_name: string; // The name of the major
//   schools: string[];  // An array of schools offering the major
// }

// interface DimensionDescription {
//   dimension_name: string;
//   description: string;
//   image_url: string; // Image URL for the dimension
// }


// interface SkillsResponse {
//   assessmentType: "Skills";
//   testUUID: string;
//   testName: string;
//   createdAt: string;
//   categoryPercentages: Record<string, number>;
//   skillsGrouped: Record<string, string[]>;
//   strongCareers: string[];
// }

// interface PersonalityResponse {
//   assessmentType: "Personality";
//   testUUID: string;
//   testName: string;
//   createdAt: string;
//   personalityType: Record<string, string>;
//   dimensions: string[];
//   traits: Record<string, string>;
//   strengths: string[];
//   weaknesses: string[];
//   careerRecommendations: string[];
// }

// type AssessmentResponse =
//   | LearningStyleResponse
//   | ValuesResponse
//   | InterestsResponse
//   | SkillsResponse
//   | PersonalityResponse;

// interface ApiResponse<T> {
//   payload: T[];
// }

// interface FetchAssessmentDetailsArgs {
//   testUUID: string;
//   resultType: string;
// }

// // All assessment
// type AllAssesmentResponse = {
//   date: string;
//   status: number;
//   payload: {
//       test_uuid: string;
//       test_name: string;
//       user_id: number;
//       user_username: string;
//       assessment_type_name: string;
//       user_response_data: {
//           date: string;
//           recommendations: {
//               majors: {
//                   schools: string[];
//                   major_name: string;
//               }[];
//               categories: {
//                   category_name: string;
//                   responsibilities: string[];
//               }[];
//               similarity: number;
//               career_name: string;
//               career_uuid: string;
//               description: string;
//           }[];
//       };
//       created_at: string;
//       is_deleted: boolean;
//   }[];
//   message: string;
// };


// export const resultApi = normPlovApi.injectEndpoints({
//   endpoints: (builder) => ({
//     fetchAssessmentDetails: builder.query<AssessmentResponse[], FetchAssessmentDetailsArgs>({
//       query: ({ testUUID }: { testUUID: string; resultType: string }) => ({
//         url: `api/v1/admin/responses/${testUUID}`, // Dynamic query parameter
//         method: 'GET',
//       }),
//       transformResponse: (response: any, meta, arg) => {
//         const responseData = response?.payload[0];

//         const resultType = arg.resultType
//         console.log("data from api: ", responseData);

//         if (!responseData) {
//           console.error("No response data found");
//           return [];
//         }

//         console.log("result typee: ", arg.resultType)

//         const parsedData = JSON.parse(responseData.user_response_data);

//         console.log("parsed json: ", parsedData)


//         switch (resultType) {
//           case "LearningStyle":
//             return [{
//               assessmentType: "LearningStyle",
//               testUUID: parsedData.test_uuid,
//               testName: "LearningStyle",
//               createdAt: responseData.created_at,
//               learningStyle: parsedData.learning_style || 'Unknown',
//               chart: parsedData.chart || { labels: [], values: [] },
//               dimensions: parsedData.dimensions || [],
//               recommendedTechniques: parsedData.recommended_techniques || [],
//               relatedCareers: parsedData.related_careers || []
//             }] as LearningStyleResponse[];

//           case "Values":
//             return [{
//               assessmentType: "Values",
//               testUUID: parsedData.test_uuid,
//               testName: "Values",
//               createdAt: responseData.created_at,
//               chartData: parsedData.chart_data || [],
//               valueDetails: parsedData.value_details || [],
//               careerRecommendations: parsedData.career_recommendations || []
//             }] as ValuesResponse[];

//           case "Interests":
//             return [{
//               assessmentType: "Interests",
//               testUUID: parsedData.test_uuid,
//               testName: parsedData.test_name,
//               createdAt: responseData.created_at,
//               hollandCode: parsedData.holland_code || '',
//               typeName: parsedData.type_name || '',
//               description: parsedData.description || '',
//               keyTraits: parsedData.key_traits || [],
//               careerPath: parsedData.career_path || [],
//               chartData: parsedData.chart_data || [],
//               dimensionDescriptions: parsedData.dimension_descriptions || []
//             }] as InterestsResponse[];

//           case "Skills":
//             return [{
//               assessmentType: "Skills",
//               testUUID: parsedData.test_uuid,
//               testName: "Skills",
//               createdAt: responseData.created_at,
//               categoryPercentages: parsedData.category_percentages || {},
//               skillsGrouped: parsedData.skills_grouped || {},
//               strongCareers: parsedData.strong_careers || []
//             }] as SkillsResponse[];

//           case "Personality":
//             return [{
//               assessmentType: "Personality",
//               testUUID: parsedData.test_uuid,
//               testName: "Personality",
//               createdAt: responseData.created_at,
//               personalityType: parsedData.personality_type || {},
//               dimensions: parsedData.dimensions || [],
//               traits: parsedData.traits || {},
//               strengths: parsedData.strengths || [],
//               weaknesses: parsedData.weaknesses || [],
//               careerRecommendations: parsedData.career_recommendations || []
//             }];

//           default:
//             console.error("Unknown result type:", resultType);
//             return [];
//         }
//       }
//       // transformResponse: (response: ApiResponse<
//       //   AssessmentResponse>, meta, arg) => {
//       //   const responseData = response?.payload[0];
//       //   const resultType = arg.resultType;
      
//       //   if (!responseData || typeof responseData.user_response_data !== "string") {
//       //     console.error("Invalid or missing user_response_data");
//       //     return [];
//       //   }
      
//       //   const parsedData = JSON.parse(responseData.user_response_data || '');
      
//       //   switch (resultType) {
//       //     case "LearningStyle": {
//       //       const data: LearningStyleResponse = {
//       //         assessmentType: "LearningStyle",
//       //         testUUID: parsedData.test_uuid,
//       //         testName: "LearningStyle",
//       //         createdAt: responseData.createdAt,
//       //         learningStyle: parsedData.learning_style || "Unknown",
//       //         chart: parsedData.chart || { labels: [], values: [] },
//       //         dimensions: parsedData.dimensions || [],
//       //         recommendedTechniques: parsedData.recommended_techniques || [],
//       //         relatedCareers: parsedData.related_careers || [],
//       //       };
//       //       return [data];
//       //     }
      
//       //     case "Values": {
//       //       const data: ValuesResponse = {
//       //         assessmentType: "Values",
//       //         testUUID: parsedData.test_uuid,
//       //         testName: "Values",
//       //         createdAt: responseData.createdAt,
//       //         chartData: parsedData.chart_data || [],
//       //         valueDetails: parsedData.value_details || [],
//       //         careerRecommendations: parsedData.career_recommendations || [],
//       //       };
//       //       return [data];
//       //     }
     
//       //     case "Interests": {
//       //       const data: InterestsResponse = {
//       //         assessmentType: "Interests",
//       //         testUUID: parsedData.test_uuid,
//       //         testName: parsedData.test_name || "Interests Test",
//       //         createdAt: responseData.createdAt,
//       //         hollandCode: parsedData.holland_code || "",
//       //         typeName: parsedData.type_name || "",
//       //         description: parsedData.description || "",
//       //         keyTraits: parsedData.key_traits || [],
//       //         careerPath: parsedData.career_path || [],
//       //         chartData: parsedData.chart_data || [],
//       //         dimensionDescriptions: parsedData.dimension_descriptions || [],
//       //       };
//       //       return [data];
//       //     }
      
//       //     case "Skills": {
//       //       const data: SkillsResponse = {
//       //         assessmentType: "Skills",
//       //         testUUID: parsedData.test_uuid,
//       //         testName: "Skills",
//       //         createdAt: responseData.createdAt,
//       //         categoryPercentages: parsedData.category_percentages || {},
//       //         skillsGrouped: parsedData.skills_grouped || {},
//       //         strongCareers: parsedData.strong_careers || [],
//       //       };
//       //       return [data];
//       //     }
      
//       //     case "Personality": {
//       //       const data: PersonalityResponse = {
//       //         assessmentType: "Personality",
//       //         testUUID: parsedData.test_uuid,
//       //         testName: "Personality",
//       //         createdAt: responseData.createdAt,
//       //         personalityType: parsedData.personality_type || {},
//       //         dimensions: parsedData.dimensions || [],
//       //         traits: parsedData.traits || {},
//       //         strengths: parsedData.strengths || [],
//       //         weaknesses: parsedData.weaknesses || [],
//       //         careerRecommendations: parsedData.career_recommendations || [],
//       //       };
//       //       return [data];
//       //     }
      
//       //     default:
//       //       console.error("Unknown result type:", resultType);
//       //       return [];
//       //   }
//       // }
      
//     }),

//     getAllUserTest: builder.query<UserTestResponse, { page: number; page_size: number }>({
//       query: ({ page = 1, page_size = 10 }) => ({
//         url: `api/v1/test/all-tests?page=${page}&page_size=${page_size}`,
//         method: "GET",
//       }),
//     }),
//     getTestAllAssessment: builder.query<AllAssesmentResponse, { uuid: string; }>({
//       query: ({uuid}) => ({
//         url: `api/v1/admin/responses/${uuid}`, 
//         method: 'GET',
//       }),
//     }),
//   }),
// });

// export const { useFetchAssessmentDetailsQuery, useGetAllUserTestQuery,
//    useGetTestAllAssessmentQuery 
//   } = resultApi;
