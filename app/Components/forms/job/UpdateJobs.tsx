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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ClosingDate } from '../../calendar/ClosingDate';
import { useUploadImageMutation } from '@/app/redux/service/media';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDown } from 'lucide-react';




const jobTypes = ['Full-time', 'Part-time', 'Internship'];

const validationSchema = Yup.object({
    category: Yup.string(),
    title: Yup.string().required('Position is required'),
    company: Yup.string().required('Company Name is required'),
    logo: Yup.mixed().required('Logo is required'),
    facebook_url: Yup.string().url('Must be a valid URL').nullable(),
    location: Yup.string().nullable(),
    posted_at: Yup.date().required('Posting date is required'),
    description: Yup.string().required('Description is required'),
    job_type: Yup.string(),
    schedule: Yup.string().nullable(),
    salary: Yup.string(),
    closing_date: Yup.date()
        .required('Closing Date is required')
        .test('is-greater', 'Closing date must be later than the posting date', function (value) {
            const { posted_at } = this.parent;
            return value > posted_at;
        }),
    requirements: Yup.array().of(Yup.string()),
    responsibilities: Yup.array().of(Yup.string()),
    benefits: Yup.array().of(Yup.string()),
    email: Yup.string().email('Must be a valid email'),
    phone: Yup.array().of(Yup.string()).nullable(),
    website: Yup.string().url('Must be a valid URL'),
});


const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

const FILE_SIZE = 1024 * 1024 * 5; // Max file size 5 MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];


