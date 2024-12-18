'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Image from 'next/image';
import { FaUpload } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useGetJobQuery } from '@/app/redux/service/job';
import { JobDetails, JobDetailsProps } from '@/types/types';

const jobCategories = ['IT', 'Education', 'Healthcare', 'Finance'];
const jobTypes = ['Full-time', 'Part-time', 'Contract'];
const qualifications = ['High School', 'Associate', 'Bachelor', 'Master', 'PhD'];

const validationSchema = Yup.object({
    companyName: Yup.string().required('Company Name is required'),
    position: Yup.string().required('Position is required'),
    jobCategory: Yup.string().required('Job Category is required'),
    jobType: Yup.string().required('Job Type is required'),
    qualification: Yup.string().required('Qualification is required'),
    experience: Yup.string().required('Experience is required'),
    closingDate: Yup.date().required('Closing Date is required'),
    jobDescription: Yup.string().required('Job Description is required'),
    jobResponsibility: Yup.string().required('Job Responsibility is required'),
    resources: Yup.string().url('Must be a valid URL').required('Resources URL is required'),
});

const initialValues = {
    companyName: '',
    position: '',
    jobCategory: '',
    jobType: '',
    qualification: '',
    experience: '',
    closingDate: '',
    jobDescription: '',
    jobResponsibility: '',
    resources: '',
};

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

const FILE_SIZE = 1024 * 1024 * 5; // Max file size 5 MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];



