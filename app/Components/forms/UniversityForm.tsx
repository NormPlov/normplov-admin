// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Select } from "@radix-ui/react-select";
// import {
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { toast } from "react-hot-toast";
// import { Loader2 } from "lucide-react";
// import {
//   useCreateUniversityMutation,
//   useEditUniversityMutation,
//   useUniversityDetailsQuery,
// } from "@/app/redux/service/university";
// import { ImageUpload } from "../ImageUpload";
// import { UploadImageResponse } from "@/types/types";
// import { usePostImageMutation } from "@/app/redux/service/user";


// const SchoolSchema = Yup.object().shape({
//   kh_name: Yup.string().required("Required"),
//   en_name: Yup.string().required("Required"),
//   phone: Yup.string().required("Required"),
//   email: Yup.string().email("Invalid email").required("Required"),
//   website: Yup.string().url("Invalid URL").required("Required"),
//   popular_major: Yup.string().required("Required"),
//   lowest_price: Yup.number().positive("Must be positive").required("Required"),
//   highest_price: Yup.number().positive("Must be positive").required("Required"),
//   location: Yup.string().required("Required"),
//   map_url: Yup.string().required("Required"),
//   vision: Yup.string().required("Required"),
//   mission: Yup.string().required("Required"),
//   description: Yup.string().required("Required"),
//   cover_image: Yup.mixed().nullable(),
//   logo: Yup.mixed().nullable(),
//   province_uuid: Yup.string().required("Required"),
//   school_type: Yup.string().required("Required"),
// });

// // async function uploadImage(file: File) {
// //   const formData = new FormData();
// //   formData.append("file", file);

// //   try {
// //     const response = await fetch(
// //       "http://136.228.158.126:3300/api/v1/media/upload-image",
// //       {
// //         method: "POST",
// //         body: formData,
// //       }
// //     );

// //     if (!response.ok) {
// //       throw new Error("Image upload failed");
// //     }

// //     const data = await response.json();
// //     return data.url;
// //   } catch (error) {
// //     console.error("Error uploading image:", error);
// //     throw error;
// //   }
// // }

// interface UniversityFormProps {
//   universityId?: string;
// }

// export default function UniversityForm({ universityId }: UniversityFormProps) {
//   const router = useRouter();
//   const isEditMode = !!universityId;
//   const [uploadImage] = usePostImageMutation()

//   const {
//     data: university,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useUniversityDetailsQuery(universityId || "", { skip: !isEditMode });

//   const [editUniversity] = useEditUniversityMutation();
//   const [createUniversity] = useCreateUniversityMutation();

//   const [submissionError, setSubmissionError] = useState<string | null>(null);
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

//   useEffect(() => {
//     if (isError && isEditMode) {
//       toast.error("Failed to load university data. Please try again.");
//     }
//   }, [isError, isEditMode]);

//   if (isLoading && isEditMode) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader2 className="mr-2 h-16 w-16 animate-spin" />
//         <span className="text-xl font-semibold">
//           Loading university data...
//         </span>
//       </div>
//     );
//   }

//   if (isError && isEditMode) {
//     return (
//       <div className="container mx-auto py-10">
//         <h1 className="text-2xl font-bold mb-5">
//           Error Loading University Data
//         </h1>
//         <p className="text-red-500 mb-4">
//           {error instanceof Error ? error.message : "An unknown error occurred"}
//         </p>
//         <Button onClick={() => refetch()} className="mr-4">
//           Try Again
//         </Button>
//         <Button
//           onClick={() => router.push("/majors-universities")}
//           variant="outline"
//         >
//           Back to Universities
//         </Button>
//       </div>
//     );
//   }

//   const initialValues =
//     isEditMode && university
//       ? {
//           kh_name: university.payload.kh_name || "",
//           en_name: university.payload.en_name || "",
//           phone: university.payload.phone || "",
//           email: university.payload.email || "",
//           website: university.payload.website || "",
//           popular_major: university.payload.popular_major || "",
//           lowest_price: university.payload.lowest_price || "",
//           highest_price: university.payload.highest_price || "",
//           map_url: university.payload.map_url || "",
//           vision: university.payload.vision || "",
//           mission: university.payload.mission || "",
//           description: university.payload.description || "",
//           school_type: university.payload.type || "",
//           cover_image: null,
//           logo: null,
//           location: university.payload.location || "",
//         }
//       : {
//           kh_name: "",
//           en_name: "",
//           phone: "",
//           email: "",
//           website: "",
//           popular_major: "",
//           lowest_price: "",
//           highest_price: "",
//           map_url: "",
//           vision: "",
//           mission: "",
//           description: "",
//           school_type: "",
//           cover_image: null,
//           logo: null,
//           province_uuid: "",
//           location: "",
//         };

