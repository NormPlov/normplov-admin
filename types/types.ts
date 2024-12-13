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


export interface FeedbackResponse {
        payload: [Feedback[],
                {
                        page: number;
                        page_size: number;
                        total_items: number;
                        total_pages: number;
                }];
        date: string;
        status: number;
        message: string;
}


// change password
export type ChangePasswordType = {
        old_password: string;
        new_password: string;
        confirm_new_password: string;
}