const UpdateJobForm = ({ uuid }: JobDetailsProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [, setImageFile] = useState<File | null>(null);
    const [currentPage, ] = useState(1);
    const [itemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

    const router = useRouter();

    // Fetch job data
    const { data, isLoading } = useGetJobQuery({
        page: currentPage,
        pageSize: itemsPerPage,
    });

    if (isLoading) {
        return <div className="p-6 text-center text-primary">Loading...</div>;
    }

    // Find the job with the matching UUID
    const job = data?.payload?.items.find((item: JobDetails) => item.uuid === uuid);

    if (!job) {
        return <div className="p-6 text-center text-red-500">Job not found.</div>;
    }

    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>,
        setFieldValue: (field: string, value: File | null) => void
    ): void => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        if (file && SUPPORTED_FORMATS.includes(file.type) && file.size <= FILE_SIZE) {
            const previewUrl = URL.createObjectURL(file);
            setSelectedImage(previewUrl);
            setImageFile(file);
            setFieldValue("avatar", file);
        }
    };


    return (


        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log('Form data:', values);
                alert('Job added successfully!');
            }}

        >
            {({ setFieldValue }) => (
                <Form className="w-full p-10 space-y-4">
                    <h2 className="text-3xl font-normal mb-6 text-secondary">Update Jobs</h2>
                    {/* Back Button */}
                    <div className="mb-6 flex justify-end mx-4">
                        <button
                            onClick={() => router.back()}
                            className="text-secondary font-medium hover:underline text-md"
                        >
                            &larr; Back
                        </button>
                    </div>

                    {/* Company Name */}
                    <div className="mb-2.5">
                        <label htmlFor="companyName" className="block text-md font-normal py-2 text-primary">
                            Company Name
                        </label>
                        <Field
                            id="companyName"
                            name="companyName"
                            placeholder={job.company_name}
                            type="text"
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg px-6 py-1.5`}
                        />
                        <ErrorMessage name="companyName" component="p" className="text-red-500 text-sm mt-1" />
                    </div>
                    {/* cover Job seeking  */}
                    <label htmlFor="position" className="block font-normal text-primary text-md pt-2">
                        Cover
                    </label>
                    <div
                        className="relative border-dashed border-2 bg-[#fdfdfd] w-full h-56 rounded-lg p-4 mx-auto "
                        onDrop={(e) => handleDrop(e, setFieldValue)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <Image
                            src={selectedImage || "/assets/Placeholderimage.png"}
                            alt="Profile picture"
                            width={1000}
                            height={1000}
                            className="object-cover w-full h-full rounded-lg"
                        />
                        <input
                            type="file"
                            name="avatar"
                            accept="image/jpg, image/jpeg, image/png, image/gif"
                            onChange={(e) => {
                                const file = e.target.files ? e.target.files[0] : null;
                                if (file) {
                                    const previewUrl = URL.createObjectURL(file);
                                    setSelectedImage(previewUrl);
                                    setFieldValue("avatar", file);
                                }
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="bg-gray-200 absolute left-[500px] top-20 flex items-center justify-center gap-2 px-6 py-2 rounded-md">
                            <FaUpload className='text-gray-700' />
                            <span className=' text-gray-700 font-normal'>Upload</span>
                        </div>
                    </div>
                    <div className="flex justify-between w-full gap-24">
                        {/* Job Category */}
                        <div className="mb-2.5 w-full">
                            <label htmlFor="jobCategory" className="block text-md font-normal text-primary py-2">
                                Job Category
                            </label>
                            <Field
                                as="select"
                                id="jobCategory"
                                name="jobCategory"
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-6 py-1.5 text-gray-400`}
                            >
                                <option value="" >Select Job Category</option>
                                {jobCategories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="jobCategory" component="p" className="text-red-500 text-sm mt-1" />
                        </div>
                        {/* Position */}
                        <div className="mb-2.5 w-full">
                            <label htmlFor="position" className="block font-normal text-primary text-md py-2">
                                Position
                            </label>
                            <Field
                                id="position"
                                name="position"
                                placeholder={job.title}
                                type="text"
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-6 py-1.5 text-lg`}
                            />
                            <ErrorMessage name="position" component="p" className="text-red-500 text-sm mt-1" />
                        </div>


                    </div>
                    <div className="flex justify-between w-full gap-24">
                        {/* Job Type */}
                        <div className="mb-2.5 w-full">
                            <label htmlFor="jobType" className="block text-md font-normal py-2 text-primary">
                                Job Type
                            </label>
                            <Field
                                as="select"
                                id="jobType"
                                name="jobType"
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-1.5`}
                            >
                                <option value="">Select Job Type</option>
                                {jobTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="jobType" component="p" className="text-red-500 text-sm mt-1" />
                        </div>
                        {/* Qulification */}
                        <div className="mb-2.5 w-full">
                            <label htmlFor="qulification" className="block text-md font-normal py-2 text-primary">
                                Qulification
                            </label>
                            <Field
                                as="select"
                                id="qulification"
                                name="qulification"
                                placeholder={job.requirements}
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-1.5`}
                            >
                                <option value="">Select Qulification</option>
                                {qualifications.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="qulification" component="p" className="text-red-500 text-sm mt-1" />
                        </div>


                    </div>
                    <div className="flex justify-between w-full gap-24">
                        {/* Closing date */}
                        <div className="mb-2.5 w-full">
                            <label htmlFor="closingDate" className="block text-md font-normal text-primary py-2">
                                Closing Date
                            </label>
                            <Field
                                id="closingDate"
                                name="closingDate"
                                placeholder={job.closing_date}
                                type="date"
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-1.5`}
                            />
                            <ErrorMessage name="closingDate" component="p" className="text-red-500 text-sm mt-1" />
                        </div>
                        {/* Experience */}
                        <div className="mb-2.5 w-full">
                            <label htmlFor="experience" className="block font-normal text-primary text-md py-2">
                                Experience
                            </label>
                            <Field
                                id="experience"
                                name="experience"
                                type="text"
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-6 py-1.5 text-lg`}
                            />
                            <ErrorMessage name="experience" component="p" className="text-red-500 text-sm mt-1" />
                        </div>


                    </div>

                    {/* Job description */}
                    <div className="mb-2.5">
                        <label htmlFor="jobDescription" className="block text-md font-normal py-2 text-primary">
                            Job description
                        </label>
                        <Field
                            as="textarea"
                            id="jobDescription"
                            name="jobDescription"
                            placeholder={job.description}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-3`}
                        >

                        </Field>
                        <ErrorMessage name="jobDescription" component="p" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Job responsibility */}
                    <div className="mb-2.5">
                        <label htmlFor="jobResponsibility" className="block text-md font-normal text-primary py-2">
                            Job responsibility
                        </label>
                        <Field
                            as="textarea"
                            id="jobResponsibility"
                            name="jobResponsibility"
                            placeholder={job.responsibilities}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-3`}
                        />
                        <ErrorMessage name="jobResponsibility" component="p" className="text-red-500 text-sm mt-1" />
                    </div>
                    {/* Resources */}
                    <div className="mb-2.5">
                        <label htmlFor="Resources" className="block text-md font-normal text-primary py-2">
                            Resources
                        </label>
                        <Field
                            as="input"
                            id="Resources"
                            name="Resources"
                            placeholder={job.website}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-1.5`}
                        />
                        <ErrorMessage name="Resources" component="p" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-primary text-white font-medium px-6 py-2 rounded-md shadow hover:bg-blue-600 focus:ring focus:ring-blue-300"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>

    );
};

export default UpdateJobForm;




// "use client";

// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { usePostJobMutation } from "@/app/redux/service/job";
// import Image from "next/image";
// import { FaUpload } from "react-icons/fa";
// import { JobDetails } from "@/types/types";

// const jobCategories = ["IT", "Education", "Healthcare", "Finance"];
// const jobTypes = ["Full-time", "Part-time", "Contract"];
// const qualifications = ["High School", "Associate", "Bachelor", "Master", "PhD"];

