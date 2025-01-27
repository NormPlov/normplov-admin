export type SchoolDetailResponse = {
  date: string;
  status: number;
  payload: SchoolPayload;
  message: string;
};

export type SchoolPayload = {
  uuid: string;
  kh_name: string;
  en_name: string;
  type: string; // Can be a union of specific types like "PUBLIC" | "PRIVATE" | "TVET"
  popular_major: string;
  logo_url: string;
  cover_image: string;
  location: string;
  phone: string;
  lowest_price: number;
  highest_price: number;
  map_url: string;
  latitude: number;
  longitude: number;
  email: string;
  website: string;
  description: string;
  mission: string;
  vision: string;
  is_popular: boolean;
  faculties: Faculty[];
};

export type Faculty = {
  uuid: string;
  name: string;
  description: string;
  majors: Majors;
};

export type Majors = {
  items: Major[];
  metadata: Metadata;
};

export type Major = {
  uuid: string;
  name: string;
  description: string;
  fee_per_year: number;
  duration_years: number;
  degree: string; // Can be a union of degrees like "BACHELOR" | "MASTER" | "DOCTORATE"
  is_recommended: boolean;
};

type Metadata = {
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
};
