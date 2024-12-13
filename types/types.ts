export type UserMe = {
  uuid: string;
  username: string;
  email: string;
  avatar?: string | null; // Optional
  address: string;
  phoneNumber: string;
  bio: string;
  gender: string;
  dateOfBirth?: Date | null;
  role: string; // Assuming single role
  isDeleted: boolean;
  isActive: boolean;
  isVerified: boolean;
  registeredAt?: Date | null;
};

export type LoginPayload = Readonly<{
  email: string;
  password: string;
}>;

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