// // Validation schema for form fields
// const validationSchema = Yup.object({
//   companyName: Yup.string().required("Company Name is required"),
//   title: Yup.string().required("Position is required"),
//   jobCategory: Yup.string().required("Job Category is required"),
//   jobType: Yup.string().required("Job Type is required"),
//   qualification: Yup.string().required("Qualification is required"),
//   experience: Yup.string().required("Experience is required"),
//   closingDate: Yup.date().required("Closing Date is required"),
//   jobDescription: Yup.string().required("Job Description is required"),
//   jobResponsibility: Yup.string().required("Job Responsibility is required"),
//   resources: Yup.string().url("Must be a valid URL").required("Resources URL is required"),
//   logo: Yup.mixed()
//     .required("Logo is required")
//     .test(
//       "fileSize",
//       "File size must be less than 5MB",
//       (value) => !value || value.size <= 1024 * 1024 * 5
//     )
//     .test(
//       "fileFormat",
//       "Unsupported Format",
//       (value) => !value || ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(value.type)
//     ),
// });

// const initialValues = {
//   companyName: "",
//   title: "",
//   jobCategory: "",
//   jobType: "",
//   qualification: "",
//   experience: "",
//   closingDate: "",
//   jobDescription: "",
//   jobResponsibility: "",
//   resources: "",
//   logo: null,
// };

// const AddJobForm = () => {
//   const [postJob] = usePostJobMutation();
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null);

//   const handleDrop = (
//     e: React.DragEvent<HTMLDivElement>,
//     setFieldValue: (field: string, value: File | null) => void
//   ): void => {
//     e.preventDefault();

//     const file = e.dataTransfer.files[0];
//     if (file && ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(file.type) && file.size <= 1024 * 1024 * 5) {
//       const previewUrl = URL.createObjectURL(file);
//       setSelectedImage(previewUrl);
//       setImageFile(file);
//       setFieldValue("logo", file);
//     }
//   };

//   const handleSubmit = async (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
//     try {
//       const formData = new FormData();

//       // Append all form data manually for FormData compatibility
//       formData.append("companyName", values.companyName);
//       formData.append("title", values.title);
//       formData.append("jobCategory", values.jobCategory);
//       formData.append("jobType", values.jobType);
//       formData.append("qualification", values.qualification);
//       formData.append("experience", values.experience);
//       formData.append("closingDate", values.closingDate);
//       formData.append("jobDescription", values.jobDescription);
//       formData.append("jobResponsibility", values.jobResponsibility);
//       formData.append("resources", values.resources);
//       if (values.logo) {
//         formData.append("logo", values.logo);
//       }

//       // Call API to post the job
//       await postJob(formData).unwrap();
//       alert("Job posted successfully!");
//       resetForm();
//       setSelectedImage(null);
//       setImageFile(null);
//     } catch (error) {
//       console.error("Error posting job:", error);
//       alert("Failed to post job. Please try again.");
//     }
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ setFieldValue }) => (
//         <Form className="w-full p-10 space-y-4">
//           <h2 className="text-3xl font-normal mb-6 text-secondary">Add Jobs</h2>

//           {/* Company Name */}
//           <div>
//             <label htmlFor="companyName" className="block text-md font-normal py-2 text-primary">
//               Company Name
//             </label>
//             <Field
//               id="companyName"
//               name="companyName"
//               type="text"
//               className="w-full border px-4 py-2 rounded"
//             />
//             <ErrorMessage name="companyName" component="p" className="text-red-500 text-sm" />
//           </div>

//           {/* Logo Upload */}
//           <div>
//             <label className="block text-md font-normal py-2 text-primary">Company Logo</label>
//             <div
//               className="relative border-dashed border-2 border-gray-300 rounded-lg p-6"
//               onDrop={(e) => handleDrop(e, setFieldValue)}
//               onDragOver={(e) => e.preventDefault()}
//             >
//               <input
//                 type="file"
//                 accept="image/jpg, image/jpeg, image/png, image/gif"
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (file) {
//                     const previewUrl = URL.createObjectURL(file);
//                     setSelectedImage(previewUrl);
//                     setImageFile(file);
//                     setFieldValue("logo", file);
//                   }
//                 }}
//                 className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
//               />
//               {selectedImage ? (
//                 <Image src={selectedImage} alt="Logo Preview" width={100} height={100} />
//               ) : (
//                 <div className="flex items-center justify-center">
//                   <FaUpload className="text-gray-500" />
//                   <span className="ml-2 text-gray-500">Upload Logo</span>
//                 </div>
//               )}
//             </div>
//             <ErrorMessage name="logo" component="p" className="text-red-500 text-sm" />
//           </div>

//           {/* Job Category */}
//           <div>
//             <label htmlFor="jobCategory" className="block text-md font-normal py-2 text-primary">
//               Job Category
//             </label>
//             <Field as="select" id="jobCategory" name="jobCategory" className="w-full border px-4 py-2 rounded">
//               <option value="">Select Category</option>
//               {jobCategories.map((category) => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </Field>
//             <ErrorMessage name="jobCategory" component="p" className="text-red-500 text-sm" />
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md hover:bg-green-600">
//               Submit
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default AddJobForm;
