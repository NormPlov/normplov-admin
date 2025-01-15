'use client';

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { FaUpload } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useGetJobCategoryQuery, usePostJobMutation } from '@/app/redux/service/job';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {  PostJob } from '@/types/types';
import { PostedDate } from '../../calendar/Component';
import { ClosingDate } from '../../calendar/ClosingDate';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const jobTypes = ['Full-time', 'Part-time', 'Internship'];

const validationSchema = Yup.object({
  category: Yup.string().min(1, 'At least one category is required').required(),
  title: Yup.string().required('Position is required'),
  company: Yup.string().required('Company Name is required'),
  logo: Yup.mixed().required('Logo is required'),
  facebook_url: Yup.string().url('Must be a valid URL'),
  location: Yup.string().required('Location is required'),
  posted_at: Yup.date().required('Posting date is required'),
  description: Yup.string().required('Description is required'),
  job_type: Yup.string().required('Job Type is required'),
  schedule: Yup.string(),
  salary: Yup.string().required('Salary is required'),
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
  requirements: Yup.string().required('Requirements are required'),
  responsibilities: Yup.string().required('Responsibilities are required'),
  benefits: Yup.string().required('Benefits are required'),
  email: Yup.string().email('Must be a valid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  website: Yup.string().url('Must be a valid URL').required("Resource is required"),
});


const initialValues = {
  title: '',
  company: '',
  job_type: '',
  category: [],
  salary: '',
  closing_date: '',
  description: [],
  responsibilities: [],
  requirements: [],
  email: '',
  phone: '',
  location: '',
  logo: File,
  posted_at: new Date().toISOString(),
  benefits: [],
  facebook_url: "",
  schedule: "",
  website: "",

};

const FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

const AddJobForm = () => {
  const router = useRouter();
  const [postJob] = usePostJobMutation();
  const { data: jobCategory } = useGetJobCategoryQuery()

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

 const handleDrop = (
        e: React.DragEvent<HTMLDivElement>,
        setFieldValue: (field: string, value: File | null) => void
    ): void => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        if (file && SUPPORTED_FORMATS.includes(file.type) && file.size <= FILE_SIZE) {
            const previewUrl = URL.createObjectURL(file);
            setSelectedImage(previewUrl);
            // setImageFile(file);
            setFieldValue("logo", file); // Set the File object correctly
        } else {
            toast.error("Invalid file. Please upload a valid image file.");
        }
    };

  console.log("Before function call")

  const handleSubmit = async (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
    console.log('Form Values on Submit:', values);
    try {
      // Ensure logo is a valid File object
      if (!(values.logo instanceof File)) {
        console.log('Logo must be a valid file.');
        return;
      }

      // Prepare job data according to UpdateJob type
      const jobData: PostJob = {
        category: values.category,
        title: values.title,
        company: values.company,
        logo: values.logo, // Include the valid File object for logo
        facebook_url: values.facebook_url || '',
        location: values.location,
        posted_at: new Date(values.posted_at).toISOString().split(".")[0], // Ensure ISO format for dates
        description: values.description || [],
        job_type: values.job_type,
        schedule: values.schedule || '',
        salary: values.salary,
        closing_date: new Date(values.closing_date).toISOString().split(".")[0], // Ensure ISO format for dates
        requirements: values.requirements,
        responsibilities: values.responsibilities,
        benefits: values.benefits,
        email: values.email,
        phone: values.phone,
        website: values.website || '',
      };

      postJob({ job: jobData })
        .unwrap()
        .then(() => {
          console.log("Job successfully created!");
        })
        .catch((error) => {
          console.error("Error adding job:", error);
          alert("Failed to add job. Please try again.");
        });

      // Success 
      toast.success("Job created successfully!")
      resetForm(); // Reset the form
      setSelectedImage(null); // Clear the selected image preview
    } catch (error) {
      console.error('Error adding job:', error);
      toast.error('Failed to add job. Please try again.');
    }
  };


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (

        <Form className="w-full p-10 space-y-4">
          <ToastContainer />
          <h2 className="text-3xl font-semibold mb-6 text-secondary">Add Job</h2>
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
              placeholder="Company name"
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
            {/* Job Category */}
            <div className="mb-2.5 w-full">
              <label htmlFor="category" className="block text-md font-normal py-2 text-primary">
                Job Category
              </label>
              <Field
                as="div"
                id="category"
                name="category"

              >
                <Select
                  name="category"
                  onValueChange={(value) => setFieldValue('category', value)} 
                >
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select Job Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectGroup> */}
                    {jobCategory?.payload?.categories?.map((type: string) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                    {/* </SelectGroup> */}
                  </SelectContent>
                </Select>
              </Field>
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
                placeholder="Python Developer"
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
            {/* schedule */}
            <div className="mb-2.5 w-full">
              <label htmlFor="schedule" className="block font-normal text-primary text-md py-1.5">
                Schedule
              </label>
              <Field
                id="schedule"
                name="schedule"
                placeholder="Monday to Friday, 9 AM to 5 PM"
                type="text"
                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-6 py-1.5 text-md`}
              />
              <ErrorMessage name="schedule" component="p" className="text-red-500 text-sm mt-1" />
            </div>

          </div>
          <div className="flex justify-between w-full gap-24">
            {/* Post date */}
            <div className="mb-2.5 w-full">
              <label htmlFor="posted_at" className="block text-md font-normal text-primary py-2">
                Posted Date
              </label>
              <PostedDate
                selectedDate={values.posted_at}
                onDateChange={(date) => setFieldValue("posted_at", date)}
              />

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
          {/* Job description */}
          <div className="mb-2.5">
            <label htmlFor="description" className="block text-md font-normal py-2 text-primary">
              Job description
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              placeholder="We are looking for a skilled software engineer."
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
              placeholder="Develop and maintain web applications"
              className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-3`}
            />
            <ErrorMessage name="responsibilities" component="p" className="text-red-500 text-sm mt-1" />
          </div>
          {/* Job benefit */}
          <div className="mb-2.5">
            <label htmlFor="benefits" className="block text-md font-normal text-primary py-2">
              Job benefits
            </label>
            <Field
              as="textarea"
              id="benefits"
              name="benefits"
              placeholder="Health insurance"
              className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-3`}
            />
            <ErrorMessage name="benefits" component="p" className="text-red-500 text-sm mt-1" />
          </div>
          {/* Job requriments */}
          <div className="mb-2.5">
            <label htmlFor="requirements" className="block text-md font-normal text-primary py-2">
              Job requirements
            </label>
            <Field
              as="textarea"
              id="requirements"
              name="requirements"
              placeholder="Bachelor's degree in Computer Science"
              className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-3`}
            />
            <ErrorMessage name="requirements" component="p" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="flex justify-between w-full gap-24">

            {/* Facebook */}
            <div className="mb-2.5 w-full">
              <label htmlFor="Resources" className="block text-md font-normal text-primary py-2">
                Facebook
              </label>
              <Field
                as="input"
                id="facebook_url"
                name="facebook_url"
                placeholder="https://facebook.com/"
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
                placeholder="example@gmail.com"
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
                placeholder="Phom Penh, Cambodia"
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
                placeholder="012 34 56 789"
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
              placeholder="www.normplov.edu.kh"
              className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-400 px-6 py-1.5`}
            />
            <ErrorMessage name="website" component="p" className="text-red-500 text-sm mt-1" />
          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-1"
            >
              Submit
            </Button>
          </div>
          
        </Form>
      )}
    </Formik>
  );
};

export default AddJobForm;