//         const handleUploadImage = async (file: File) => {
//           console.log("data file", file)
//           try {
//               const res: UploadImageResponse = await uploadImage({ url: file }).unwrap();
//               toast.success("Upload Logo successfully!")
//               return res.payload.file_url;
//           } catch (error) {
//               console.log("Error upload image:", error)
//               toast.error("Failed to upload the image. Please try again.");
//               return null;
//           }
//       };

//   return (
//     <div className="w-full mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">
//         {isEditMode ? "Edit University" : "Create University"}
//       </h1>
//       {submissionError && (
//         <div
//           className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
//           role="alert"
//         >
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{submissionError}</span>
//         </div>
//       )}
//       <Formik
//         initialValues={initialValues}
//         validationSchema={SchoolSchema}
//         onSubmit={async (values, { setSubmitting, setErrors }) => {
//           setSubmissionError(null);
//           setFieldErrors({});
//           try {
//             let coverImageUrl = isEditMode
//               ? university?.payload.cover_image
//               : "";
//             let logoUrl = isEditMode ? university?.payload.logo_url : "";

//             if (values.cover_image instanceof File) {
//               coverImageUrl = await uploadImage(values.cover_image);
//             }
//             if (values.logo instanceof File) {
//               logoUrl = await uploadImage(values.logo);
//             }

//             const formData = new FormData();
//             Object.keys(values).forEach((key) => {
//               const value = (values as { [key: string]: any })[key];
//               if (key !== "cover_image" && key !== "logo") {
//                 formData.append(key, value.toString());
//               }
//             });
//             formData.append("cover_image", coverImageUrl);
//             formData.append("logo", logoUrl);
//             formData.append("school_type", values.school_type);

//             const plainObject = Object.fromEntries(formData.entries());

