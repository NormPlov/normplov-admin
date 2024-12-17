"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/app/Components/ImageUpload";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useCreateUniversityMutation } from "@/app/redux/service/university";
import { toast } from "react-hot-toast";

const SchoolSchema = Yup.object().shape({
  kh_name: Yup.string().required("Required"),
  en_name: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  website: Yup.string().url("Invalid URL").required("Required"),
  popularMajor: Yup.string().required("Required"),
  lowestPrice: Yup.number().positive("Must be positive").required("Required"),
  highestPrice: Yup.number().positive("Must be positive").required("Required"),
  address: Yup.string().required("Required"),
  location: Yup.string().url("Invalid URL").required("Required"),
  vision: Yup.string().required("Required"),
  mission: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  schoolCover: Yup.mixed().nullable(),
  schoolLogo: Yup.mixed().nullable(),
});

export default function SchoolForm() {
  const [schoolType, setSchoolType] = useState<string | undefined>();
  const [createUniversity, { isLoading }] = useCreateUniversityMutation();

  console.log(createUniversity);

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create School</h1>
      <Formik
        initialValues={{
          kh_name: "",
          en_name: "",
          phone: "",
          email: "",
          website: "",
          popularMajor: "",
          lowestPrice: "",
          highestPrice: "",
          address: "",
          location: "",
          vision: "",
          mission: "",
          description: "",
          schoolCover: null,
          schoolLogo: null,
        }}
        validationSchema={SchoolSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
              if (key === "schoolCover" || key === "schoolLogo") {
                if (values[key]) {
                  formData.append(key, values[key]);
                }
              }
              // else {
              //   formData.append(key, values[key]);
              // }
            });
            formData.append("type", schoolType || "");

            // const result = await createUniversity(formData).unwrap();
            // console.log("University created:", result);
            toast.success("School created successfully!");
            resetForm();
          } catch (err) {
            console.error("Failed to create university:", err);
            toast.error("Failed to create school. Please try again.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-6">
            <div className="space-y-6 mb-6">
              <div className="bg-gray-400 flex flex-col items-center justify-center w-full h-[260px] rounded-lg">
                <ImageUpload
                  onImageUpload={(file) => {
                    setFieldValue("cover_image", file);
                  }}
                  label=""
                />
                <div className="">Image size 1200 X 300 pixels</div>
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <div className="bg-gray-400 h-[230px] min-w-[250px] flex flex-col items-center justify-center rounded-lg">
                <ImageUpload
                  onImageUpload={(file) => {
                    setFieldValue("schoolLogo", file);
                  }}
                  label=""
                />
                <p className="wrap">Image size 250 X 250 pixels</p>
              </div>
              <div className="w-full flex flex-col gap-4">
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    <Label htmlFor="kh_name">Khmer Name</Label>
                    <Field as={Input} id="kh_name" name="kh_name" type="text" />
                    <ErrorMessage
                      name="kh_name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="en_name">English Name</Label>
                    <Field as={Input} id="en_name" name="en_name" type="text" />
                    <ErrorMessage
                      name="en_name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    <Label htmlFor="phone">Phone</Label>
                    <Field as={Input} id="phone" name="phone" type="text" />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="email">Email</Label>
                    <Field as={Input} id="email" name="email" type="email" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    <Label htmlFor="website">Website</Label>
                    <Field as={Input} id="website" name="website" type="url" />
                    <ErrorMessage
                      name="website"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="school">School Type</Label>
                    <Select value={schoolType} onValueChange={setSchoolType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select School" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public School</SelectItem>
                        <SelectItem value="private">Private School</SelectItem>
                        <SelectItem value="tvet">TVET</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    <Label htmlFor="popularMajor">Popular Major</Label>
                    <Field
                      as={Input}
                      id="popularMajor"
                      name="popularMajor"
                      type="text"
                    />
                    <ErrorMessage
                      name="popularMajor"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex gap-4 w-full">
                    <div className="flex-1">
                      <Label htmlFor="lowest_price">Lowest Price</Label>
                      <Field
                        as={Input}
                        id="lowest_price"
                        name="lowest_price"
                        type="number"
                      />
                      <ErrorMessage
                        name="lowest_price"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="highestPrice">Highest Price</Label>
                      <Field
                        as={Input}
                        id="highestPrice"
                        name="highestPrice"
                        type="number"
                      />
                      <ErrorMessage
                        name="highestPrice"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Field as={Input} id="address" name="address" type="text" />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Field as={Input} id="location" name="location" type="url" />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex gap-4 w-full">
              <div className="w-full">
                <Label htmlFor="vision">Vision</Label>
                <Field as={Textarea} id="vision" name="vision" />
                <ErrorMessage
                  name="vision"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="mission">Mission</Label>
                <Field as={Textarea} id="mission" name="mission" />
                <ErrorMessage
                  name="mission"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Field as={Textarea} id="description" name="description" />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="bg-primary"
              >
                {isSubmitting || isLoading ? "Submitting..." : "Create"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
