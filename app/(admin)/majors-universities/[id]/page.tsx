"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  useCreateMajorMutation,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
  useUpdateMajorMutation,
  useDeleteMajorMutation,
} from "@/app/redux/service/university";
import { useParams } from "next/navigation";
import GoogleMapComponent from "@/app/Components/map/GoogleMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Major {
  uuid: string;
  name: string;
  description: string;
  fee_per_year: number;
  duration_years: number;
  degree: string;
}

interface Faculty {
  uuid: string;
  name: string;
  description: string;
  majors: {
    items: Major[];
    metadata: {
      page: number;
      page_size: number;
      total_items: number;
      total_pages: number;
    };
  };
}

interface UniversityType {
  uuid: string;
  kh_name: string;
  en_name: string;
  type: string;
  popular_major: string;
  logo_url: string;
  cover_image: string;
  location: string;
  phone: string;
  lowest_price: number;
  highest_price: number;
  map_url: string;
  latitude: number;
  longitude: number;
  email: string;
  website: string;
  description: string;
  mission: string;
  vision: string;
  faculties: Faculty[];
}

const UniversityPage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data, isLoading, error } = useUniversityDetailsQuery(id || "");
  const university = data?.payload as UniversityType | undefined;

  const [newFacultyName, setNewFacultyName] = useState("");
  const [newFacultyDescription, setNewFacultyDescription] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [newMajor, setNewMajor] = useState({
    name: "",
    description: "",
    fee_per_year: 0,
    duration_years: 0,
    degree: "",
  });

  const [createFaculty] = useCreateFacultyMutation();
  const [createMajor] = useCreateMajorMutation();
  const [updateFaculty] = useUpdateFacultyMutation();
  const [deleteFaculty] = useDeleteFacultyMutation();
  const [updateMajor] = useUpdateMajorMutation();
  const [deleteMajor] = useDeleteMajorMutation();

  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [editingMajor, setEditingMajor] = useState<Major | null>(null);

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
      } catch (error) {
        console.error("Failed to create faculty:", error);
      }
    }
  };

  const handleAddNewMajor = async () => {
    if (newMajor.name && selectedFaculty) {
      try {
        await createMajor({
          ...newMajor,
          faculty_id: selectedFaculty,
        }).unwrap();
        setNewMajor({
          name: "",
          description: "",
          fee_per_year: 0,
          duration_years: 0,
          degree: "",
        });
        setSelectedFaculty("");
      } catch (error) {
        console.error("Failed to create major:", error);
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
        setEditingFaculty(null);
      } catch (error) {
        console.error("Failed to update faculty:", error);
      }
    }
  };

  const handleDeleteFaculty = async (id: string) => {
    if (confirm("Are you sure you want to delete this faculty?")) {
      try {
        await deleteFaculty(id).unwrap();
      } catch (error) {
        console.error("Failed to delete faculty:", error);
      }
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
      } catch (error) {
        console.error("Failed to update major:", error);
      }
    }
  };

  const handleDeleteMajor = async (id: string) => {
    if (confirm("Are you sure you want to delete this major?")) {
      try {
        await deleteMajor(id).unwrap();
      } catch (error) {
        console.error("Failed to delete major:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {(error as any)?.data?.message ||
          "An error occurred while fetching university details."}
      </div>
    );
  }

  const logoUrl = university.logo_url
    ? `${process.env.NEXT_PUBLIC_NORMPLOV_API || ""}${university.logo_url}`
    : "/placeholder.svg?height=288&width=288";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="p-6 flex flex-col md:flex-row gap-8 items-center">
          <Image
            src={logoUrl}
            alt={`${university.en_name} logo`}
            width={288}
            height={288}
            className="w-72 rounded-lg"
          />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">
              {university.kh_name}
            </h1>
            <p className="text-2xl text-gray-600">{university.en_name}</p>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <FaPhone className="text-gray-500" /> {university.phone}
              </p>
              <Link
                href={`mailto:${university.email}`}
                className="flex items-center gap-2 hover:text-blue-600"
              >
                <FaEnvelope className="text-gray-500" /> {university.email}
              </Link>
              <Link
                href={university.website || "#"}
                className="flex items-center gap-2 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe className="text-gray-500" />{" "}
                {university.website || "Website not available"}
              </Link>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500" />{" "}
                {university.location}
              </p>
              <Link
                href={university.map_url || "#"}
                className="flex items-center gap-2 hover:text-blue-600"
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
          <p className="text-gray-700">{university.description}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Vision</h2>
          <p className="text-gray-700">{university.vision}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mission</h2>
          <p className="text-gray-700">{university.mission}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
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
            <h2 className="text-2xl font-bold text-gray-800">
              Faculties and Majors
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  <FaPlus className="mr-2" />
                  Add Faculty
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Faculty</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="facultyName" className="text-right">
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
                    <Label htmlFor="facultyDescription" className="text-right">
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
                <DialogFooter>
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
                    className="bg-blue-600 text-white hover:bg-blue-700"
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
              <Card key={faculty.uuid} className="w-full bg-white shadow-lg">
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
                      <Button onClick={() => handleEditFaculty(faculty)}>
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
                      <CardTitle className="text-2xl font-bold text-gray-800">
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
                        >
                          <FaTrash className="mr-2" /> Delete
                        </Button>
                      </div>
                    </>
                  )}
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
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
                                <Input
                                  value={editingMajor.degree}
                                  onChange={(e) =>
                                    setEditingMajor({
                                      ...editingMajor,
                                      degree: e.target.value,
                                    })
                                  }
                                />
                                <Button onClick={() => handleEditMajor(major)}>
                                  Save
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => setEditingMajor(null)}
                                >
                                  Cancel
                                </Button>
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
                                    onClick={() =>
                                      handleDeleteMajor(major.uuid)
                                    }
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
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="degree" className="text-right">
                            Degree
                          </Label>
                          <Input
                            id="degree"
                            className="col-span-3"
                            placeholder="Enter degree type"
                            value={newMajor.degree}
                            onChange={(e) =>
                              setNewMajor({
                                ...newMajor,
                                degree: e.target.value,
                              })
                            }
                          />
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
                            })
                          }
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-blue-600 text-white hover:bg-blue-700"
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
    </div>
  );
};

export default UniversityPage;