//             if (isEditMode) {
//               await editUniversity({
//                 uuid: universityId!,
//                 data: plainObject,
//               }).unwrap();
//               toast.success("University updated successfully!");
//             } else {
//               await createUniversity(plainObject).unwrap();
//               toast.success("University created successfully!");
//             }
//             router.push("/majors-universities");
//           } catch (err) {
//             console.error("Failed to submit university:", err);
//             if (err instanceof Response && err.status === 422) {
//               const errorData = await err.json();
//               setErrors(errorData.errors || {});
//               setFieldErrors(errorData.errors || {});
//               setSubmissionError("Please correct the errors in the form.");
//             } else {
//               setSubmissionError(
//                 "Failed to submit university. Please try again."
//               );
//             }
//             toast.error(
//               "Failed to submit university. Please check the form for errors."
//             );
//           } finally {
//             setSubmitting(false);
//           }
//         }}
//       >
//         {({ isSubmitting, setFieldValue, values }) => (
//           <Form className="space-y-6">
//             <div className="space-y-4">
//               <div>
//                 <Label>Cover Image</Label>
//                 <ImageUpload
//                   onImageUpload={(file, dataUrl) => {
//                     setFieldValue("cover_image", file);
//                   }}
//                   label="Cover Image"
//                   className="w-full h-64 bg-gray-100"
//                   imageClassName="object-cover"
//                 />
//               </div>
//               <div>
//                 <Label>Logo</Label>
//                 <ImageUpload
//                   onImageUpload={(file, dataUrl) => {
//                     setFieldValue("logo", file);
//                   }}
//                   label="Logo"
//                   className="w-64 h-64 bg-gray-100"
//                   imageClassName="object-contain"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="kh_name">Khmer Name</Label>
//                 <Field as={Input} id="kh_name" name="kh_name" type="text" />
//                 <ErrorMessage
//                   name="kh_name"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//                 {fieldErrors.kh_name && (
//                   <div className="text-red-500 text-sm">
//                     {fieldErrors.kh_name}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <Label htmlFor="en_name">English Name</Label>
//                 <Field as={Input} id="en_name" name="en_name" type="text" />
//                 <ErrorMessage
//                   name="en_name"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//                 {fieldErrors.en_name && (
//                   <div className="text-red-500 text-sm">
//                     {fieldErrors.en_name}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <Label htmlFor="phone">Phone</Label>
//                 <Field as={Input} id="phone" name="phone" type="text" />
//                 <ErrorMessage
//                   name="phone"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//                 {fieldErrors.phone && (
//                   <div className="text-red-500 text-sm">
//                     {fieldErrors.phone}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <Label htmlFor="email">Email</Label>
//                 <Field as={Input} id="email" name="email" type="email" />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//                 {fieldErrors.email && (
//                   <div className="text-red-500 text-sm">
//                     {fieldErrors.email}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <Label htmlFor="website">Website</Label>
//                 <Field as={Input} id="website" name="website" type="url" />
//                 <ErrorMessage
//                   name="website"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//                 {fieldErrors.website && (
//                   <div className="text-red-500 text-sm">
//                     {fieldErrors.website}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <Label htmlFor="school_type">School Type</Label>
//                 <Field name="school_type">
//                   {({ field, form }: { field: any; form: any }) => (
//                     <Select
//                       onValueChange={(value) =>
//                         form.setFieldValue(field.name, value)
//                       }
//                       value={field.value}
//                     >
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Select School Type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="PUBLIC">Public School</SelectItem>
//                         <SelectItem value="PRIVATE">Private School</SelectItem>
//                         <SelectItem value="TVET">TVET</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   )}
//                 </Field>
//                 <ErrorMessage
//                   name="school_type"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//                 {fieldErrors.school_type && (
//                   <div className="text-red-500 text-sm">
//                     {fieldErrors.school_type}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <Label htmlFor="popular_major">Popular Major</Label>
//                 <Field
//                   as={Input}
//                   id="popular_major"
//                   name="popular_major"
//                   type="text"
//                 />
//                 <ErrorMessage
//                   name="popular_major"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//                 {fieldErrors.popular_major && (
//                   <div className="text-red-500 text-sm">
//                     {fieldErrors.popular_major}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <Label htmlFor="lowest_price">Lowest Price</Label>
//                 <Field
//                   as={Input}
//                   id="lowest_price"
//                   name="lowest_price"
//                   type="number"
//                 />
//                 <ErrorMessage
//                   name="lowest_price"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//                 {fieldErrors.lowest_price && (
//                   <div className="text-red-500 text-sm">
//                     {fieldErrors.lowest_price}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <Label htmlFor="highest_price">Highest Price</Label>
//                 <Field
//                   as={Input}
//                   id="highest_price"
//                   name="highest_price"
//                   type="number"
//                 />
//                 <ErrorMessage
//                   name="highest_price"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//                 {fieldErrors.highest_price && (
//                   <div className="text-red-500 text-sm">
//                     {fieldErrors.highest_price}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <Label htmlFor="location">Location</Label>
//                 <Field as={Input} id="location" name="location" type="text" />
//                 <ErrorMessage
//                   name="location"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//                 {fieldErrors.location && (
//                   <div className="text-red-500 text-sm">
//                     {fieldErrors.location}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <Label htmlFor="province_uuid">Province</Label>
//                 <Field name="province_uuid">
//                   {({ field, form }: { field: any; form: any }) => (
//                     <Select
//                       onValueChange={(value) =>
//                         form.setFieldValue(field.name, value)
//                       }
//                       value={field.value}
//                     >
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Select Province" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="e7de9bc3-4304-49a2-8542-2561f20c4cae">
//                           Banteay Meanchey
//                         </SelectItem>
//                         <SelectItem value="0b065bd6-eef2-49b0-82c4-94a866e70063">
//                           Battambang
//                         </SelectItem>
//                         <SelectItem value="7891f14e-6daa-4794-b12f-f301708b8fb2">
//                           Kampong Cham
//                         </SelectItem>
//                         <SelectItem value="ce83419b-0b30-4f16-971b-14bfd61ecb2e">
//                           Kampong Chhnang
//                         </SelectItem>
//                         <SelectItem value="eb3129a5-377d-4673-b168-ce021778f7eb">
//                           Kampong Speu
//                         </SelectItem>
//                         <SelectItem value="a621f738-5cc2-43e1-b0ae-d3c725f83811">
//                           Kampong Thom
//                         </SelectItem>
//                         <SelectItem value="60a22231-be39-4e29-971a-eb3dc91c7839">
//                           Kampot
//                         </SelectItem>
//                         <SelectItem value="f9fe68d4-19ea-426c-bbbc-bd1ed9beb32a">
//                           Kandal
//                         </SelectItem>
//                         <SelectItem value="c1863af2-cddd-4703-ba62-dd6893f7a14a">
//                           Koh Kong
//                         </SelectItem>
//                         <SelectItem value="e335a512-8e32-4fab-9794-97ce1170323c">
//                           Kratié
//                         </SelectItem>
//                         <SelectItem value="e42ca7d5-6d1b-4e1d-9f34-762f54a9b028">
//                           Mondulkiri
//                         </SelectItem>
//                         <SelectItem value="1e9ab46c-acee-4d4a-b784-ad4c59b0e5de">
//                           Phnom Penh
//                         </SelectItem>
//                         <SelectItem value="04658442-3269-4309-9743-601d8ff7a57e">
//                           Preah Vihear
//                         </SelectItem>
//                         <SelectItem value="951a137c-4c9f-46ed-84b9-71ba185cb303">
//                           Prey Veng
//                         </SelectItem>
//                         <SelectItem value="ece50ad6-0a80-48c6-a8e2-063e52823997">
//                           Pursat
//                         </SelectItem>
//                         <SelectItem value="c9f7dd87-35c9-4664-b677-cbc6388f7dae">
//                           Ratanakiri
//                         </SelectItem>
//                         <SelectItem value="7654b5a3-916a-40af-917f-8c83b6c0593a">
//                           Siem Reap
//                         </SelectItem>
//                         <SelectItem value="bb8630a8-332f-4f25-9dec-aecc266ae73a">
//                           Preah Sihanouk
//                         </SelectItem>
//                         <SelectItem value="916ae2b7-f7d8-4e7d-acb0-25793ccc385c">
//                           Stung Treng
//                         </SelectItem>
//                         <SelectItem value="cb0849d7-c665-4b7b-8040-b9d17485d64e">
//                           Svay Rieng
//                         </SelectItem>
//                         <SelectItem value="6dd30ab7-f766-4f70-8f1e-7a4b090f2ceb">
//                           Takéo
//                         </SelectItem>
//                         <SelectItem value="88bf4455-48d5-4859-bec1-27e26798d8a7">
//                           Oddar Meanchey
//                         </SelectItem>
//                         <SelectItem value="3a9f5f39-0f29-4be0-bceb-da5f88819283">
//                           Kep
//                         </SelectItem>
//                         <SelectItem value="1af7c848-160d-40cf-afe5-0009edab3435">
//                           Pailin
//                         </SelectItem>
//                         <SelectItem value="4d3027ae-d944-4934-873f-3e4699b60fb5">
//                           Tboung Khmum
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                   )}
//                 </Field>
//                 <ErrorMessage
//                   name="province_uuid"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//                 {fieldErrors.province_uuid && (
//                   <div className="text-red-500 text-sm">
//                     {fieldErrors.province_uuid}
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div>
//               <Label htmlFor="map_url">Google Maps Link</Label>
//               <Field as={Input} id="map_url" name="map_url" />
//               <ErrorMessage
//                 name="map_url"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//               {fieldErrors.map_url && (
//                 <div className="text-red-500 text-sm">
//                   {fieldErrors.map_url}
//                 </div>
//               )}
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="vision">Vision</Label>
//                 <Field as={Textarea} id="vision" name="vision" />
//                 <ErrorMessage
//                   name="vision"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//                 {fieldErrors.vision && (
//                   <div className="text-red-500 text-sm">
//                     {fieldErrors.vision}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <Label htmlFor="mission">Mission</Label>
//                 <Field as={Textarea} id="mission" name="mission" />
//                 <ErrorMessage
//                   name="mission"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//                 {fieldErrors.mission && (
//                   <div className="text-red-500 text-sm">
//                     {fieldErrors.mission}
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div>
//               <Label htmlFor="description">Description</Label>
//               <Field as={Textarea} id="description" name="description" />
//               <ErrorMessage
//                 name="description"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//               {fieldErrors.description && (
//                 <div className="text-red-500 text-sm">
//                   {fieldErrors.description}
//                 </div>
//               )}
//             </div>
//             <div className="flex justify-end space-x-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => router.back()}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-primary"
//                 aria-busy={isSubmitting}
//               >
//                 {isSubmitting
//                   ? "Submitting..."
//                   : isEditMode
//                   ? "Update University"
//                   : "Create University"}
//               </Button>
//             </div>
//             {submissionError && (
//               <div className="text-red-500 mt-4">{submissionError}</div>
//             )}

//             {/* Debug output */}
//             <div className="mt-8 p-4 bg-gray-100 rounded">
//               <h3 className="text-lg font-semibold mb-2">
//                 Form Values (Debug):
//               </h3>
//               <pre>{JSON.stringify(values, null, 2)}</pre>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }
