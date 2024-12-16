'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState  } from 'react';
import Image from 'next/image';
import { FaUpload } from "react-icons/fa";

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
const FILE_SIZE = 1024 * 1024 * 5; // Max file size 5 MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const AddJobForm = () => {

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [, setImageFile] = useState<File | null>(null);
    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>,
        setFieldValue: (field: string, value: File | null) => void
    ): void => {
        e.preventDefault();
    
        const file = e.dataTransfer.files[0];
        if (file && SUPPORTED_FORMATS.includes(file.type) && file.size <= FILE_SIZE) {
            const previewUrl = URL.createObjectURL(file);
            setSelectedImage(previewUrl); // Ensure `setSelectedImage` is typed as `(url: string) => void`
            setImageFile(file); // Ensure `setImageFile` is typed as `(file: File | null) => void`
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
                    <h2 className="text-3xl font-normal mb-6 text-secondary">Add Jobs</h2>

                    {/* Company Name */}
                    <div className="mb-4">
                        <label htmlFor="companyName" className="block text-md font-normal py-2 text-primary">
                            Company Name
                        </label>
                        <Field
                            id="companyName"
                            name="companyName"
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
                        className="relative border border-2 bg-[#fdfdfd] w-full h-36 rounded-lg p-6 mx-auto "
                        onDrop={(e) => handleDrop(e, setFieldValue)}
                        onDragOver={(e) => e.preventDefault()}
                    >

                        <Image
                            src={selectedImage || `${process.env.NEXT_PUBLIC_NORMPLOV_API}` || "/assets/placeholderProfile.png"}
                            alt="Profile picture"
                            width={1000}
                            height={1000}
                            className="object-cover w-full rounded-lg mx-auto"
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
                                    setImageFile(file);
                                    setFieldValue("avatar", file);
                                }
                            }}
                            className="relative inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="bg-gray-400 absolute left-[500px] top-12 flex items-center justify-center gap-2 px-6 py-2 rounded-md">
                            <FaUpload className='text-white' />
                            <span className=' text-white font-normal'>Upload</span>
                        </div>
                    </div>
                    <div className="flex justify-between w-full gap-24">
                        {/* Job Category */}
                        <div className="mb-4 w-full">
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
                        <div className="mb-4 w-full">
                            <label htmlFor="position" className="block font-normal text-primary text-md py-2">
                                Position
                            </label>
                            <Field
                                id="position"
                                name="position"
                                type="text"
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-6 py-1.5 text-lg`}
                            />
                            <ErrorMessage name="position" component="p" className="text-red-500 text-sm mt-1" />
                        </div>


                    </div>
                    <div className="flex justify-between w-full gap-24">
                        {/* Job Category */}
                        <div className="mb-4 w-full">
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
                            <ErrorMessage name="jobCategory" component="p" className="text-red-500 text-sm mt-1" />
                        </div>
                        {/* Qulification */}
                        <div className="mb-4 w-full">
                        <label htmlFor="jobType" className="block text-md font-normal py-2 text-primary">
                           Qulification
                        </label>
                        <Field
                            as="select"
                            id="jobType"
                            name="jobType"
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-1.5`}
                        >
                            <option value="">Select Qulification</option>
                            {qualifications.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </Field>
                            <ErrorMessage name="position" component="p" className="text-red-500 text-sm mt-1" />
                        </div>


                    </div>
                    <div className="flex justify-between w-full gap-24">
                        {/* Closing date */}
                        <div className="mb-4 w-full">
                        <label htmlFor="closingDate" className="block text-md font-normal text-primary py-2">
                            Closing Date
                        </label>
                        <Field
                            id="closingDate"
                            name="closingDate"
                            type="date"
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-1.5`}
                        />
                        <ErrorMessage name="closingDate" component="p" className="text-red-500 text-sm mt-1" />
                        </div>
                        {/* Position */}
                        <div className="mb-4 w-full">
                            <label htmlFor="position" className="block font-normal text-primary text-md py-2">
                                Position
                            </label>
                            <Field
                                id="position"
                                name="position"
                                type="text"
                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-6 py-1.5 text-lg`}
                            />
                            <ErrorMessage name="position" component="p" className="text-red-500 text-sm mt-1" />
                        </div>


                    </div>

                    {/* Job description */}
                    <div className="mb-4">
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

                    {/* Closing Date */}
                    <div className="mb-4">
                        <label htmlFor="closingDate" className="block text-md font-normal text-primary py-2">
                            Closing Date
                        </label>
                        <Field
                            id="closingDate"
                            name="closingDate"
                            type="date"
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-1.5`}
                        />
                        <ErrorMessage name="closingDate" component="p" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-primary text-white font-medium px-6 py-2 rounded-md shadow hover:bg-blue-600 focus:ring focus:ring-blue-300"
                    >
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default AddJobForm;
