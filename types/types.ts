export type User = {
  uuid: string;
  username: string;
  email: string;
  avatar: string | null;
  address: string;
  phone_number: string;
  bio: string;
  gender: string;
  date_of_birth: string | null;
  roles: string;
  is_deleted: boolean;
  is_active: boolean;
  is_verified: boolean;
  is_blocked: boolean;
  registered_at: Date | null;
};
// Login Type
export type LoginType = {
  email: string;
  password: string;
};
// Update Profile type
export type UpdateProfilesTypes = {
  username: string;
  address: string;
  gender: string;
  date_of_birth: string | null;
  old_password: string;
  new_password: string;
  confirm_new_password: string;
  bio: string;
  avatar: string;
  phone_number: string;
};

export type UpdateProfilePayload = {
  username: string;
  gender: string;
  dob?: Date | null;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  bio: string;
};
// create and update school 
export type UniversityType = {
    
    kh_name:string;
    en_name: string;
    school_type: string | "PUBLIC" | "PRIVATE" | "TVET"; // Enum-like structure for school types
    popular_major: string;
    location: string;
    phone: string;
    lowest_price: number;
    highest_price: number;
    map_url: string;
    email: string;
    website: string;
    description: string;
    mission: string;
    vision: string;
    logo:  File |null| string; // URL to the logo
    cover_image:  File |null| string; // URL to the cover image
    is_popular: boolean;
  
};

export interface SchoolsType extends UniversityType {
  id: string;
  type?: string;
}

export type PaginationMetadata = {
  pageSize: number;
  total: number;
  page: number;
  size: number;
  total_items: number;
};

export type UniversitiesResponse = {
  date: Date;
  status: number;
  payload: {
    schools?: UniversityType[];
    metadata?: PaginationMetadata;
  };
};
export type UniversitiesDetailsResponse = {
  date: Date;
  status: number;
  payload:  School;
  
};
// get all
export type School = {
  uuid: string;
  kh_name: string | null;
  en_name: string;
  type: string |"PUBLIC" | "PRIVATE" | "TVET"; // Enum for school types
  popular_major: string | null;
  logo_url: string | null;
  cover_image: string | null;
  location: string | null;
  phone: string | null;
  lowest_price: number | null;
  highest_price: number | null;
  email: string | null;
  website: string | null;
  description: string | null;
  mission: string | null;
  vision: string | null;
  created_at: string;
  updated_at: string;
  map_url: string;
  faculties: string[];
};

export type SchoolsResponse = {
  date: string; // e.g., "13-January-2025"
  status: number; // e.g., 200
  payload: {
    schools: School[];
    metadata: Metadata;
  };
  message: string; // e.g., "Schools retrieved successfully"
};


// update profile response
export type UpdateProfileResponse = {
  username: string;
  phone_number: string;
  address: string;
  gender: string;
  date_of_birth: string | null;
  bio: string;
};

export interface Metadata {
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
}

//     Userlist Type
export interface UserListResponse {
  date: string;
  status: number;
  payload: {
    metadata: Metadata;
    users: User[];
  };
  message: string;
}
export type UserReponse = {
  payload: {
    uuid: string | undefined;
    username: string;
    email: string;
    avatar: string | null;
    address: string;
    phone_number: string;
    bio: string;
    gender: string;
    date_of_birth: string | null;
    roles: string;
    is_deleted: boolean;
    is_active: boolean;
    is_verified: boolean;
    is_blocked: boolean;
    registered_at: Date | null;
  };
};

// user feedback

export type Feedback = {
  feedback_uuid: string;
  username: string;
  email: string;
  avatar: string;
  feedback: string;
  created_at: string;
  is_deleted: boolean;
  is_promoted: boolean;
};

export type FeedbackResponse = {
  payload: {
    items: Feedback[];
    metadata: Metadata;
  };
};

// change password
export type ChangePasswordType = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};

// Block user modal
export type BlockUserModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
  actionType: "block" | "unblock";
};

// Root Response Type
export type TestsResponse = {
  date: string;
  status: number;
  payload: {
    tests: TestType[];
    metadata: MetadataType;
  };
  message: string;
};

// Test Type
interface TestType {
  test_uuid: string;
  test_name: string;
  assessment_type_name: AssessmentTypeName;
  user_avatar: string;
  user_name: string;
  user_email: string;
  response_data: ResponseDataType[];
  is_draft: boolean;
  is_completed: boolean;
  created_at: string;
}

// Assessment Type Name (Union of all possible values)
type AssessmentTypeName =
  | "Personality"
  | "Learning Style"
  | "Values"
  | "Interests"
  | "Skills";

// Response Data Type (for any assessment type)
interface ResponseDataType {
  user_uuid: string;
  test_uuid: string;
  test_name: string;
  personality_type?: PersonalityType; // For Personality Assessment
  learning_style?: string; // For Learning Style Assessment
  probability?: number; // For Learning Style Assessment
  details?: LearningStyleDetailsType; // For Learning Style
  chart?: ChartDataType; // For Learning Style
  dimensions?: DimensionType[]; // Shared for Personality and Learning Style
  traits?: TraitsType; // For Personality
  strengths?: string[]; // For Personality
  weaknesses?: string[]; // For Personality
  recommended_techniques?: RecommendedTechniqueType[]; // For Learning Style
  related_careers?: CareerType[]; // Shared for assessments with careers
  skills_grouped: SkillType;
  strong_careers: CareerType[];
  category_percentages: CategoryPercentagesType | {};
}

