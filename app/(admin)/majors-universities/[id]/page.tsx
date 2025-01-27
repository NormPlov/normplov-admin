// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import {
//     FaEnvelope,
//     FaGlobe,
//     FaMapMarkedAlt,
//     FaMapMarkerAlt,
//     FaPhone,
//     FaPlus,
//     FaEdit,
//     FaTrash,
// } from "react-icons/fa";
// import {
//     Dialog,
//     DialogContent,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import {
//     useUniversityDetailsQuery,
//     useCreateFacultyMutation,
//     useUpdateFacultyMutation,
//     useDeleteFacultyMutation,
// } from "@/app/redux/service/university";
// import {
//     useCreateMajorMutation,
//     useUpdateMajorMutation,
//     useDeleteMajorMutation,
// } from "@/app/redux/service/major";
// import { useParams } from "next/navigation";
// import GoogleMapComponent from "@/app/Components/map/GoogleMap";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Faculty, Major, SchoolPayload } from "@/types/university";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { toast, ToastContainer } from "react-toastify";
// import ConfirmationModal from "@/app/Components/popup/ConfrimBlock";

// const UniversityPage = () => {
//     const params = useParams();
//     const id = Array.isArray(params.id) ? params.id[0] : params.id;
//     const { data, isLoading, error } = useUniversityDetailsQuery(id || "");
//     const university = data?.payload ;
//     console.log("University data", university?.cover_image)

//     const [newFacultyName, setNewFacultyName] = useState("");
//     const [newFacultyDescription, setNewFacultyDescription] = useState("");
//     const [selectedFaculty, setSelectedFaculty] = useState("");
//     const [newMajor, setNewMajor] = useState({
//         name: "",
//         description: "",
//         fee_per_year: 0,
//         duration_years: 0,
//         degree: "",
//         faculty_uuid: ""
//     });

//     const [createFaculty] = useCreateFacultyMutation();
//     const [createMajor] = useCreateMajorMutation();
//     const [updateFaculty] = useUpdateFacultyMutation();
//     const [deleteFaculty] = useDeleteFacultyMutation();
//     const [updateMajor] = useUpdateMajorMutation();
//     const [deleteMajor] = useDeleteMajorMutation();

//     const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
//     const [editingMajor, setEditingMajor] = useState<Major | null>(null);
//     const [, setIsModalOpen] = useState(false);
//     const [isMajorDeleteOpen, setIsMajorDeleteOpen] = useState(false);
//     const [isFacultyDeleteOpen, setIsFacultyDeleteOpen] = useState(false);

//     if(!university){
//         return <div>University not found</div>;
//     }
//     const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState<{
//     type: "faculty" | "major";
//     id: string;
//   } | null>(null);

//   const openConfirmModal = (type: "faculty" | "major", id: string) => {
//     setDeleteTarget({ type, id });
//     setIsConfirmModalOpen(true);
//   };

//   const closeConfirmModal = () => {
//     setIsConfirmModalOpen(false);
//     setDeleteTarget(null);
//   };

//   const handleDeleteConfirmed = async () => {
//     if (!deleteTarget) return;

//     try {
//       if (deleteTarget.type === "faculty") {
//         await deleteFaculty(deleteTarget.id).unwrap();
//         toast.success("Faculty deleted successfully",{
//             hideProgressBar: true
//         });
//       } else if (deleteTarget.type === "major") {
//         await deleteMajor({ id: deleteTarget.id }).unwrap();
//         toast.success("Major deleted successfully",{
//             hideProgressBar: true
//         });
//       }
//     } catch (error) {
//       console.error(`Failed to delete ${deleteTarget.type}:`, error);
//       toast.error(`Failed to delete ${deleteTarget.type}`,{
//         hideProgressBar: true
//     });
//     } finally {
//       closeConfirmModal();
//     }
//   };

//     const handleAddNewFaculty = async () => {
//         if (newFacultyName && id) {
//             setIsFacultyDeleteOpen(true)
//             try {
//                 await createFaculty({
//                     name: newFacultyName,
//                     description: newFacultyDescription,
//                     school_uuid: id,
//                 }).unwrap();

//                 setNewFacultyName("");
//                 setNewFacultyDescription("");
//                 toast.success("Faculty created successfully",{
//                     hideProgressBar: true
//                 });
//                 setIsModalOpen(false);
//             } catch (error) {
//                 console.error("Failed to create faculty:", error);
//                 toast.error("Failed to create faculty",{
//                     hideProgressBar: true
//                 });
//                 if (error.status === 400) {
//                     toast.error("⛔ Deletion not allowed for recommended majors.",{
//                         hideProgressBar: true
//                     });
//                 } else if (error.status === 404) {
//                     toast.error("Not Found: The major could not be found.",{
//                         hideProgressBar: true
//                     });
//                 } else if (error.status === 500) {
//                     toast.error("Server Error: An error occurred on the server. Please try again later.",{
//                         hideProgressBar: true
//                     });
//                 } else {
//                     // Generic error message
//                     toast.error("An unknown error occurred. Please try again.",{
//                         hideProgressBar: true
//                     });
//                 }
//             }
//         }
//     };
//     const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
//         const { name, value } = e.target;
//         setNewMajor((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleAddNewMajor = async () => {
//         if (newMajor.name && selectedFaculty) {
//             console.log("major name", newMajor.name)
//             console.log("faculty uuid:", selectedFaculty)
//             try {
//               const response =  await createMajor({
//                     ...newMajor,
//                     faculty_uuid: selectedFaculty,
//                 }).unwrap();

