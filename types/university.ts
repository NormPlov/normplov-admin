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
