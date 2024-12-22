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
import GoogleMapComponent from "../map/GoogleMap";

const SchoolSchema = Yup.object().shape({
  kh_name: Yup.string().required("Required"),
  en_name: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  website: Yup.string().url("Invalid URL").required("Required"),
  popular_major: Yup.string().required("Required"),
  lowest_price: Yup.number().positive("Must be positive").required("Required"),
  highest_price: Yup.number().positive("Must be positive").required("Required"),
  location: Yup.string().required("Required"),
  latitude: Yup.number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90")
    .required("Latitude is required"),
  longitude: Yup.number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180")
    .required("Longitude is required"),
  vision: Yup.string().required("Required"),
  mission: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  cover_image: Yup.mixed().nullable(),
  logo: Yup.mixed().nullable(),
});

export default function SchoolForm() {
  const [schoolType] = useState<string | undefined>();
  const [createUniversity, { isLoading }] = useCreateUniversityMutation();
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [submissionError, setSubmissionError] = useState<string | null>(null);

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
          popular_major: "",
          lowest_price: "",
          highest_price: "",
          location: "",
          latitude: "",
          longitude: "",
          vision: "",
          mission: "",
          description: "",
          school_type: "",
          cover_image: null,
          logo: null,
        }}
        validationSchema={SchoolSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmissionError(null);
          try {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
              if (key === "cover_image" || key === "logo") {
                if (values[key]) {
                  formData.append(key, values[key]);
                }
              }
              // else {
              //   formData.append(key, values[key]);
              // }
            });
            formData.append("type", schoolType || "");
            console.log(
              "Form data before submission:",
              Object.fromEntries(formData)
            );
            const result = await createUniversity(formData).unwrap();
            console.log("University created:", result);
            toast.success("School created successfully!");
            setTimeout(() => resetForm(), 2000); // Delay reset to show success message
          } catch (err) {
            console.error("Failed to create university:", err);
            setSubmissionError("Failed to create school. Please try again.");
            toast.error("Failed to create school. Please try again.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-6">
            <div className="space-y-6 mb-6">
              <div className="bg-gray-400 flex flex-col items-center justify-center w-full h-[260px] rounded-lg">
                <ImageUpload
                  onImageUpload={(file) => {
                    setFieldValue("cover_image", file);
                  }}
                  label="Upload Cover Image"
                />
                <div className="text-sm text-gray-600">
                  Image size 1200 X 300 pixels
                </div>
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <div className="bg-gray-400 h-[230px] min-w-[250px] flex flex-col items-center justify-center rounded-lg">
                <ImageUpload
                  onImageUpload={(file) => {
                    setFieldValue("logo", file);
                  }}
                  label="Upload Logo"
                />
                <p className="text-sm text-gray-600">
                  Image size 250 X 250 pixels
                </p>
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
                    <Label htmlFor="school_type">School Type</Label>
                    <Field name="school_type">
                      {({ field, form }) => (
                        <Select
                          onValueChange={(value) =>
                            form.setFieldValue(field.name, value)
                          }
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select School Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PUBLIC">
                              Public School
                            </SelectItem>
                            <SelectItem value="PRIVATE">
                              Private School
                            </SelectItem>
                            <SelectItem value="TVET">TVET</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage
                      name="school_type"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    <Label htmlFor="popular_major">Popular Major</Label>
                    <Field
                      as={Input}
                      id="popular_major"
                      name="popular_major"
                      type="text"
                    />
                    <ErrorMessage
                      name="popular_major"
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
                      <Label htmlFor="highest_price">Highest Price</Label>
                      <Field
                        as={Input}
                        id="highest_price"
                        name="highest_price"
                        type="number"
                      />
                      <ErrorMessage
                        name="highest_price"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <div className="w-full">
                <Label htmlFor="location">Location</Label>
                <Field as={Input} id="location" name="location" type="text" />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="province_uuid">Province</Label>
                <Field name="province_uuid">
                  {({ field, form }) => (
                    <Select
                      onValueChange={(value) =>
                        form.setFieldValue(field.name, value)
                      }
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="e7de9bc3-4304-49a2-8542-2561f20c4cae">
                          Banteay Meanchey
                        </SelectItem>
                        <SelectItem value="0b065bd6-eef2-49b0-82c4-94a866e70063">
                          Battambang
                        </SelectItem>
                        <SelectItem value="7891f14e-6daa-4794-b12f-f301708b8fb2">
                          Kampong Cham
                        </SelectItem>
                        <SelectItem value="ce83419b-0b30-4f16-971b-14bfd61ecb2e">
                          Kampong Chhnang
                        </SelectItem>
                        <SelectItem value="eb3129a5-377d-4673-b168-ce021778f7eb">
                          Kampong Speu
                        </SelectItem>
                        <SelectItem value="a621f738-5cc2-43e1-b0ae-d3c725f83811">
                          Kampong Thom
                        </SelectItem>
                        <SelectItem value="60a22231-be39-4e29-971a-eb3dc91c7839">
                          Kampot
                        </SelectItem>
                        <SelectItem value="f9fe68d4-19ea-426c-bbbc-bd1ed9beb32a">
                          Kandal
                        </SelectItem>
                        <SelectItem value="c1863af2-cddd-4703-ba62-dd6893f7a14a">
                          Koh Kong
                        </SelectItem>
                        <SelectItem value="e335a512-8e32-4fab-9794-97ce1170323c">
                          Kratié
                        </SelectItem>
                        <SelectItem value="e42ca7d5-6d1b-4e1d-9f34-762f54a9b028">
                          Mondulkiri
                        </SelectItem>
                        <SelectItem value="1e9ab46c-acee-4d4a-b784-ad4c59b0e5de">
                          Phnom Penh
                        </SelectItem>
                        <SelectItem value="04658442-3269-4309-9743-601d8ff7a57e">
                          Preah Vihear
                        </SelectItem>
                        <SelectItem value="951a137c-4c9f-46ed-84b9-71ba185cb303">
                          Prey Veng
                        </SelectItem>
                        <SelectItem value="ece50ad6-0a80-48c6-a8e2-063e52823997">
                          Pursat
                        </SelectItem>
                        <SelectItem value="c9f7dd87-35c9-4664-b677-cbc6388f7dae">
                          Ratanakiri
                        </SelectItem>
                        <SelectItem value="7654b5a3-916a-40af-917f-8c83b6c0593a">
                          Siem Reap
                        </SelectItem>
                        <SelectItem value="bb8630a8-332f-4f25-9dec-aecc266ae73a">
                          Preah Sihanouk
                        </SelectItem>
                        <SelectItem value="916ae2b7-f7d8-4e7d-acb0-25793ccc385c">
                          Stung Treng
                        </SelectItem>
                        <SelectItem value="cb0849d7-c665-4b7b-8040-b9d17485d64e">
                          Svay Rieng
                        </SelectItem>
                        <SelectItem value="6dd30ab7-f766-4f70-8f1e-7a4b090f2ceb">
                          Takéo
                        </SelectItem>
                        <SelectItem value="88bf4455-48d5-4859-bec1-27e26798d8a7">
                          Oddar Meanchey
                        </SelectItem>
                        <SelectItem value="3a9f5f39-0f29-4be0-bceb-da5f88819283">
                          Kep
                        </SelectItem>
                        <SelectItem value="1af7c848-160d-40cf-afe5-0009edab3435">
                          Pailin
                        </SelectItem>
                        <SelectItem value="4d3027ae-d944-4934-873f-3e4699b60fb5">
                          Tboung Khmum
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="province_uuid"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="latitude">Latitude</Label>
                <Field
                  name="latitude"
                  as={Input}
                  id="latitude"
                  type="number"
                  step="any"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    setFieldValue("latitude", value);
                    if (!isNaN(parseFloat(value))) {
                      setMapCenter((prev) => ({
                        ...prev,
                        lat: parseFloat(value),
                      }));
                    }
                  }}
                />
                <ErrorMessage
                  name="latitude"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="longitude">Longitude</Label>
                <Field
                  name="longitude"
                  as={Input}
                  id="longitude"
                  type="number"
                  step="any"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    setFieldValue("longitude", value);
                    if (!isNaN(parseFloat(value))) {
                      setMapCenter((prev) => ({
                        ...prev,
                        lng: parseFloat(value),
                      }));
                    }
                  }}
                />
                <ErrorMessage
                  name="longitude"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            <GoogleMapComponent center={mapCenter} />

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
                aria-busy={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? "Submitting..." : "Create"}
              </Button>
            </div>

            {submissionError && (
              <div className="text-red-500 mt-4">{submissionError}</div>
            )}

            {/* Debug output */}
            <div className="mt-8 p-4 bg-gray-100 rounded">
              <h3 className="text-lg font-semibold mb-2">
                Form Values (Debug):
              </h3>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