//                 setNewMajor({
//                     name: "",
//                     description: "",
//                     fee_per_year: 0,
//                     duration_years: 0,
//                     degree: "",
//                     faculty_uuid: ""
//                 });
//                 setSelectedFaculty("");
//                 if(response.status === 200){
//                     toast.success("Major created successfully");
//                     setIsModalOpen(false);
//                 }
// eslint-disable-next-line @typescript-eslint/no-explicit-an
//             } catch (error:any) {
//                 console.error("Failed to create major:", error,{
//                     hideProgressBar: true
//                 });
//                 if(error.status === 422){
//                     toast.error("Major must not have the same degree!",{
//                         hideProgressBar: true
//                     });
//                 }
//                 else{
//                    toast.error("Failed to create major",{
//                     hideProgressBar: true
//                 }) 
//                 }

//             }
//         }
//     };

//     const handleEditFaculty = async (faculty: Faculty) => {
//         if (editingFaculty) {
//             try {
//                 await updateFaculty({
//                     id: faculty.uuid,
//                     name: editingFaculty.name,
//                     description: editingFaculty.description,
//                 }).unwrap();
//                 toast.success("Faculty Updated successfully!",{
//                     hideProgressBar: true
//                 })
//                 setEditingFaculty(null);
//             } catch (error) {
//                 console.error("Failed to update faculty:", error);
//                 toast.error("Failed to update faculty",{
//                     hideProgressBar: true
//                 })
//             }
//         }
//     };

//     // const handleDeleteFaculty = async (id: string) => {
//     //     try {
//     //         await deleteFaculty(id).unwrap();
//     //         toast.success("Faculty deleted successfully",{
//         //     hideProgressBar: true
//         // });
//     //     } catch (error) {
//     //         console.error("Failed to delete faculty:", error);
//     //         toast.error("Failed to delete faculty",{
//         //     hideProgressBar: true
//         // })
//     //     }
//     // };

//     const handleEditMajor = async (major: Major) => {
//         if (editingMajor) {
//             try {
//                 await updateMajor({
//                     id: major.uuid,
//                     name: editingMajor.name,
//                     description: editingMajor.description,
//                     fee_per_year: editingMajor.fee_per_year,
//                     duration_years: editingMajor.duration_years,
//                     degree: editingMajor.degree,
//                 }).unwrap();
//                 setEditingMajor(null);
//                 toast.success("Major Updated successfully!",{
//                     hideProgressBar: true
//                 });
//             } catch (error) {
//                 console.error("Failed to update major:", error);
//                 toast.error("Failed to update major",{
//                     hideProgressBar: true
//                 })
//             }
//         }
//     };

//     // const handleDeleteMajor = async (id: string) => {
//     //     console.log("uuid delete", id)
//     //         try {
//     //            const response =  await deleteMajor({id:id}).unwrap();
//     //             if(response.status === 200){
//     //                 toast.success("Major deleted successfully",{
//         //     hideProgressBar: true
//         // });
//     //             }
// eslint-disable-next-line @typescript-eslint/no-explicit-an
//     //         } catch (error : any) {
//     //             console.error("Failed to delete major:", error);
//     //             toast.error("Failed to delete major",{
//         //     hideProgressBar: true
//         // })
//     //          if (error.status === 400) {
//     //                 toast.error("⛔ Deletion not allowed for recommended majors.",,{
//         //     hideProgressBar: true
//         // });
//     //               } else if (error.status === 404) {
//     //                 toast.error("Not Found: The major could not be found.",{
//         //     hideProgressBar: true
//         // });
//     //               } else if (error.status === 500) {
//     //                 toast.error("Server Error: An error occurred on the server. Please try again later.",{
//         //     hideProgressBar: true
//         // });
//     //               } else {
//     //                 // Generic error message
//     //                 toast.error("An unknown error occurred. Please try again.",{
//         //     hideProgressBar: true
//         // });
//     //               }
//     //             }  

//     // };

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 Loading...
//             </div>
//         );
//     }

//     if (error || !university) {
//         return (
//             <div className="flex justify-center items-center h-screen text-red-500">
// eslint-disable-next-line @typescript-eslint/no-explicit-an
//                 {(error as any)?.data?.message ||
//                     "An error occurred while fetching university details."}
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
//                 <ToastContainer />
//                 {/* {
//                     university?.cover_image ? (
//                         <Image
//                             width={1000}
//                             height={1000}
//                             src={
//                                 university.cover_image.startsWith("http")
//                                     ? university.cover_image
//                                     : `${process.env.NEXT_PUBLIC_NORMPLOV_API}${university.cover_image}`
//                             }
//                             alt={`University cover`}
//                             className="w-full h-full object-container"
//                         />
//                     ) : (
//                         <div></div>
//                     )
//                 } */}

//                 <div className="p-6 flex flex-col md:flex-row gap-8 items-center">
//                     <Avatar className="w-64 h-64">
//                         <AvatarImage
//                             width={1000}
//                             height={1000}
//                             src={
//                                 !university
//                                     ?.logo_url
//                                     ? "/assets/placeholder.png"
//                                     : university.logo_url.startsWith("http")
//                                         ? university.logo_url
//                                         : `${process.env.NEXT_PUBLIC_NORMPLOV_API}${university.logo_url}`
//                             }

