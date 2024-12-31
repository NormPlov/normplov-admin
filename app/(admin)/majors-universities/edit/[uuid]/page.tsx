"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import {
  useEditUniversityMutation,
  useUniversityDetailsQuery,
} from "@/app/redux/service/university";
import { ImageUploadArea } from "@/app/Components/image/image-upload-area";
import { UniversityType } from "@/types/types";

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
  map_url: Yup.string().required("Required"),
  vision: Yup.string().required("Required"),
  mission: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  cover_image: Yup.mixed().nullable(),
  logo: Yup.mixed().nullable(),
  province_uuid: Yup.string().required("Required"),
  school_type: Yup.string().required("Required"),
});

export default function EditUniversityPage({
  params,
}: {
  params: { uuid: string };
}) {
  const router = useRouter();
  const {
    data: university,
    isLoading,
    isError,
    error,
    refetch,
  } = useUniversityDetailsQuery<{ payload: UniversityType }>(params.uuid);
  const [editUniversity, { isLoading: isUpdating }] =
    useEditUniversityMutation();
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load university data. Please try again.");
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
        <span className="text-xl font-semibold">
          Loading university data...
        </span>
      </div>
    );
  }

  if (isError || !university) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">
          Error Loading University Data
        </h1>
        <p className="text-red-500 mb-4">
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
        <Button onClick={() => refetch()} className="mr-4">
          Try Again
        </Button>
        <Button
          onClick={() => router.push("/majors-universities")}
          variant="outline"
        >
          Back to Universities
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit University</h1>
      <Formik<UniversityType>
        initialValues={{
          kh_name: university.payload.kh_name || "",
          en_name: university.payload.en_name || "",
          phone: university.payload.phone || "",
          email: university.payload.email || "",
          website: university.payload.website || "",
          popular_major: university.payload.popular_major || "",
          lowest_price: university.payload.lowest_price || "",
          highest_price: university.payload.highest_price || "",
          map_url: university.payload.map_url || "",
          vision: university.payload.vision || "",
          mission: university.payload.mission || "",
          description: university.payload.description || "",
          school_type: university.payload.school_type || "",
          cover_image: null,
          logo: null,
          province_uuid: university.payload.province_uuid || "",
          location: university.payload.location || "",
        }}
        validationSchema={SchoolSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmissionError(null);
          try {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
              const value = (values as { [key: string]: any })[key];
              if (key === "cover_image" || key === "logo") {
                if (value instanceof File) {
                  formData.append(key, value);
                }
              } else {
                formData.append(key, value);
              }
            });
            formData.append("type", values.school_type);
            const plainObject = Object.fromEntries(formData.entries());
            await editUniversity({
              uuid: params.uuid,
              data: plainObject,
            }).unwrap();
            toast.success("University updated successfully!");
            router.push("/majors-universities");
          } catch (err) {
            console.error("Failed to update university:", err);
            setSubmissionError(
              "Failed to update university. Please try again."
            );
            toast.error("Failed to update university. Please try again.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Cover Image</Label>
                <ImageUploadArea
                  image={values.cover_image}
                  existingImageUrl={university.payload.cover_image}
                  onImageUpload={(file) => setFieldValue("cover_image", file)}
                  label="Cover Image"
                  className="w-full h-64"
                />
              </div>
              <div className="flex space-x-4">
                <div>
                  <Label>Logo</Label>
                  <ImageUploadArea
                    image={values.logo}
                    existingImageUrl={university.payload.logo_url}
                    onImageUpload={(file) => setFieldValue("logo", file)}
                    label="Logo"
                    className="w-[300px] h-[300px]"
                  />
                </div>
                <div className="flex flex-col space-y-4 w-full">
                  <div className="flex gap-4 w-full">
                    <div className="w-full">
                      <Label htmlFor="kh_name">Khmer Name</Label>
                      <Field
                        as={Input}
                        id="kh_name"
                        name="kh_name"
                        type="text"
                      />
                      <ErrorMessage
                        name="kh_name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="en_name">English Name</Label>
                      <Field
                        as={Input}
                        id="en_name"
                        name="en_name"
                        type="text"
                      />
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
                  <div className="flex gap-4">
                    <div className="w-full">
                      <Label htmlFor="website">Website</Label>
                      <Field
                        as={Input}
                        id="website"
                        name="website"
                        type="url"
                      />
                      <ErrorMessage
                        name="website"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="school_type">School Type</Label>
                      <Field name="school_type">
                        {({ field, form }: { field: any; form: any }) => (
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
                      <div className="w-full">
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
                      <div className="w-full">
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Field as={Input} id="location" name="location" type="text" />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="province_uuid">Province</Label>
                <Field name="province_uuid">
                  {({ field, form }: { field: any; form: any }) => (
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
            <div>
              <Label htmlFor="map_url">Google Maps Link</Label>
              <Field as={Input} id="map_url" name="map_url" />
              <ErrorMessage
                name="map_url"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vision">Vision</Label>
                <Field as={Textarea} id="vision" name="vision" />
                <ErrorMessage
                  name="vision"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
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
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || isUpdating}
                className="bg-primary"
                aria-busy={isSubmitting || isUpdating}
              >
                {isSubmitting || isUpdating
                  ? "Updating..."
                  : "Update University"}
              </Button>
            </div>
            {submissionError && (
              <div className="text-red-500 mt-4">{submissionError}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
