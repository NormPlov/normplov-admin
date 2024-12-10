export type User = {
        uuid: string,
        username: string,
        email: string,
        avatar: string | null,
        address: string,
        phone_number: string,
        bio: string,
        gender: string,
        date_of_birth: null,
        roles: string,
        is_deleted: boolean,
        is_active: boolean,
        is_verified: boolean,
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
        gender: string;
        dob: Date;
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
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
