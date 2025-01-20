export type Province = {
    uuid: string;
    name: string;
    created_at: string;
    updated_at: string;
};

export type ProvincesResponse = {
    date: string;
    status: number;
    payload: {
        provinces: Province[];
    };
    message: string;
};


export interface Major {
    uuid: string;
    name: string;
    description: string;
    fee_per_year: number;
    duration_years: number;
    degree: string;
    faculty_uuid: string | string[];
    is_recommended:string;
  }
  
export interface Faculty {
    uuid: string;
    name: string;
    description: string;
    majors: {
      items: Major[];
      metadata: {
        page: number;
        page_size: number;
        total_items: number;
        total_pages: number;
      };
    };
  }
  
export  interface UniversityType {
    uuid: string;
    kh_name: string;
    en_name: string;
    type: string;
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
    faculties: Faculty[];
  }