//                             alt={`${university?.en_name || "University"} Logo`}
//                             className="w-full h-full object-container "
//                         />
//                         <AvatarFallback className="text-gray-700">
//                             {university?.en_name?.[0]?.toUpperCase() || "?"}
//                         </AvatarFallback>
//                     </Avatar>
//                     <div className="space-y-4">
//                         <h1 className="text-4xl font-bold text-textprimary">
//                             {university.kh_name}
//                         </h1>
//                         <p className="text-2xl text-textprimary">{university.en_name}</p>
//                         <div className="space-y-2 text-gray-700">
//                             <p className="flex items-center gap-2">
//                                 <FaPhone className="text-gray-500" /> {university.phone}
//                             </p>
//                             <Link
//                                 href={`mailto:${university.email}`}
//                                 className="flex items-center gap-2 text-gray-500 hover:text-green-700"
//                             >
//                                 <FaEnvelope className="text-gray-500" /> {university.email}
//                             </Link>
//                             <Link
//                                 href={university.website || "#"}
//                                 className="flex items-center gap-2 text-primary hover:text-green-700"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                             >
//                                 <FaGlobe className="text-gray-500" />{" "}
//                                 {university.website || "Website not available"}
//                             </Link>
//                             <p className="flex items-center gap-2">
//                                 <FaMapMarkerAlt className="text-gray-500 text-lg" />{" "}
//                                 {university.location}
//                             </p>
//                             <Link
//                                 href={university.map_url || "#"}
//                                 className="flex items-center gap-2  hover:text-green-700"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                             >
//                                 <FaMapMarkedAlt className="text-gray-500" /> View On Map
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="space-y-8">
//                 <section>
//                     <h2 className="text-2xl font-bold text-textprimary mb-4">Description</h2>
//                     <p className="text-gray-500">{university.description}</p>
//                 </section>

//                 <section>
//                     <h2 className="text-2xl font-bold text-textprimary mb-4">Vision</h2>
//                     <p className="text-gray-500">{university.vision}</p>
//                 </section>

//                 <section>
//                     <h2 className="text-2xl font-bold text-textprimary mb-4">Mission</h2>
//                     <p className="text-gray-500">{university.mission}</p>
//                 </section>

//                 <section>
//                     <h2 className="text-2xl font-bold text-textprimary mb-4">Location</h2>
//                     {university.latitude && university.longitude ? (
//                         <GoogleMapComponent
//                             center={{ lat: university.latitude, lng: university.longitude }}
//                         />
//                     ) : (
//                         <p className="text-gray-700">Map location not available</p>
//                     )}
//                 </section>

//                 <section>
//                     <div className="flex items-center justify-between mb-6">
//                         <h2 className="text-2xl font-bold text-textprimary">
//                             Faculties and Majors
//                         </h2>
//                         <Dialog>
//                             <DialogTrigger asChild>
//                                 <Button
//                                     variant="outline"
//                                     className="bg-primary text-white hover:bg-green-700 hover:text-white"
//                                 >
//                                     <FaPlus className="mr-2" />
//                                     Add Faculty
//                                 </Button>
//                             </DialogTrigger>
//                             <DialogContent className="sm:max-w-[425px]">
//                                 <DialogHeader>
//                                     <DialogTitle className="text-textprimary">Add New Faculty</DialogTitle>
//                                 </DialogHeader>
//                                 <div className="grid gap-4 py-4">
//                                     <div className="grid grid-cols-4 items-center gap-4">
//                                         <Label htmlFor="facultyName" className="text-right text-gray-600">
//                                             Faculty Name
//                                         </Label>
//                                         <Input
//                                             id="facultyName"
//                                             className="col-span-3"
//                                             placeholder="Enter Faculty name"
//                                             value={newFacultyName}
//                                             onChange={(e) => setNewFacultyName(e.target.value)}
//                                         />
//                                     </div>
//                                     <div className="grid grid-cols-4 items-center gap-4">
//                                         <Label htmlFor="facultyDescription" className="text-right text-gray-600">
//                                             Description
//                                         </Label>
//                                         <Input
//                                             id="facultyDescription"
//                                             className="col-span-3"
//                                             placeholder="Enter Faculty description"
//                                             value={newFacultyDescription}
//                                             onChange={(e) => setNewFacultyDescription(e.target.value)}
//                                         />
//                                     </div>
//                                 </div>
//                                 <DialogFooter className="text-right justify-end">
//                                     <Button
//                                         variant="outline"
//                                         onClick={() => {
//                                             setNewFacultyName("");
//                                             setNewFacultyDescription("");
//                                         }}
//                                     >
//                                         Cancel
//                                     </Button>
//                                     <Button
//                                         type="submit"
//                                         className="bg-primary text-white hover:bg-green-700"
//                                         onClick={handleAddNewFaculty}
//                                     >
//                                         Add Faculty
//                                     </Button>
//                                 </DialogFooter>
//                             </DialogContent>
//                         </Dialog>
//                     </div>
//                     <div className="space-y-8">
//                         {university.faculties.map((faculty) => (
//                             <Card key={faculty.uuid} className="w-full bg-white shadow-sm">
//                                 <CardHeader>
//                                     {editingFaculty && editingFaculty.uuid === faculty.uuid ? (
//                                         <div className="space-y-2">
//                                             <Input
//                                                 value={editingFaculty.name}
//                                                 onChange={(e) =>
//                                                     setEditingFaculty({
//                                                         ...editingFaculty,
//                                                         name: e.target.value,
//                                                     })
//                                                 }
//                                             />
//                                             <Input
//                                                 value={editingFaculty.description}
//                                                 onChange={(e) =>
//                                                     setEditingFaculty({
//                                                         ...editingFaculty,
//                                                         description: e.target.value,
//                                                     })
//                                                 }
//                                             />
//                                             <Button onClick={() => handleEditFaculty(faculty)}
//                                                 className="bg-primary hover:bg-green-700">
//                                                 Save
//                                             </Button>
//                                             <Button
//                                                 variant="outline"
//                                                 onClick={() => setEditingFaculty(null)}
//                                             >
//                                                 Cancel
//                                             </Button>
//                                         </div>
//                                     ) : (
//                                         <>
//                                             <CardTitle className="text-2xl font-bold text-textprimary">
//                                                 {faculty.name}
//                                             </CardTitle>
//                                             <p className="text-gray-600">{faculty.description}</p>
//                                             <div className="flex space-x-2 mt-2">
//                                                 <Button
//                                                     variant="outline"
//                                                     size="sm"
//                                                     onClick={() => setEditingFaculty(faculty)}