// Skil Assessment Type
export type SkillType = {
  Strong: GroundSkill[];
  Average: GroundSkill[];
  Weak: GroundSkill[];
};

//    Ground Skill
export type GroundSkill = {
  skill: string;
  description: string;
};

export type CareerType = {
  career_name: string;
  description: string;
  majors: majorsType[];
};
// majors type
export type majorsType = {
  major_name: string;
  schools: string[];
};
// category_percentages
export type CategoryPercentagesType = {
  Cognitive_Skills: number;
  Interpersonal_Skills: number;
  Self_Management_Skills: number;
  Communication_Skills: number;
  // [key: string]: number; // Index signature
};

// Personality Type
interface PersonalityType {
  name: string;
  title: string;
  description: string;
}

// Learning Style Details
interface LearningStyleDetailsType {
  Visual_Score: number;
  Auditory_Score: number;
  ReadWrite_Score: number;
  Kinesthetic_Score: number;
}

// Chart Data
interface ChartDataType {
  labels: string[];
  values: number[];
}

// Dimensions Type
interface DimensionType {
  dimension_name: string;
  dimension_description?: string; // Optional for Learning Style
  score?: number; // For Personality
  level?: number; // For Learning Style
}

// Traits Type
interface TraitsType {
  positive: string[];
  negative: string[];
}

// Recommended Techniques
interface RecommendedTechniqueType {
  technique_name: string;
  category: string;
  description: string;
  image_url: string | null;
}

// Pagination Metadata
interface MetadataType {
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
}
// get job
export type GetAllJobType = {
  uuid: string;
  title: string;
  company_name: string;
  logo: string | null;
  location: string | null;
  job_type: string | null;
  description: string | null;
  requirements: string[] | null;
  responsibilities: string[] | null;
  facebook_url: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  created_at: string | null;
  closing_date: string | null;
  category: string | null;
};

//       post job type
export type JobType = {
  uuid: string;
  category: string[];
  title: string;
  company: string;
  facebook_url?: string;
  location?: string;
  posted_at: string;
  description?: string;
  job_type?: string;
  schedule?: string;
  salary?: string;
  closing_date?: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  email?: string;
  phone?: string;
  website?: string;
  is_active: boolean;
  logo: File;
};
export type PostJob = {
  category: string[];
  title: string;
  company: string;
  logo: File; // Representing the uploaded file
  facebook_url: string;
  location: string;
  posted_at: string; // ISO Date-Time string format
  description: string[];
  job_type: string;
  schedule: string;
  salary: string;
  closing_date: string; // ISO Date-Time string format
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  email: string;
  phone: string;
  website: string;
};

export type UpdateJob = {
  company: string;
  title: string;
  category: string[]; // Ensure it's defined as an array of strings
  job_type: string;
  salary: string;
  closing_date: string;
  description: string;
  responsibilities: string[]; // Should be an array of strings
  requirements: string[];
  email: string;
  phone: string;
  website: string;
  logo: string | File;
  location: string;
  facebook_url: string;
};

//     Jobs api response
export type JobsResponse = {
  message: string;
  date: string;
  status: string;
  payload: {
    items: GetAllJobType[];
    metadata: Metadata;
  };
};

//
export type JobDetailsProps = {
  uuid: string;
};

// get job category type
export type GetJobCategoryType = {
  payload: {
    categories: string[];
  };
};

// statitics
export type MetricsResponse = {
  date: string;
  status: number;
  payload: {
    total_users: number;
    total_feedbacks: number;
    total_tests: number;
    total_active_users: number;
    pie_chart_data: Array<{
      type: string;
      percentage: number;
    }>;
    bar_chart_jobs_data: {
      [month: string]: Array<{
        label: string;
        count: number;
      }>;
    };
    bar_chart_assessments_data: Array<{
      assessment_type: string;
      count: number;
    }>;
    line_chart_data: Array<{
      month: string;
      "2023": number;
      "2024": number;
    }>;
  };
  message: string;
};

// scrape job

export interface ScrapeJobResponse {
  date: string;
  status: number;
  message: string; // Response message
  payload: JobPayload; // Contains job details and metadata
}

export interface JobPayload {
  jobs: JobScrapeType[]; // Array of jobs
  meta: Metadata; // Pagination metadata
}

export interface JobScrapeType {
  uuid: string; // Unique identifier for the job
  title: string; // Job title
  company: string; // Company name
  location: string; // Job location
  posted_at: string; // ISO 8601 timestamp for when the job was posted
  description: string; // Job description
  category: string; // Job category
  salary: string; // Salary range
  closing_date: string; // ISO 8601 timestamp for job application closing date
  requirements: string[]; // Array of job requirements
  responsibilities: string[]; // Array of job responsibilities
  benefits: string[]; // Array of job benefits
  email: string; // Contact email for the job
  phone: string; // Contact phone number(s)
  website: string; // URL of the job details or company website
  is_active: boolean; // Whether the job is active
  is_scraped: boolean; // Whether the job was scraped
  is_updated: boolean; // Whether the job has been updated
  logo: string | null; // URL of the company logo
  facebook_url: string | null; // Facebook URL for the job or company
  schedule: string; // Job schedule (e.g., Full-time)
  job_type: string; // Job type (e.g., Job Opportunity)
}

// upload image
export type UploadImageResponse = {
  date: string;
  status: number;
  payload: ImagePayload;
  message: string;
};

export type ImagePayload = {
  file_url: string;
  file_size: number;
  file_type: string;
};
