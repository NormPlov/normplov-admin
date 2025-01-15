'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Image from 'next/image';
import { FaUpload } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import {
    useGetJobQuery,
    useGetJobCategoryQuery,
    useUpdateJobMutation
} from '@/app/redux/service/job';
import { JobDetailsProps, UpdateJob, UploadImageResponse } from '@/types/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ClosingDate } from '../../calendar/ClosingDate';
import { useUploadImageMutation } from '@/app/redux/service/media';


const jobTypes = ['Full-time', 'Part-time', 'Internship'];

const validationSchema = Yup.object({
    category: Yup.string().min(1, 'At least one category is required'),
    title: Yup.string(),
    company: Yup.string(),
    logo: Yup.mixed()
        .nullable()
        .test(
            'fileType',
            'Invalid file type. Only JPG, PNG, or GIF files are allowed.',
            (value) => !value || (value instanceof File && SUPPORTED_FORMATS.includes(value.type))
        )
        .test(
            'fileSize',
            'File size is too large. Maximum size is 5 MB.',
            (value) => !value || (value instanceof File && value.size <= FILE_SIZE)
        ),
    facebook_url: Yup.string().url('Must be a valid URL'),
    location: Yup.string(),
    description: Yup.string(),
    job_type: Yup.string(),
    salary: Yup.string(),
    closing_date: Yup.date()
        .required('Closing Date is required')
        .test(
            'is-greater',
            'Closing date must be later than the posting date',
            function (value) {
                const { posted_at } = this.parent;
                return value > posted_at;
            }
        ),
    requirements: Yup.string(),
    responsibilities: Yup.string(),
    email: Yup.string().email('Must be a valid email'),
    phone: Yup.string(),
    website: Yup.string(),
});

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

const FILE_SIZE = 1024 * 1024 * 5; // Max file size 5 MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];