//                                                 >
//                                                     <FaEdit className="mr-2" /> Edit
//                                                 </Button>
//                                                 <Button
//                                                     variant="outline"
//                                                     size="sm"
//                                                     onClick={() => openConfirmModal("faculty", faculty.uuid)}
//                                                     className="text-red-500 hover:text-red-700"
//                                                 >
//                                                     <FaTrash className="mr-2" /> Delete
//                                                 </Button>
//                                             </div>
//                                         </>
//                                     )}
//                                 </CardHeader>
//                                 <CardContent>
//                                     <h3 className="text-xl font-semibold text-textprimary mb-4">
//                                         Majors:
//                                     </h3>
//                                     {faculty.majors.items.length > 0 ? (
//                                         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                                             {faculty.majors.items.map((major) => (
//                                                 <Card key={major.uuid} className="bg-gray-50">
//                                                     <CardHeader>
//                                                         {editingMajor &&
//                                                             editingMajor.uuid === major.uuid ? (
//                                                             <div className="space-y-2">
//                                                                 <Input
//                                                                     value={editingMajor.name}
//                                                                     onChange={(e) =>
//                                                                         setEditingMajor({
//                                                                             ...editingMajor,
//                                                                             name: e.target.value,
//                                                                         })
//                                                                     }
//                                                                 />
//                                                                 <Input
//                                                                     value={editingMajor.description}
//                                                                     onChange={(e) =>
//                                                                         setEditingMajor({
//                                                                             ...editingMajor,
//                                                                             description: e.target.value,
//                                                                         })
//                                                                     }
//                                                                 />
//                                                                 <Input
//                                                                     type="number"
//                                                                     value={editingMajor.fee_per_year}
//                                                                     onChange={(e) =>
//                                                                         setEditingMajor({
//                                                                             ...editingMajor,
//                                                                             fee_per_year: Number(e.target.value),
//                                                                         })
//                                                                     }
//                                                                 />
//                                                                 <Input
//                                                                     type="number"
//                                                                     value={editingMajor.duration_years}
//                                                                     onChange={(e) =>
//                                                                         setEditingMajor({
//                                                                             ...editingMajor,
//                                                                             duration_years: Number(e.target.value),
//                                                                         })
//                                                                     }
//                                                                 />
//                                                                 <div className="flex items-center justify-between space-x-2">
//                                                                     <label htmlFor="degree" className="text-sm font-medium">
//                                                                         Degree:
//                                                                     </label>
//                                                                     <select
//                                                                         id="degree"
//                                                                         name="degree"
//                                                                         value={newMajor.degree}
//                                                                         onChange={handleInputChange}
//                                                                         className="border border-gray-300 rounded-md px-3 py-2 w-48 text-sm focus:outline-none focus:ring-1 "
//                                                                     >
//                                                                         <option value="ASSOCIATE">Associate</option>
//                                                                         <option value="BACHELOR">Bachelor</option>
//                                                                         <option value="MASTER">Master</option>
//                                                                         <option value="PHD">PhD</option>
//                                                                     </select>
//                                                                 </div>

//                                                                 <div className="flex justify-between gap-4 my-3">

//                                                                     <Button
//                                                                         variant="outline"
//                                                                         onClick={() => setEditingMajor(null)}
//                                                                     >
//                                                                         Cancel
//                                                                     </Button>
//                                                                     <Button onClick={() => handleEditMajor(major)}
//                                                                         className="bg-primary hover:bg-green-700">
//                                                                         Save
//                                                                     </Button>
//                                                                 </div>
//                                                             </div>
//                                                         ) : (
//                                                             <>
//                                                                 <CardTitle className="text-lg font-medium text-gray-800">
//                                                                     {major.name}
//                                                                 </CardTitle>
//                                                                 <p className="text-sm text-gray-600">
//                                                                     {major.description}
//                                                                 </p>
//                                                                 <p className="text-sm text-gray-600">
//                                                                     {major.degree} - {major.duration_years} years
//                                                                 </p>
//                                                                 <p className="text-sm text-gray-600">
//                                                                     Fee per year: ${major.fee_per_year}
//                                                                 </p>
//                                                                 <div className="flex space-x-2 mt-2">
//                                                                     <Button
//                                                                         variant="outline"
//                                                                         size="sm"
//                                                                         onClick={() => setEditingMajor(major)}
//                                                                     >
//                                                                         <FaEdit className="mr-2" /> Edit
//                                                                     </Button>
//                                                                     <Button
//                                                                         variant="outline"
//                                                                         size="sm"
//                                                                         onClick={() =>{
//                                                                             if(!major.is_recommended){
//                                                                                 openConfirmModal("major", major.uuid)
//                                                                             }else{
//                                                                                 toast.error("This major is recommended cannot be deleted")
//                                                                             }

//                                                                         }