const UpdateJobForm = ({ uuid }: JobDetailsProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [, setImageFile] = useState<File | null>(null);
    const [currentPage,] = useState(1);
    const [itemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const router = useRouter();

    // Fetch job data
    const { data: jobs, isLoading } = useGetJobQuery({
        page: currentPage,
        pageSize: itemsPerPage,

    });

    const { data: jobCategory, isFetching } = useGetJobCategoryQuery()
    // update job 
    const [updateJob] = useUpdateJobMutation()

    // upload image 
    const [uploadImage] = useUploadImageMutation()

    if (isLoading || isFetching) {
        return (
            <div className="flex flex-col space-y-3 mx-10">
                <div className="space-y-4 flex justify-between mt-8">
                    <Skeleton className="h-8 w-96 animate-pulse" />
                    <Skeleton className="h-8 w-28 animate-pulse" />
                </div>
                <Skeleton className="h-[200px] max-w-full rounded-xl animate-pulse" />
                <div className="space-y-2">
                    <Skeleton className="h-8 w-full animate-pulse" />
                    <Skeleton className="h-8 w-full animate-pulse" />
                </div>
            </div>
        );
    }

    // Find the job with the matching UUID
    const job = jobs?.payload?.items.find((item) => item.uuid === uuid);

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

    const initialValues: UpdateJob = {
        company: job.company_name || "",
        title: job.title || "",
        logo: job.logo || "",
        facebook_url: job.facebook_url || null,
        location: job.location || null,
        description: job.description || "",
        job_type: job.job_type || null,
        salary: job.salary || "",
        posted_at: job.created_at || "",
        closing_date: job.closing_date || null,
        requirements: Array.isArray(job.requirements) ? job.requirements : [],
        responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities : [],
        email: job.email || null,
        phone: Array.isArray(job.phone) ? job.phone : [],
        website: job.website || null,
        category: job.category || "",
        schedule: job.schedule || "",
        benefits: Array.isArray(job.benefits) ? job.benefits : [],
    };


    const handleUploadImage = async (file: File) => {
        console.log("data file", file)
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

    console.log("update job ")

    const handleUpdateJob = async (values: UpdateJob) => {
        console.log("Updating job with values:", values);

        try {
            // Handle logo upload
            let logoUrl = values.logo;
            if (values.logo instanceof File) {
                const uploadedLogoUrl = await handleUploadImage(values.logo);
                if (uploadedLogoUrl) {
                    logoUrl = uploadedLogoUrl;
                } else {
                    toast.error("Failed to upload logo. Please try again.");
                    return;
                }
            }

            // Utility function to format dates
            const formatDateToISO = (date: string | Date | null | undefined): string | null => {
                if (!date) return null;

                if (typeof date === "string") {
                    const parsedDate = new Date(date); // Parse the string into a Date object
                    if (isNaN(parsedDate.getTime())) {
                        console.error("Invalid date format:", date);
                        return null; // Handle invalid date
                    }
                    return parsedDate.toISOString().split(".")[0]; // Return ISO format
                } else if (date instanceof Date) {
                    return date.toISOString().split(".")[0]; // Convert Date object to ISO format
                }
                return null;
            };

            // Format date fields
            const closingDateISO = formatDateToISO(values.closing_date);
            const postedAtISO = formatDateToISO(values.posted_at);

            // Convert category to a comma-separated string
            const formatCategory =
                Array.isArray(values.category) && values.category.length > 0
                    ? values.category.join(", ")
                    : values.category || "";

            // Ensure `phone` is always an array of strings
            const formatPhone = (phone: string | string[] | undefined): string[] => {
                if (typeof phone === "string") {
                    // Convert single string to a list
                    return [phone.trim()];
                } else if (Array.isArray(phone)) {
                    // Use as-is if already a list
                    return phone.map((p) => p.trim());
                }
                // Default to an empty list if undefined
                return [];
            };

            const formattedPhone = formatPhone(values.phone);
            // Prepare the update object for UpdateJob type
            const update: UpdateJob = {
                ...values,
                logo: logoUrl,
                closing_date: closingDateISO,
                posted_at: postedAtISO,
                category: formatCategory,
                phone: formattedPhone,
            };

            // Call updateJob mutation
            await updateJob({ uuid, update })
                .unwrap()
                .then((response) => {
                    console.log("Job updated successfully:", response);
                    toast.success("Job updated successfully!");
                });

            router.push("/jobs");
        } catch (error) {
            console.error("Error updating job:", error);
            toast.error("Failed to update the job. Please try again.");
        }
    };

    const handleImageError = () => {
        setSelectedImage("/assets/placeholder.jpg"); // Fallback to placeholder image
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleUpdateJob}
            validateOnBlur={false}
            validateOnChange={false}

        >
            {({ values, setFieldValue }) => (
                <Form className="w-full p-10 space-y-4">
                    <ToastContainer />
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
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-md px-6 py-2`}
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
                                src={
                                    selectedImage || // Use the selected image if available
                                    (job.logo && job.logo.startsWith("http") // Check if job.logo exists and starts with "http"
                                        ? job.logo
                                        : job.logo
                                            ? `${process.env.NEXT_PUBLIC_NORMPLOV_API}${job.logo}` // Prepend the base URL if job.logo exists
                                            : "/assets/placeholder.jpg") // Fallback to placeholder image
                                }
                                alt={job.title || "Job Logo"}
                                className="object-contain rounded-md w-full h-full"
                                width={1000}
                                height={1000}
                                onError={handleImageError}
                            />
                           
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-opacity-50 hover:opacity-100 transition-opacity duration-200">
                            <div className="bg-gray-200 w-62 flex justify-center items-center gap-4 p-2 rounded-md">
                                <FaUpload className="text-gray-400 text-lg" />
                                <span className="text-gray-400 text-md font-medium">Upload Image</span>
                            </div>
                        </div>

                        <Input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setFieldValue('logo', file);
                                    setSelectedImage(URL.createObjectURL(file));
                                }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                    <ErrorMessage name="logo" component="p" className="text-red-500 text-sm mt-2" />

                    <div className="flex justify-between w-full gap-24">
                        {/* category */}
                        <div className="relative mb-4 w-full">
                            <label htmlFor="category" className="block text-md font-normal py-2 text-primary">
                                Job Category
                            </label>
                            <div className="flex items-center rounded focus-within:ring-primary  block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-5 py-1.5 text-md">
                                <input
                                    id="category"
                                    name="category"
                                    type="text"
                                    value={values.category}
                                    onChange={(e) => setFieldValue('category', e.target.value)}
                                    placeholder="Type or select a category"
                                    className="flex-grow outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setDropdownOpen((prev) => !prev)}
                                    className=" rounded-md "
                                >
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </button>
                            </div>
                            {dropdownOpen && (
                                <div
                                    className="absolute left-0 mt-2 w-full border bg-white rounded shadow z-50"
                                    style={{ zIndex: 50 }}
                                >
                                    {jobCategory.payload.categories.map((type) => (
                                        <div
                                            key={type}
                                            onClick={() => {
                                                setFieldValue('category', type);
                                                setDropdownOpen(false);
                                            }}
                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {type}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <ErrorMessage name="category" component="p" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Position */}
                        <div className="w-full">
                            <label htmlFor="title" className="block font-normal text-primary text-md py-1.5">
                                Position
                            </label>
                            <Field
                                id="title"
                                name="title"
                                placeholder={job.title || 'Enter a position'}
                                type="text"
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-6 py-1.5 text-md`}
                            />
                            <ErrorMessage name="title" component="p" className="text-red-500 text-sm mt-1" />
                        </div>


                    </div>

                    <div className="flex justify-between w-full gap-24">
                        {/* Job Type */}
                        <div className="mb-2.5 w-full">
                            <label htmlFor="job_type" className="block text-md font-normal mt-1.5 py-2 text-primary">
                                Job Type
                            </label>
                            <Field
                                as="div"
                                id="job_type"
                                name="job_type"
                            >
                                <Select
                                    name="job_type"
                                    onValueChange={(value) => setFieldValue("job_type", value)}

                                >
                                    <SelectTrigger className="w-full px-5 py-4 text-md">
                                        <SelectValue
                                            placeholder={job.job_type || "Select Job Type"}
                                            className="text-md py-8"
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {jobTypes.map((type) => (
                                                <SelectItem key={type} value={type} className="text-md">
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
                        <div className="w-full">
                            <label htmlFor="closing_date" className="block text-md font-normal text-primary py-2">
                                Closing Date
                            </label>
                            <ClosingDate
                                selectedDate={
                                    values.closing_date
                                        ? new Date(values.closing_date).toISOString() // Convert Date object to string
                                        : null // Handle cases where no closing_date is available
                                }
                                onDateChange={(date) => {
                                    // Convert selected Date object to ISO string and update field value
                                    setFieldValue("closing_date", date ? new Date(date).toISOString() : null);
                                }}
                            />
                            {values.closing_date && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Current closing date: {new Date(values.closing_date).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between w-full gap-24">
                        {/* Salary */}
                        <div className=" w-full">
                            <label htmlFor="salary" className="block font-normal text-primary text-md py-2">
                                Salary
                            </label>
                            <Field
                                as={Input}
                                id="salary"
                                name="salary"
                                placeholder={job.salary || "Enter salary"}
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-6 py-3 text-md`}
                            />
                            <ErrorMessage name="salary" component="p" className="text-red-500 text-sm mt-1" />
                        </div>
                        {/* Schedule */}
                        <div className=" w-full">
                            <label htmlFor="schedule" className="block font-normal text-primary text-md py-2">
                                Schedule
                            </label>
                            <Field
                                as={Input}
                                id="schedule"
                                name="schedule"
                                placeholder={job.schedule || "Enter schedule"}
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-6 py-3 text-md`}
                            />
                            <ErrorMessage name="schedule" component="p" className="text-red-500 text-sm mt-1" />
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
                            placeholder={job.description || "Enter description"}
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
                            placeholder={job.responsibilities || "Enter responsibilities"}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-3`}
                            value={Array.isArray(values.responsibilities) ? values.responsibilities.join(", ") : ""}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setFieldValue("responsibilities", e.target.value.split(",").map((item) => item.trim()));
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
                            placeholder={job.requirements || "Enter requirements"}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-3`}
                            value={(values.requirements || []).join(", ")} // Convert array to string
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setFieldValue(
                                    "requirements",
                                    e.target.value.split(",").map((item) => item.trim()) // Convert string to array
                                );
                            }}
                        />

                        <ErrorMessage name="requirements" component="p" className="text-red-500 text-sm mt-1" />
                    </div>
                    {/* Job benefits */}
                    <div className="mb-2.5">
                        <label htmlFor="benefits" className="block text-md font-normal text-primary py-2">
                            Job benefits
                        </label>
                        <Field
                            as="textarea"
                            id="benefits"
                            name="benefits"
                            placeholder={job.benefits || "Enter benefits"}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-3`}
                            value={(values.benefits || []).join(", ")} // Convert array to string
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setFieldValue(
                                    "benefits",
                                    e.target.value.split(",").map((item) => item.trim()) // Convert string to array
                                );
                            }}
                        />

                        <ErrorMessage name="benefits" component="p" className="text-red-500 text-sm mt-1" />
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
                                placeholder={job.facebook_url || "Enter Facebook URL"}
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
                                placeholder={job.email || "Enter email"}
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
                                placeholder={job.location || "Enter location"}
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
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-1.5`}
                                placeholder={
                                    Array.isArray(job.phone) ? job.phone.join(", ") : job.phone || "Enter phone number"
                                }
                                value={
                                    Array.isArray(values.phone) ? values.phone.join(", ") : values.phone
                                }
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setFieldValue(
                                        "phone",
                                        e.target.value.split(",").map((item) => item.trim())
                                    );
                                }}
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
                            placeholder={job.website || "Enter website"}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-1.5`}
                        />
                        <ErrorMessage name="website" component="p" className="text-red-500 text-sm mt-1" />
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={`bg-primary text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-1 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
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