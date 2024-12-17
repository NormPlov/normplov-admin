"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaEnvelope,
  FaGlobe,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaPlus,
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MajorCard from "@/app/Components/cards/MajorCard";
import { UniversityType } from "@/types/types";
import { useUniversityDetailsQuery } from "@/app/redux/service/university";
import { useParams } from "next/navigation";

interface UniversityData {
  payload: UniversityType;
}

const UniversityPage: React.FC = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data, isLoading, error } = useUniversityDetailsQuery(id || "");
  const university = data?.payload as UniversityType | undefined;
  const [faculty, setFaculty] = React.useState<string[]>([]);
  const [newFaculty, setNewFaculty] = React.useState("");
  const [selectedFaculty, setSelectedFaculty] = React.useState("");

  const handleAddFaculty = () => {
    if (newFaculty && !faculty.includes(newFaculty)) {
      setFaculty([...faculty, newFaculty]);
      setSelectedFaculty(newFaculty);
      setNewFaculty("");
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
    <div className="m-6">
      <div className="p-4 flex gap-8 items-center border border-gray-200 rounded-md">
        <Image
          src={logoUrl}
          alt={`${university.en_name} logo`}
          width={288}
          height={288}
          className="rounded-full w-72"
        />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-textprimary">
            {university.kh_name}
          </h1>
          <div className="text-textprimary flex flex-col gap-3">
            <p className="text-gray-400 text-2xl">{university.en_name}</p>
            <p className="flex items-center gap-2">
              <FaPhone /> {university.phone}
            </p>
            <Link
              href={`mailto:${university.email}`}
              className="flex items-center gap-2"
            >
              <FaEnvelope /> {university.email}
            </Link>
            <Link
              href={university.website || "#"}
              className="flex items-center gap-2"
            >
              <FaGlobe /> {university.website || "Website not available"}
            </Link>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt /> {university.location}
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkedAlt />{" "}
              <Link
                href={
                  university.map_url
                    ? `https://${university.map_url.replace(
                        /^https?:\/\//,
                        ""
                      )}`
                    : "#"
                }
                className="text-primary"
              >
                View on Map
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl text-textprimary font-bold py-4">Summary</h1>
        <p className="text-justify">{university.description}</p>
      </div>
      <div className="gap-8">
        <div>
          <h1 className="text-2xl text-textprimary font-bold py-4">Vision</h1>
          <p className="text-justify">{university.vision}</p>
        </div>
        <div>
          <h1 className="text-2xl text-textprimary font-bold py-4">Mission</h1>
          <p className="text-justify">{university.mission}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-textprimary font-bold py-4">Majors</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-primary text-white hover:bg-textprimary hover:text-white"
            >
              <FaPlus />
              Add Major
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Major</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  placeholder="Enter Major name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={selectedFaculty}
                  onValueChange={setSelectedFaculty}
                >
                  <SelectTrigger className="col-span-3 border border-grey-50 rounded-lg px-3 py-1 text-start text-sm">
                    <SelectValue placeholder="Select Faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {faculty.map((fac) => (
                        <SelectItem key={fac} value={fac}>
                          {fac}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <div className="p-2">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="text"
                          placeholder="Add new faculty"
                          value={newFaculty}
                          onChange={(e) => setNewFaculty(e.target.value)}
                          className="flex-grow"
                        />
                        <Button size="sm" onClick={handleAddFaculty}>
                          <FaPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Year
                </Label>
                <Input id="year" className="col-span-3" placeholder="4 years" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="degree" className="text-right">
                  Degree
                </Label>
                <Input
                  id="degree"
                  className="col-span-3"
                  placeholder="Bachelor"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button type="submit" className="bg-primary">
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <MajorCard />
    </div>
  );
};

export default UniversityPage;