//                                                                         }
//                                                                         className="text-red-500 hover:text-red-700"
//                                                                     >
//                                                                         <FaTrash className="mr-2" /> Delete
//                                                                     </Button>
//                                                                 </div>
//                                                             </>
//                                                         )}
//                                                     </CardHeader>
//                                                 </Card>
//                                             ))}
//                                         </div>
//                                     ) : (
//                                         <p className="text-gray-600">
//                                             No majors available for this faculty.
//                                         </p>
//                                     )}
//                                     <Dialog>
//                                         <DialogTrigger asChild>
//                                             <Button
//                                                 variant="outline"
//                                                 size="sm"
//                                                 className="mt-4 w-full"
//                                             >
//                                                 <FaPlus className="mr-2 h-4 w-4" />
//                                                 Add Major
//                                             </Button>
//                                         </DialogTrigger>
//                                         <DialogContent className="sm:max-w-[425px]">
//                                             <DialogHeader>
//                                                 <DialogTitle>
//                                                     Add New Major to {faculty.name}
//                                                 </DialogTitle>
//                                             </DialogHeader>
//                                             <div className="grid gap-4 py-4">
//                                                 <div className="grid grid-cols-4 items-center gap-4">
//                                                     <Label htmlFor="majorName" className="text-right">
//                                                         Major Name
//                                                     </Label>
//                                                     <Input
//                                                         id="majorName"
//                                                         className="col-span-3"
//                                                         placeholder="Enter Major name"
//                                                         value={newMajor.name}
//                                                         onChange={(e) =>
//                                                             setNewMajor({ ...newMajor, name: e.target.value })
//                                                         }
//                                                     />
//                                                 </div>
//                                                 <div className="grid grid-cols-4 items-center gap-4">
//                                                     <Label
//                                                         htmlFor="majorDescription"
//                                                         className="text-right"
//                                                     >
//                                                         Description
//                                                     </Label>
//                                                     <Input
//                                                         id="majorDescription"
//                                                         className="col-span-3"
//                                                         placeholder="Enter Major description"
//                                                         value={newMajor.description}
//                                                         onChange={(e) =>
//                                                             setNewMajor({
//                                                                 ...newMajor,
//                                                                 description: e.target.value,
//                                                             })
//                                                         }
//                                                     />
//                                                 </div>
//                                                 <div className="grid grid-cols-4 items-center gap-4">
//                                                     <Label htmlFor="feePerYear" className="text-right">
//                                                         Fee per Year
//                                                     </Label>
//                                                     <Input
//                                                         id="feePerYear"
//                                                         className="col-span-3"
//                                                         type="number"
//                                                         placeholder="Enter fee per year"
//                                                         value={newMajor.fee_per_year}
//                                                         onChange={(e) =>
//                                                             setNewMajor({
//                                                                 ...newMajor,
//                                                                 fee_per_year: Number(e.target.value),
//                                                             })
//                                                         }
//                                                     />
//                                                 </div>
//                                                 <div className="grid grid-cols-4 items-center gap-4">
//                                                     <Label htmlFor="durationYears" className="text-right">
//                                                         Duration (Years)
//                                                     </Label>
//                                                     <Input
//                                                         id="durationYears"
//                                                         className="col-span-3"
//                                                         type="number"
//                                                         placeholder="Enter duration in years"
//                                                         value={newMajor.duration_years}
//                                                         onChange={(e) =>
//                                                             setNewMajor({
//                                                                 ...newMajor,
//                                                                 duration_years: Number(e.target.value),
//                                                             })
//                                                         }
//                                                     />
//                                                 </div>
//                                                 <div className="flex items-center justify-between space-x-2">
//                                                     <Label htmlFor="degree" className="text-sm font-medium">
//                                                         Degree:
//                                                     </Label>
//                                                     <select
//                                                         id="degree"
//                                                         name="degree"
//                                                         value={newMajor.degree}
//                                                         onChange={handleInputChange}
//                                                         className="border border-gray-300 rounded-md px-3 py-2 w-48 text-sm focus:outline-none focus:ring-1 "
//                                                     >
//                                                         <option value="ASSOCIATE">Associate</option>
//                                                         <option value="BACHELOR">Bachelor</option>
//                                                         <option value="MASTER">Master</option>
//                                                         <option value="PHD">PhD</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                             <DialogFooter>
//                                                 <Button
//                                                     variant="outline"
//                                                     onClick={() =>
//                                                         setNewMajor({
//                                                             name: "",
//                                                             description: "",
//                                                             fee_per_year: 0,
//                                                             duration_years: 0,
//                                                             degree: "",
//                                                             faculty_uuid: ""
//                                                         })
//                                                     }
//                                                 >
//                                                     Cancel
//                                                 </Button>
//                                                 <Button
//                                                     type="submit"
//                                                     className="bg-primary text-white hover:bg-grren-700"
//                                                     onClick={() => {
//                                                         setSelectedFaculty(faculty.uuid);
//                                                         handleAddNewMajor();
//                                                     }}
//                                                 >
//                                                     Add Major
//                                                 </Button>
//                                             </DialogFooter>
//                                         </DialogContent>
//                                     </Dialog>
//                                 </CardContent>
//                             </Card>
//                         ))}
//                         {/* {isConfirmModalOpen && (
//         <ConfirmationModal
//           title={`Confirm Delete ${
//             deleteTarget?.type === "faculty" ? "Faculty" : "Major"
//           }`}
//           message={`Are you sure you want to delete this ${
//             deleteTarget?.type === "faculty" ? "faculty" : "major"
//           }? This action cannot be undone.`}
//           onConfirm={handleDeleteConfirmed}
//           onCancel={closeConfirmModal}
//           confirmText="Delete"
//           cancelText="Cancel"
//         />
//       )} */}
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default UniversityPage;




"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
    FaEnvelope,
    FaGlobe,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaPhone,
    FaPlus,
    FaEdit,
    FaTrash,
} from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    useUniversityDetailsQuery,
    useCreateFacultyMutation,
    useUpdateFacultyMutation,
    useDeleteFacultyMutation,
} from "@/app/redux/service/university";
import {
    useCreateMajorMutation,
    useUpdateMajorMutation,
    useDeleteMajorMutation,
} from "@/app/redux/service/major";
import { useParams } from "next/navigation";
import GoogleMapComponent from "@/app/Components/map/GoogleMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Faculty, Major, SchoolPayload } from "@/types/university";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";

