
export type User = {
        uuid: string,
        username: string,
        email: string,
        avatar: string | null,
        address: string,
        phone_number: string,
        bio: string,
        gender: string,
        date_of_birth: string | null,
        roles: string,
        is_deleted: boolean,
        is_active: boolean,
        is_verified: boolean,
        is_blocked: boolean,
        registered_at: Date | null
}
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
        avatar: string
        phone_number: string;
}

export type UpdateProfilePayload = {
        username: string;
        gender: string;
        dob?: Date | null;
        oldPassword?: string;
        newPassword?: string;
        confirmPassword?: string;
        bio: string;
};

export type UniversityType = {
        uuid: string;
        logo_url: string;
        cover: string;
        en_name: string;
        kh_name: string;
        address: string;
        email?: string;
        phone: string;
        website?: string;
        location?: string;
        map_url?: string;
        summary?: string;
        vision?: string;
        mission?: string;
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
};

export type UniversitiesResponse = {
        date: Date;
        status: number;
        payload: {
                schools?: SchoolsType[];
                metadata?: PaginationMetadata;
        };
};

// update profile response 
export type UpdateProfileResponse = {
        username: string;
        phone_number: string;
        address: string;
        gender: string;
        date_of_birth: string | null;
        bio: string;
}

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
                uuid: string | undefined,
                username: string,
                email: string,
                avatar: string | null,
                address: string,
                phone_number: string,
                bio: string,
                gender: string,
                date_of_birth: string | null,
                roles: string,
                is_deleted: boolean,
                is_active: boolean,
                is_verified: boolean,
                is_blocked: boolean,
                registered_at: Date | null
        }
}

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
}



export type FeedbackResponse = {
        payload: {
                items: Feedback[];
                metadata: Metadata;
        }

};



// change password
export type ChangePasswordType = {
        old_password: string;
        new_password: string;
        confirm_new_password: string;
}

// Block user modal
export type BlockUserModalProps = {
        onConfirm: () => void;
        onCancel: () => void;
        actionType: "block" | "unblock";
}



// Root Response Type
export type TestsResponse = {
        date: string;
        status: number;
        payload: {
                tests: TestType[];
                metadata: MetadataType;
        };
        message: string;
}

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
type AssessmentTypeName = "Personality" | "Learning Style" | "Values" | "Interests" | "Skills";

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
        Strong: GroundSkill[]
        Average: GroundSkill[]
        Weak: GroundSkill[]
}

//    Ground Skill
export type GroundSkill = {
        skill: string;
        description: string;
}

export type CareerType = {
        career_name: string;
        description: string;
        majors: majorsType[]
}
// majors type
export type majorsType = {
        major_name: string;
        schools: string[]
}
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
export type JobDetails = {
        uuid: string;
        title: string;
        company_name: string;
        logo: string | null;
        location: string;
        job_type: string;
        description: string;
        requirements: string[];
        responsibilities: string[];
        facebook_url: string;
        email: string;
        phone: string;
        website: string;
        created_at: string; // ISO 8601 datetime format
        closing_date: string; // Date as a string, could be in various formats
        category: string | null;
        salary : string;
      };

      

//       post job type
export type JobType ={
        uuid:string;
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
        requirements: string[]; // Ensure it's an array
        responsibilities: string[]; // Ensure it's an array
        benefits: string[]; // Ensure it's an array
        email?: string;
        phone?: string;
        website?: string;
        is_active: boolean;
        logo: File
    }
    export type PostJob = {
        category: string [];
        title: string;
        company: string;
        logo: File; // Representing the uploaded file
        facebook_url: string;
        location: string;
        posted_at: string; // ISO Date-Time string format
        description: string [];
        job_type: string;
        schedule: string;
        salary: string;
        closing_date: string; // ISO Date-Time string format
        requirements: string [];
        responsibilities: string [];
        benefits: string [];
        email: string;
        phone: string;
        website: string;
    }
    
export type UpdateJob ={
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
        logo: File | null;
        location: string;
        facebook_url: string;
    }


//     Jobs api response
export type JobsResponse = {
        message: string;
        date: string;
        status: string;
        payload: {
                items: JobDetails[];
                metadata: Metadata;
        }
}

//    
export type JobDetailsProps = {
        uuid: string;
}

// get job category type
export type GetJobCategoryType = {
        payload: {
                categories: string[];
        }
}


// statitics
export type MetricsResponse = {
        date: string; // Example: "25-December-2024"
        status: number; // Example: 200
        payload: {
            total_users: number; // Example: 106
            total_feedbacks: number; // Example: 2
            total_tests: number; // Example: 113
            total_active_users: number; // Example: 106
            pie_chart_data: {
                type: string; // Example: "PUBLIC", "TVET", "PRIVATE"
                percentage: number; // Example: 33.33
            }[];
            bar_chart_jobs_data: {
                label: string;
                count: number; // Example: 32
            }[];
            bar_chart_assessments_data: {
                assessment_type: string; // Example: "Interests", "Learning Style"
                count: number; // Example: 43
            }[];
            line_chart_data: {
                month: string; // Example: "2024-11", "2024-12"
                user_count: number; // Example: 103
            }[];
        };
        message: string; // Example: "Metrics retrieved successfully."
    };
    