const UpdateJobForm = ({ uuid }: JobDetailsProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [, setImageFile] = useState<File | null>(null);
    const [currentPage,] = useState(1);
    const [itemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);


    const router = useRouter();

    // Fetch job data
    const { data, isLoading } = useGetJobQuery({
        page: currentPage,
        pageSize: itemsPerPage,
    });

    const { data: jobCategory } = useGetJobCategoryQuery()
    // update job 
    const [updateJob] = useUpdateJobMutation()

    // upload image 
    const [uploadImage] = useUploadImageMutation()

    if (isLoading) {
        return <div className="w-10/12 h-screen flex justify-center items-center text-primary">
            Loading...
        </div>;
    }

    // Find the job with the matching UUID
    const job = data?.payload?.items.find((item) => item.uuid === uuid);

    if (!job) {
        return <div className="p-6 text-center text-red-500">Job not found.</div>;
    }


    if (!jobCategory) {
        return <div className="p-6 text-center text-red-500">Job category not found.</div>
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
            setFieldValue("logo", file);
        } else {
            toast.error("Invalid file. Please upload a valid image file.");
        }
    };

    const initialValues = {
        company: job.company_name || "",
        title: job.title || "",
        logo: job.logo || "",
        facebook_url: job.facebook_url || "",
        location: job.location || "",
        description: job.description || "",
        job_type: job.job_type || "",
        salary: "",
        closing_date: job.closing_date || "",
        requirements: job.requirements || [],
        responsibilities: job.responsibilities || [],
        email: job.email || "",
        phone: job.phone || "",
        website: job.website || "",
        category: Array.isArray(job.category) ? job.category : [],
    };

    const handleUploadImage = async (file: File) => {
        try {
            const res: UploadImageResponse = await uploadImage({ url: file }).unwrap();
            toast.success("Upload Logo successfully!")
            return res.payload.file_url;
        } catch (error) {
            console.log("Error upload image:", error)
            toast.error("Failed to upload the image. Please try again.");
            return null;
        }
    };

    const handleUpdateJob = async (values: UpdateJob) => {
        try {
            let logoUrl = values.logo; // Default to the existing logo URL
    
            // Check if there's a new logo file to upload
            if (values.logo instanceof File) {
                const uploadedLogoUrl = await handleUploadImage(values.logo);
                if (uploadedLogoUrl) {
                    logoUrl = uploadedLogoUrl;
                    console.log("logourl ", logoUrl);
                } else {
                    throw new Error("Failed to upload the logo image");
                }
            }
    
            // Prepare the data for updating the job
            const updatedJob: UpdateJob = {
                ...values,
                logo: logoUrl, // Use the updated or existing logo URL
                category: values.category || [], // Ensure category is an array
            };
    
            // Call the updateJob mutation
            await updateJob({ uuid, job: updatedJob }).unwrap();
    
            // Display success notification
            toast.success("Job updated successfully!");
    
            // Redirect to jobs page
            router.push("/jobs");
        } catch (error) {
            console.error("Error updating job:", error);
            toast.error("Failed to update the job. Please try again.");
        }
    };
    
    

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleUpdateJob}

        >
            {({ values, setFieldValue }) => (
                <Form className="w-full p-10 space-y-4">

                    <h2 className="text-3xl font-semibold mb-6 text-secondary">Update Jobs</h2>
                    {/* Back Button */}
                    <div className="mb-6 flex justify-end mx-4">
                        <Button
                            onClick={() => router.back()}
                            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-1"
                        >
                            &larr; Back
                        </Button>
                    </div>

                    {/* Company Name */}
                    <div className="mb-2.5">
                        <label htmlFor="company" className="block text-md font-normal py-2 text-primary">
                            Company Name
                        </label>
                        <Field
                            id="company"
                            name="company"
                            placeholder={job.company_name}
                            type="input"
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-md px-6 py-1.5`}
                        />
                        <ErrorMessage name="company" component="p" className="text-red-500 text-sm mt-1" />
                    </div>
                    {/* cover Job seeking  */}
                    <label htmlFor="logo" className="block font-medium text-primary text-md mb-2">
                        Cover
                    </label>

                    {/* File Drop */}
                    <div
                        className="relative border-dashed border-2 bg-[#fdfdfd] bg-white w-full h-64 rounded-lg overflow-hidden shadow-sm"
                        onDrop={(e) => handleDrop(e, setFieldValue)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <Image
                                src={selectedImage || '/assets/placeholder.jpg'}
                                alt="Logo preview"
                                width={1000}
                                height={1000}
                                className="object-contain w-full h-full rounded-lg"
                            />
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-opacity-50 hover:opacity-100 transition-opacity duration-200">
                            <div className="bg-gray-200 w-62 flex justify-center items-center gap-4 p-2 rounded-md">
                                <FaUpload className="text-gray-400 text-lg" />
                                <span className="text-gray-400 text-md font-medium">Upload Image</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between w-full gap-24">
                        {/* Job Category */}
                        <div className="mb-2.5 w-full">
                            <label htmlFor="category" className="block text-md font-normal py-2 text-primary">
                                Job Category
                            </label>
                            <Select
                                name="category"
                                onValueChange={(value) => setFieldValue('category', value)} // Set the category as a string
                            >
                                <SelectTrigger id="category" className="w-full">
                                    <SelectValue placeholder="Select Job Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {jobCategory?.payload?.categories?.map((type: string) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <ErrorMessage name="category" component="p" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Position */}
                        <div className="mb-2.5 w-full">
                            <label htmlFor="title" className="block font-normal text-primary text-md py-1.5">
                                Position
                            </label>
                            <Field
                                id="title"
                                name="title"
                                placeholder={job.title}
                                type="text"
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-6 py-1.5 text-md`}
                            />
                            <ErrorMessage name="title" component="p" className="text-red-500 text-sm mt-1" />
                        </div>


                    </div>

                    <div className="flex justify-between w-full gap-24">
                        {/* Job Type */}
                        <div className="mb-2.5 w-full">
                            <label htmlFor="job_type" className="block text-md font-normal py-2 text-primary">
                                Job Type
                            </label>
                            <Field
                                as="div"
                                id="job_type"
                                name="job_type"

                            >
                                <Select
                                    name="job_type"
                                    onValueChange={(value) => setFieldValue("job_type", value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Job Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {jobTypes.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                            <ErrorMessage name="job_type" component="p" className="text-red-500 text-sm mt-1" />
                        </div>
                        {/* Closing date */}
                        <div className="mb-2.5 w-full">
                            <label htmlFor="closing_date" className="block text-md font-normal text-primary py-2">
                                Closing Date
                            </label>
                            <ClosingDate
                                selectedDate={values.closing_date}
                                onDateChange={(date) => setFieldValue("closing_date", date)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between w-full gap-24">


                        {/* Salary */}
                        <div className="mb-2.5 w-full">
                            <label htmlFor="salary" className="block font-normal text-primary text-md py-2">
                                Salary
                            </label>
                            <Field
                                as={Input}
                                id="salary"
                                name="salary"
                                placeholder="1000-1200"
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-6 py-1.5 text-md`}
                            />
                            <ErrorMessage name="salary" component="p" className="text-red-500 text-sm mt-1" />
                        </div>

                    </div>


                    {/* Job description */}
                    <div className="mb-2.5">
                        <label htmlFor="description" className="block text-md font-normal py-2 text-primary">
                            Job description
                        </label>
                        <Field
                            as="textarea"
                            id="description"
                            name="description"
                            placeholder={job.description}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-3`}
                        >

                        </Field>
                        <ErrorMessage name="description" component="p" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Job responsibility */}
                    <div className="mb-2.5">
                        <label htmlFor="responsibilities" className="block text-md font-normal text-primary py-2">
                            Job responsibility
                        </label>
                        <Field
                            as="textarea"
                            id="responsibilities"
                            name="responsibilities"
                            placeholder={job.responsibilities}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-3`}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setFieldValue("responsibilities", e.target.value);
                            }}
                        />
                        <ErrorMessage name="responsibilities" component="p" className="text-red-500 text-sm mt-1" />
                    </div>
                    {/* Job requirements */}
                    <div className="mb-2.5">
                        <label htmlFor="requirements" className="block text-md font-normal text-primary py-2">
                            Job requirements
                        </label>
                        <Field
                            as="textarea"
                            id="requirements"
                            name="requirements"
                            placeholder={job.requirements}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-3`}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setFieldValue("requirements", e.target.value);
                            }}
                        />
                        <ErrorMessage name="requirements" component="p" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="flex justify-between w-full gap-24">

                        {/* Facebook */}
                        <div className="mb-2.5 w-full">
                            <label htmlFor="facebook_url" className="block text-md font-normal text-primary py-2">
                                Facebook
                            </label>
                            <Field
                                as="input"
                                id="facebook_url"
                                name="facebook_url"
                                placeholder={job.facebook_url}
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-1.5`}
                            />
                            <ErrorMessage name="facebook_url" component="p" className="text-red-500 text-sm mt-1" />
                        </div>
                        {/* email */}
                        <div className="mb-2.5 w-full">
                            <label htmlFor="email" className="block text-md font-normal text-primary py-2">
                                Email
                            </label>
                            <Field
                                id="email"
                                name="email"
                                placeholder={job.email}
                                type="input"
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-1.5`}
                            />
                            <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
                        </div>
                    </div>


                    <div className="flex justify-between w-full gap-24">
                        {/* Location */}
                        <div className="mb-2.5 w-full">
                            <label htmlFor="location" className="block text-md font-normal py-2 text-primary">
                                Location
                            </label>
                            <Field
                                as="input"
                                id="location"
                                name="location"
                                placeholder={job.location}
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-1.5`}
                            />
                            <ErrorMessage name="location" component="p" className="text-red-500 text-sm mt-1" />
                        </div>
                        {/* Phone number */}
                        <div className="mb-2.5 w-full">
                            <label htmlFor="phone" className="block text-md font-normal py-2 text-primary">
                                Phone Number
                            </label>
                            <Field
                                as="input"
                                id="phone"
                                name="phone"
                                placeholder={job.phone}
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-1.5`}
                            >
                            </Field>
                            <ErrorMessage name="phone" component="p" className="text-red-500 text-sm mt-1" />
                        </div>


                    </div>

                    {/* Resources */}
                    <div className="mb-2.5 w-full">
                        <label htmlFor="website" className="block text-md font-normal text-primary py-2">
                            Resources
                        </label>
                        <Field
                            as="input"
                            id="website"
                            name="website"
                            placeholder={job.website}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-1.5`}
                        />
                        <ErrorMessage name="website" component="p" className="text-red-500 text-sm mt-1" />
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={isLoading} // Disable button during submission
                            className={`bg-primary text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-1 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {isLoading ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                    {/* Debug output */}
                    {/* <div className="mt-8 p-4 bg-gray-100 rounded">
                            <h3 className="text-lg font-semibold mb-2">
                                Form Values (Debug):
                            </h3>
                            <pre>{JSON.stringify(values, null, 2)}</pre>
                    </div> */}
                </Form>

            )}

        </Formik>

    );
};

export default UpdateJobForm;