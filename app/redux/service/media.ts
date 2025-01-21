
import { UploadImageResponse } from "@/types/types";
import { normPlovApi } from "../api";

export const media = normPlovApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation<UploadImageResponse, {  url: File|string }>({
                   query: ({ url }) => {
                       const formData = new FormData();
                       // 'file' follow your backend if backend is file put file if backend image put image 
                       formData.append('file', url); 
                       return {
                           url: `api/v1/media/upload-image`,
                           method: 'POST',
                           body: formData, 
                          
                       };
                   },
                   invalidatesTags:["media"]
               }),
    })
});

export const {
    useUploadImageMutation
} = media;