const UniversityPage = () => {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const { data, isLoading } = useUniversityDetailsQuery(id || "");
    const university = data?.payload as SchoolPayload | undefined;
    console.log("University data", university?.cover_image)

    const [newFacultyName, setNewFacultyName] = useState("");
    const [newFacultyDescription, setNewFacultyDescription] = useState("");
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [newMajor, setNewMajor] = useState({
        name: "",
        description: "",
        fee_per_year: 0,
        duration_years: 0,
        degree: "",
        faculty_uuid: ""
    });

    const [createFaculty] = useCreateFacultyMutation();
    const [createMajor] = useCreateMajorMutation();
    const [updateFaculty] = useUpdateFacultyMutation();
    const [deleteFaculty] = useDeleteFacultyMutation();
    const [updateMajor] = useUpdateMajorMutation();
    const [deleteMajor] = useDeleteMajorMutation();

    const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
    const [editingMajor, setEditingMajor] = useState<Major | null>(null);
    const [, setIsModalOpen] = useState(false);

    if (!university) {
        return <div>University not found</div>;
    }
    const handleAddNewFaculty = async () => {
        if (newFacultyName && id) {
            try {
                await createFaculty({
                    name: newFacultyName,
                    description: newFacultyDescription,
                    school_uuid: id,
                }).unwrap();
                setNewFacultyName("");
                setNewFacultyDescription("");
                toast.success("Faculty created successfully", {
                    hideProgressBar: true,
                });
                setIsModalOpen(false);
            } catch (error) {
                console.error("Failed to create faculty:", error);
                toast.error("Failed to create faculty", {
                    hideProgressBar: true,
                });
            }
        }
    };
    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setNewMajor((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddNewMajor = async () => {
        if (newMajor.name && selectedFaculty) {
            console.log("major name", newMajor.name)
            console.log("faculty uuid:", selectedFaculty)
            try {
                await createMajor({
                    ...newMajor,
                    faculty_uuid: selectedFaculty,
                }).unwrap();

                setNewMajor({
                    name: "",
                    description: "",
                    fee_per_year: 0,
                    duration_years: 0,
                    degree: "",
                    faculty_uuid: ""
                });
                setSelectedFaculty("");
                toast.success("Major created successfully", {
                    hideProgressBar: true,
                });
                setIsModalOpen(false);
            } catch (error) {
                console.error("Failed to create major:", error);
                toast.error("Failed to create major", {
                    hideProgressBar: true,
                })
            }
        }
    };

    const handleEditFaculty = async (faculty: Faculty) => {
        if (editingFaculty) {
            try {
                await updateFaculty({
                    id: faculty.uuid,
                    name: editingFaculty.name,
                    description: editingFaculty.description,
                }).unwrap();
                toast.success("Faculty Updated successfully!", {
                    hideProgressBar: true,
                })
                setEditingFaculty(null);
            } catch (error) {
                console.error("Failed to update faculty:", error);
                toast.error("Failed to update faculty", {
                    hideProgressBar: true,
                })
            }
        }
    };

    const handleDeleteFaculty = async (id: string) => {
        try {
            await deleteFaculty(id).unwrap();
            toast.success("Faculty deleted successfully", {
                hideProgressBar: true,
            });
        } catch (error) {
            console.error("Failed to delete faculty:", error);
            toast.error("Failed to delete faculty", {
                hideProgressBar: true,
            })
        }
    };

    const handleEditMajor = async (major: Major) => {
        if (editingMajor) {
            try {
                await updateMajor({
                    id: major.uuid,
                    name: editingMajor.name,
                    description: editingMajor.description,
                    fee_per_year: editingMajor.fee_per_year,
                    duration_years: editingMajor.duration_years,
                    degree: editingMajor.degree,
                }).unwrap();
                setEditingMajor(null);
                toast.success("Major Updated successfully!", {
                    hideProgressBar: true,
                });
            } catch (error) {
                console.error("Failed to update major:", error);
            }
        }
    };

    const handleDeleteMajor = async (id: string) => {
        console.log("uuid delete", id)
        try {
            await deleteMajor({ id: id }).unwrap();
            toast.success("Major deleted successfully", {
                hideProgressBar: true,
            });
        } catch (error) {
            console.error("Failed to delete major:", error);
            toast.error("Failed to delete major", {
                hideProgressBar: true,
            })
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    // const coverImageSrc = useMemo(() => {
    //     if (university?.cover_image) {
    //         // If `cover_image` exists, construct the full URL
    //         return university.cover_image.startsWith("http")
    //             ? university.cover_image
    //             : `${process.env.NEXT_PUBLIC_NORMPLOV_API}${university.cover_image}`;
    //     }
    //     // Fallback to placeholder if `cover_image` is missing
    //     return "/assets/placeholder.png";
    // }, [university?.cover_image]);


    return (
        <section className="container mx-auto px-4 py-8">
            <ToastContainer />
            <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">

                <Image
                    src={
                        university?.cover_image
                            ? university.cover_image.startsWith("http")
                                ? university.cover_image // Full URL case
                                : `${process.env.NEXT_PUBLIC_NORMPLOV_API}${university.cover_image}` // Relative URL case
                            : "/assets/placeholder.png" // Fallback image
                    }
                    alt={`${university.en_name || "University"} Cover`}
                    width={1000}
                    height={500}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                />
                {/* <Avatar className="w-full h-72 overflow-hidden">
    <AvatarImage
        src={
            university?.cover_image
                ? university.cover_image.startsWith("http")
                    ? university.cover_image // Full URL case
                    : `${process.env.NEXT_PUBLIC_NORMPLOV_API}${university.cover_image}` // Relative URL case
                : "/assets/placeholder.png" // Fallback image
        }
        alt={`${university?.en_name || "University"} Cover`}
        width={1000}
        height={1000}
        loading="lazy" // Lazy load the image
        className="w-full h-full object-cover" // Scales and crops the image to fit the container like next/image
    />
    <AvatarFallback className="text-gray-700 flex items-center justify-center bg-gray-100">
        {university?.en_name?.[0]?.toUpperCase() || "?"}
    </AvatarFallback>
 </Avatar> */}


                <div className="p-6 flex flex-col md:flex-row gap-8 items-center">
                    <Avatar className="w-64 h-64">
                        <AvatarImage
                            width={1000}
                            height={1000}
                            src={
                                !university
                                    ?.logo_url
                                    ? "/assets/placeholder.png"
                                    : university.logo_url.startsWith("http")
                                        ? university.logo_url
                                        : `${process.env.NEXT_PUBLIC_NORMPLOV_API}${university.logo_url}`
                            }

                            alt={`${university?.en_name || "University"} Logo`}
                            className="w-full h-full object-container "
                        />
                        <AvatarFallback className="text-gray-700">
                            {university?.en_name?.[0]?.toUpperCase() || "?"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-textprimary">
                            {university.kh_name}
                        </h1>
                        <p className="text-2xl text-textprimary">{university.en_name}</p>
                        <div className="space-y-2 text-gray-700">
                            <p className="flex items-center gap-2">
                                <FaPhone className="text-gray-500" /> {university.phone}
                            </p>
                            <Link
                                href={`mailto:${university.email}`}
                                className="flex items-center gap-2 text-gray-500 hover:text-green-700"
                            >
                                <FaEnvelope className="text-gray-500" /> {university.email}
                            </Link>
                            <Link
                                href={university.website || "#"}
                                className="flex items-center gap-2 text-primary hover:text-green-700"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGlobe className="text-gray-500" />{" "}
                                {university.website || "Website not available"}
                            </Link>
                            <p className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-gray-500 text-lg" />{" "}
                                {university.location}
                            </p>
                            <Link
                                href={university.map_url || "#"}
                                className="flex items-center gap-2  hover:text-green-700"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaMapMarkedAlt className="text-gray-500" /> View On Map
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-textprimary mb-4">Description</h2>
                    <p className="text-gray-500">{university.description}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-textprimary mb-4">Vision</h2>
                    <p className="text-gray-500">{university.vision}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-textprimary mb-4">Mission</h2>
                    <p className="text-gray-500">{university.mission}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-textprimary mb-4">Location</h2>
                    {university.latitude && university.longitude ? (
                        <GoogleMapComponent
                            center={{ lat: university.latitude, lng: university.longitude }}
                        />
                    ) : (
                        <p className="text-gray-700">Map location not available</p>
                    )}
                </section>

                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-textprimary">
                            Faculties and Majors
                        </h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="bg-primary text-white hover:bg-green-700 hover:text-white"
                                >
                                    <FaPlus className="mr-2" />
                                    Add Faculty
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle className="text-textprimary">Add New Faculty</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="facultyName" className="text-right text-gray-600">
                                            Faculty Name
                                        </Label>
                                        <Input
                                            id="facultyName"
                                            className="col-span-3"
                                            placeholder="Enter Faculty name"
                                            value={newFacultyName}
                                            onChange={(e) => setNewFacultyName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="facultyDescription" className="text-right text-gray-600">
                                            Description
                                        </Label>
                                        <Input
                                            id="facultyDescription"
                                            className="col-span-3"
                                            placeholder="Enter Faculty description"
                                            value={newFacultyDescription}
                                            onChange={(e) => setNewFacultyDescription(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter className="text-right justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setNewFacultyName("");
                                            setNewFacultyDescription("");
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-primary text-white hover:bg-green-700"
                                        onClick={handleAddNewFaculty}
                                    >
                                        Add Faculty
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="space-y-8">
                        {university.faculties.map((faculty) => (
                            <Card key={faculty.uuid} className="w-full bg-white shadow-sm">
                                <CardHeader>
                                    {editingFaculty && editingFaculty.uuid === faculty.uuid ? (
                                        <div className="space-y-2">
                                            <Input
                                                value={editingFaculty.name}
                                                onChange={(e) =>
                                                    setEditingFaculty({
                                                        ...editingFaculty,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                            <Input
                                                value={editingFaculty.description}
                                                onChange={(e) =>
                                                    setEditingFaculty({
                                                        ...editingFaculty,
                                                        description: e.target.value,
                                                    })
                                                }
                                            />
                                            <Button onClick={() => handleEditFaculty(faculty)}
                                                className="bg-primary hover:bg-green-700">
                                                Save
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => setEditingFaculty(null)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <CardTitle className="text-2xl font-bold text-textprimary">
                                                {faculty.name}
                                            </CardTitle>
                                            <p className="text-gray-600">{faculty.description}</p>
                                            <div className="flex space-x-2 mt-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setEditingFaculty(faculty)}

                                                >
                                                    <FaEdit className="mr-2" /> Edit
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDeleteFaculty(faculty.uuid)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <FaTrash className="mr-2" /> Delete
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <h3 className="text-xl font-semibold text-textprimary mb-4">
                                        Majors:
                                    </h3>
                                    {faculty.majors.items.length > 0 ? (
                                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {faculty.majors.items.map((major) => (
                                                <Card key={major.uuid} className="bg-gray-50">
                                                    <CardHeader>
                                                        {editingMajor &&
                                                            editingMajor.uuid === major.uuid ? (
                                                            <div className="space-y-2">
                                                                <Input
                                                                    value={editingMajor.name}
                                                                    onChange={(e) =>
                                                                        setEditingMajor({
                                                                            ...editingMajor,
                                                                            name: e.target.value,
                                                                        })
                                                                    }
                                                                />
                                                                <Input
                                                                    value={editingMajor.description}
                                                                    onChange={(e) =>
                                                                        setEditingMajor({
                                                                            ...editingMajor,
                                                                            description: e.target.value,
                                                                        })
                                                                    }
                                                                />
                                                                <Input
                                                                    type="number"
                                                                    value={editingMajor.fee_per_year}
                                                                    onChange={(e) =>
                                                                        setEditingMajor({
                                                                            ...editingMajor,
                                                                            fee_per_year: Number(e.target.value),
                                                                        })
                                                                    }
                                                                />
                                                                <Input
                                                                    type="number"
                                                                    value={editingMajor.duration_years}
                                                                    onChange={(e) =>
                                                                        setEditingMajor({
                                                                            ...editingMajor,
                                                                            duration_years: Number(e.target.value),
                                                                        })
                                                                    }
                                                                />
                                                                <div className="flex items-center justify-between space-x-2">
                                                                    <label htmlFor="degree" className="text-sm font-medium">
                                                                        Degree:
                                                                    </label>
                                                                    <select
                                                                        id="degree"
                                                                        name="degree"
                                                                        value={newMajor.degree}
                                                                        onChange={handleInputChange}
                                                                        className="border border-gray-300 rounded-md px-3 py-2 w-48 text-sm focus:outline-none focus:ring-1 "
                                                                    >
                                                                        <option value="ASSOCIATE">Associate</option>
                                                                        <option value="BACHELOR">Bachelor</option>
                                                                        <option value="MASTER">Master</option>
                                                                        <option value="PHD">PhD</option>
                                                                    </select>
                                                                </div>

                                                                <div className="flex justify-between gap-4 my-3">

                                                                    <Button
                                                                        variant="outline"
                                                                        onClick={() => setEditingMajor(null)}
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                    <Button onClick={() => handleEditMajor(major)}
                                                                        className="bg-primary hover:bg-green-700">
                                                                        Save
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <CardTitle className="text-lg font-medium text-gray-800">
                                                                    {major.name}
                                                                </CardTitle>
                                                                <p className="text-sm text-gray-600">
                                                                    {major.description}
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    {major.degree} - {major.duration_years} years
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    Fee per year: ${major.fee_per_year}
                                                                </p>
                                                                <div className="flex space-x-2 mt-2">
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => setEditingMajor(major)}
                                                                    >
                                                                        <FaEdit className="mr-2" /> Edit
                                                                    </Button>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => {
                                                                            if (!major.is_recommended) {
                                                                                handleDeleteMajor(major.uuid)
                                                                            } else {
                                                                                toast.error("This major is recommended cannot be deleted")
                                                                            }

                                                                        }

                                                                        }
                                                                        className="text-red-500 hover:text-red-700"
                                                                    >
                                                                        <FaTrash className="mr-2" /> Delete
                                                                    </Button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </CardHeader>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-600">
                                            No majors available for this faculty.
                                        </p>
                                    )}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="mt-4 w-full"
                                            >
                                                <FaPlus className="mr-2 h-4 w-4" />
                                                Add Major
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Add New Major to {faculty.name}
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="majorName" className="text-right">
                                                        Major Name
                                                    </Label>
                                                    <Input
                                                        id="majorName"
                                                        className="col-span-3"
                                                        placeholder="Enter Major name"
                                                        value={newMajor.name}
                                                        onChange={(e) =>
                                                            setNewMajor({ ...newMajor, name: e.target.value })
                                                        }
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label
                                                        htmlFor="majorDescription"
                                                        className="text-right"
                                                    >
                                                        Description
                                                    </Label>
                                                    <Input
                                                        id="majorDescription"
                                                        className="col-span-3"
                                                        placeholder="Enter Major description"
                                                        value={newMajor.description}
                                                        onChange={(e) =>
                                                            setNewMajor({
                                                                ...newMajor,
                                                                description: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="feePerYear" className="text-right">
                                                        Fee per Year
                                                    </Label>
                                                    <Input
                                                        id="feePerYear"
                                                        className="col-span-3"
                                                        type="number"
                                                        placeholder="Enter fee per year"
                                                        value={newMajor.fee_per_year}
                                                        onChange={(e) =>
                                                            setNewMajor({
                                                                ...newMajor,
                                                                fee_per_year: Number(e.target.value),
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="durationYears" className="text-right">
                                                        Duration (Years)
                                                    </Label>
                                                    <Input
                                                        id="durationYears"
                                                        className="col-span-3"
                                                        type="number"
                                                        placeholder="Enter duration in years"
                                                        value={newMajor.duration_years}
                                                        onChange={(e) =>
                                                            setNewMajor({
                                                                ...newMajor,
                                                                duration_years: Number(e.target.value),
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between space-x-2">
                                                    <Label htmlFor="degree" className="text-sm font-medium">
                                                        Degree:
                                                    </Label>
                                                    <select
                                                        id="degree"
                                                        name="degree"
                                                        value={newMajor.degree}
                                                        onChange={handleInputChange}
                                                        className="border border-gray-300 rounded-md px-3 py-2 w-48 text-sm focus:outline-none focus:ring-1 "
                                                    >
                                                        <option value="ASSOCIATE">Associate</option>
                                                        <option value="BACHELOR">Bachelor</option>
                                                        <option value="MASTER">Master</option>
                                                        <option value="PHD">PhD</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button
                                                    variant="outline"
                                                    onClick={() =>
                                                        setNewMajor({
                                                            name: "",
                                                            description: "",
                                                            fee_per_year: 0,
                                                            duration_years: 0,
                                                            degree: "",
                                                            faculty_uuid: ""
                                                        })
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    className="bg-primary text-white hover:bg-grren-700"
                                                    onClick={() => {
                                                        setSelectedFaculty(faculty.uuid);
                                                        handleAddNewMajor();
                                                    }}
                                                >
                                                    Add Major
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default UniversityPage;