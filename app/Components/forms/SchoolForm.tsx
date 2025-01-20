"use client";

import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateUniversityMutation } from "@/app/redux/service/university";
import { useUploadImageMutation } from "@/app/redux/service/media";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ImageUploadArea } from "../image/image-upload-area";
import { CreateUniversityType } from "@/types/types";
import { ToastContainer } from "react-toastify";

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
  school_type: Yup.string().required("Required"),
  cover_image: Yup.mixed().nullable(),
  logo: Yup.mixed().nullable(),
});

export default function SchoolForm() {
  const [createUniversity, { isLoading }] = useCreateUniversityMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const router = useRouter();

  if (isLoading || isUploading) {
    return <div>Loading...</div>
  }
  const handleUploadImage = async (file: File | null | string): Promise<string | null> => {
    if (!file || typeof file === "string") return file as string; // Return if already a string (URL)
    try {
      const response = await uploadImage({ url: file }).unwrap();
      return response.payload.file_url;
    } catch (error) {
      console.error("Failed to upload image:", error);
      toast.error("Failed to upload image.");
      return null;
    }
  };

  const handleCreateSchool = async (
    values: CreateUniversityType,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      // Upload images if files are provided
      const coverImageUrl = await handleUploadImage(values.cover_image);
      const logoUrl = await handleUploadImage(values.logo);

      // Prepare final payload for API
      const schoolData = {
        ...values,
        cover_image: coverImageUrl,
        logo: logoUrl,
      };

      // Send the data to the API
      await createUniversity({ newUniversity: schoolData }).unwrap();
      toast.success("School created successfully!");
      router.replace("/majors-universities");
    } catch (error) {
      console.error("Failed to create school:", error);
      toast.error("Failed to create school. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    kh_name: "",
    en_name: "",
    phone: "",
    email: "",
    website: "",
    popular_major: "",
    lowest_price: 0, // Default numeric value for numbers
    highest_price: 0, // Default numeric value for numbers
    location: "",
    map_url: "",
    vision: "",
    mission: "",
    description: "",
    school_type: "",
    cover_image: null, // Optional file value
    logo: null, // Optional file value
    is_popular: false, // Default boolean value
  };


  return (
    <div className="w-full mx-auto p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6 text-secondary">Create School</h1>
        <div className="justify-end mt-6">
          <Button
            onClick={() => router.back()}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-1 mb-6"
          >
            &larr; Back
          </Button>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={SchoolSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Form submitted with values:", values);
          handleCreateSchool(values, setSubmitting);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-6">
            <ToastContainer />
            <div className="space-y-6 mb-6">
              <ImageUploadArea
                image={values.cover_image || "assets/placeholder.jpg"}
                onImageUpload={(file) => setFieldValue("cover_image", file)}
                label="Cover Image"
                className="bg-gray-200 flex flex-col items-center justify-center w-full h-[260px] rounded-lg overflow-hidden"
              />
            </div>
            <div className="flex gap-4 w-full">
              <ImageUploadArea
                image={values.logo || "assets/placeholder.jpg"}
                onImageUpload={(file) => setFieldValue("logo", file)}
                label="Logo"
                className="bg-gray-200 h-[230px] min-w-[250px] flex flex-col items-center justify-center rounded-lg overflow-hidden"
                imageClassName="object-contain"
              />
              <div className="w-full flex flex-col gap-4">
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    <Label htmlFor="kh_name">Khmer Name</Label>
                    <Field as={Input} id="kh_name" name="kh_name" type="text" placeholder="Enter khmer name" />
                    <ErrorMessage name="kh_name" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="en_name">English Name</Label>
                    <Field as={Input} id="en_name" name="en_name" type="text" placeholder="Enter English name"/>
                    <ErrorMessage name="en_name" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    <Label htmlFor="phone">Phone</Label>
                    <Field as={Input} id="phone" name="phone" type="text" placeholder="Enter phone number"/>
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="email">Email</Label>
                    <Field as={Input} id="email" name="email" type="email" placeholder="Enter email"/>
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    <Label htmlFor="website">Website</Label>
                    <Field as={Input} id="website" name="website" type="url" placeholder="Enter website url"/>
                    <ErrorMessage name="website" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="w-full">
  <Label htmlFor="school_type">School Type</Label>
  
  <Field name="school_type">
    {({ field, form }: FieldProps) => (
      <Select
        // Make sure the "value" is from the correct field
        value={field.value}
        // Update Formik state on change
        onValueChange={(val) => {
          // Only update if there's an actual change
          if (val !== field.value) {
            form.setFieldValue(field.name, val);
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={field.value || "Select School Type"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PUBLIC">Public School</SelectItem>
          <SelectItem value="PRIVATE">Private School</SelectItem>
          <SelectItem value="TVET">TVET</SelectItem>
        </SelectContent>
      </Select>
    )}
  </Field>
  
  {/* Match the same name in ErrorMessage */}
  <ErrorMessage name="school_type" component="div" className="text-red-500 text-sm" />
</div>

                </div>
                <div className="flex gap-4 w-full justify-between items-center ">
                  <div className="w-9/12">
                    <Label htmlFor="location">Location</Label>
                    <div className="w-full">
                      <Field name="location"
                        placeholder="Enter location"
                        className="border border-gray-300 py-2 rounded-md px-3 w-full"
                      >
                      </Field>
                    </div>
                    <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <Field
                      type="checkbox"
                      id="is_popular"
                      name="is_popular"
                      className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm">
                      <Field name="is_popular">
                        {({ field }: { field: { value: boolean } }) =>
                          field.value ? "Popular School" : "School Not Popular"
                        }
                      </Field>
                    </span>
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
                        placeholder="0"
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
                        placeholder="0"
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
            <div className="w-full">
              <Label htmlFor="map_url">Google Map URL</Label>
              <Field as={Input} id="map_url" name="map_url" placeholder="Enter Google Map URL" />
              <ErrorMessage name="map_url" component="div" className="text-red-500 text-sm h-8" />
            </div>
            <div className="flex gap-4 w-full">
              <div className="w-full">
                <Label htmlFor="vision">Vision</Label>
                <Field as={Textarea} id="vision" name="vision" placeholder="Enter vision"/>
                <ErrorMessage name="vision" component="div" className="text-red-500 text-sm h-8" />
              </div>
              <div className="w-full">
                <Label htmlFor="mission">Mission</Label>
                <Field as={Textarea} id="mission" name="mission" placeholder="Enter mission"/>
                <ErrorMessage name="mission" component="div" className="text-red-500 text-sm" />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Field as={Textarea} id="description" name="description" placeholder="Enter description"/>
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || isLoading} className="bg-primary">
                {isSubmitting || isLoading ? "Submitting..." : "Create"}
              </Button>
            </div>
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



// "use client";

// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useCreateUniversityMutation } from "@/app/redux/service/university";
// import { useUploadImageMutation } from "@/app/redux/service/media";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { ImageUploadArea } from "../image/image-upload-area";
// import { UniversityType } from "@/types/types";

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
//   map_url: Yup.string().url("Invalid URL").required("Required"),
//   vision: Yup.string().required("Required"),
//   mission: Yup.string().required("Required"),
//   description: Yup.string().required("Required"),
//   school_type: Yup.string().oneOf(["PUBLIC", "PRIVATE", "TVET"]).required("Required"),
//   cover_image: Yup.mixed().nullable(),
//   logo: Yup.mixed().nullable(),
// });

// export default function SchoolForm() {
//   const [createUniversity] = useCreateUniversityMutation();
//   const [uploadImage] = useUploadImageMutation();
//   const router = useRouter();

//   const handleUploadImage = async (file: File | null | string): Promise<string | null> => {
//     if (!file || typeof file === "string") return file as string; // Return if already a string (URL)
//     try {
//       const response = await uploadImage({ url: file }).unwrap();
//       return response.payload.file_url;
//     } catch (error) {
//       console.error("Failed to upload image:", error);
//       toast.error("Failed to upload image.");
//       return null;
//     }
//   };

//   const handleCreateSchool = async (
//     values: UniversityType,
//     setSubmitting: (isSubmitting: boolean) => void
//   ) => {
//     try {
//       // Upload images if files are provided
//       const coverImageUrl = await handleUploadImage(values.cover_image);
//       const logoUrl = await handleUploadImage(values.logo);

//       // Prepare final payload for API
//       const schoolData = {
//         ...values,
//         cover_image: coverImageUrl,
//         logo: logoUrl,
//       };

//       // Send the data to the API
//       await createUniversity({ newUniversity: schoolData }).unwrap();
//       toast.success("School created successfully!");
//       router.replace("/schools");
//     } catch (error) {
//       console.error("Failed to create school:", error);
//       toast.error("Failed to create school. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const initialValues: UniversityType = {
//     kh_name: "",
//     en_name: "",
//     phone: "",
//     email: "",
//     website: "",
//     popular_major: "",
//     lowest_price: 50.0, // Matches API body
//     highest_price: 200.0, // Matches API body
//     location: "",
//     map_url: "",
//     vision: "",
//     mission: "",
//     description: "",
//     school_type: "PUBLIC", // Valid default value
//     cover_image: null, // Optional
//     logo: null, // Optional
//     is_popular: false, // Default boolean value
//   };

//   return (
//     <div className="w-full mx-auto p-6">
//       <Formik
//         initialValues={initialValues}
//         validationSchema={SchoolSchema}
//         onSubmit={(values, { setSubmitting }) => {
//           setSubmitting(true);
//           handleCreateSchool(values, setSubmitting);
//         }}
//       >
//         {({ isSubmitting, setFieldValue, values }) => (
//           <Form className="space-y-6">
//             {/* Upload areas */}
//             <ImageUploadArea
//               image={values.cover_image}
//               onImageUpload={(file) => setFieldValue("cover_image", file)}
//               label="Cover Image"
//               className="bg-gray-200 flex flex-col items-center justify-center w-full h-[260px] rounded-lg overflow-hidden"
//             />
//             <ImageUploadArea
//               image={values.logo || "assets/placeholder.jpg"}
//               onImageUpload={(file) => setFieldValue("logo", file)}
//               label="Logo"
//               className="bg-gray-200 h-[230px] min-w-[250px] flex flex-col items-center justify-center rounded-lg overflow-hidden"
//               imageClassName="object-contain"
//             />

//             {/* Form fields */}
//             <div className="flex gap-4 w-full">
//               <div className="w-full">
//                 <Label htmlFor="kh_name">Khmer Name</Label>
//                 <Field as={Input} id="kh_name" name="kh_name" />
//                 <ErrorMessage name="kh_name" component="div" className="text-red-500 text-sm" />
//               </div>
//               <div className="w-full">
//                 <Label htmlFor="en_name">English Name</Label>
//                 <Field as={Input} id="en_name" name="en_name" />
//                 <ErrorMessage name="en_name" component="div" className="text-red-500 text-sm" />
//               </div>
//             </div>

//             {/* School Type */}
//             <Field name="school_type">
//               {({ field }: any) => (
//                 <Select
//                   value={field.value}
//                   onValueChange={(value) => setFieldValue("school_type", value)}
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select School Type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="PUBLIC">Public School</SelectItem>
//                     <SelectItem value="PRIVATE">Private School</SelectItem>
//                     <SelectItem value="TVET">TVET</SelectItem>
//                   </SelectContent>
//                 </Select>
//               )}
//             </Field>

//             <Button type="submit" disabled={isSubmitting} className="bg-primary">
//               {isSubmitting ? "Submitting..." : "Create"}
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }
