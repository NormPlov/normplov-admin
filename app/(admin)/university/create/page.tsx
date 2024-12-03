"use client";
import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORT_FORMAT = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const initialValue = {
  fileCover: null, // File object
  logo: null, // File object
  name: "",
  description: "",
  location: "",
  website: "",
  email: "",
  phone: "",
  popular: "",
  address: "",
  vision: "",
  mission: "",
  lowestPrice: 0,
  highestPrice: 0,
};

const validationSchema = Yup.object().shape({
  fileCover: Yup.mixed()
    .required("Cover image is required")
    .test("fileFormat", "Unsupported Format", (value: File) => {
      if (!value) return true;
      return SUPPORT_FORMAT.includes(value.type);
    })
    .test("fileSize", "File size is too large", (value: File) => {
      if (!value) return true;
      return value.size <= FILE_SIZE;
    }),
  name: Yup.string().required("University name is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  website: Yup.string().url("Must be a valid URL"),
  email: Yup.string().email("Invalid email format"),
  phone: Yup.string().required("Phone number is required"),
  lowestPrice: Yup.number().min(0, "Lowest price must be non-negative"),
  highestPrice: Yup.number()
    .min(
      Yup.ref("lowestPrice"),
      "Highest price must be greater than or equal to Lowest price"
    )
    .required("Highest price is required"),
});

const CreateUniversity = () => {
  const handleUploadCover = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("cover", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url; // Assume the API returns the file URL
  };

  return (
    <div>
      <h1 className="text-2xl text-textprimary font-bold">Create University</h1>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setFieldValue }) => {
          try {
            const uploadedCoverUrl = await handleUploadCover(values.fileCover);
            const payload = {
              ...values,
              cover: uploadedCoverUrl,
            };
            // Send the payload to your API
            const response = await fetch("/api/universities", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            if (response.ok) {
              alert("University created successfully!");
            } else {
              const errorData = await response.json();
              alert(`Error: ${errorData.message}`);
            }
          } catch (error) {
            console.error("Error uploading cover:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="fileCover">Cover Image</label>
              <input
                id="fileCover"
                name="fileCover"
                type="file"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setFieldValue("fileCover", file);
                }}
              />
              <ErrorMessage
                name="fileCover"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">University Name</label>
              <Field name="name" type="text" className="form-control" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field
                name="description"
                as="textarea"
                className="form-control"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lowestPrice">Lowest Price</label>
              <Field
                name="lowestPrice"
                type="number"
                className="form-control"
              />
              <ErrorMessage
                name="lowestPrice"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="highestPrice">Highest Price</label>
              <Field
                name="highestPrice"
                type="number"
                className="form-control"
              />
              <ErrorMessage
                name="highestPrice"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Add other fields here */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateUniversity;
