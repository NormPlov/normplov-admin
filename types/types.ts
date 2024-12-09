export type UserMe={
    
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
        dob:Date;
        oldPassword:string;
        newPassword:string;
        confirmPassword:string;
        bio:string;
};
    