"use client";
import Image from "next/image";
import React from "react";
import RUPP from "@/public/rupp.jpg";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import MajorCard from "@/app/Components/cards/MajorCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";

const Datail = () => {
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

  return (
    <div className="m-6">
      <div className="p-4 flex gap-8 items-center border border-gray-200 rounded-md">
        <Image src={RUPP} alt="logo" className="rounded-full w-72" />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-textprimary">
            សកលវិទ្យាល័យភូមិន្ទភ្នំពេញ
          </h1>
          <div className="text-textprimary flex flex-col gap-3">
            <p className="text-gray-400 text-2xl">
              Royal University of Phnom Penh
            </p>
            <p className="flex items-center gap-2">
              <FaPhone /> 012 345 678
            </p>
            <Link
              href={"mailto:info@example.com"}
              className="flex items-center gap-2"
            >
              <FaEnvelope /> info@example.com
            </Link>
            <Link href={"www.example.com"} className="flex items-center gap-2">
              <FaGlobe /> www.example.com
            </Link>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt /> Phnom Penh, Cambodia
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkedAlt />{" "}
              <Link
                href={"https://maps.app.goo.gl/tgLR9h6p7pR6W3XV7"}
                className="text-primary"
              >
                https://maps.app.goo.gl/tgLR9h6p7pR6W3XV7
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl text-textprimary font-bold py-4">Summary</h1>
        <p className="text-justify	">
          The Royal University of Phnom Penh (RUPP), founded in 1960, has
          undergone a series of transformations to become the leading national
          university in Cambodia. Other transformations are still happening. In
          the last five years, for example, Rupp has made considerable
          progresses in many areas including organizational structure,
          institutional governance, capacity building, infrastructure
          development, research, teaching and learning, curriculum development,
          and quality assurance. These achievements have encouraged RUPP
          management and faculty to strive harder to implement the institutional
          reform and achieve development goals. Looking towards the future, Rupp
          will grasp opportunities and assume a key role in driving Cambodia’s
          socio-economic development through the creation of human capital and
          the provision of quality research, training and community service.
          Rupp aspires to contribute to the achievement of the 2030 and 2050
          national development goals of the Royal Government of Cambodia as well
          as the higher education vision of the Ministry of Education, Youth,
          and Sport. Against this backdrop, this Strategic Plan 2019-2023 has
          been developed to guide Rupp in realizing its development vision and
          goals for the next five years. It will serve as a roadmap for the
          university to orient its focus and for its sub-units to devise their
          own action plans accordingly. The strategic plan will move Rupp closer
          to assuming its place among other national universities in the ASEAN
          region as a center for intellectual and cultural development.
        </p>
      </div>
      <div className=" gap-8">
        <div>
          <h1 className="text-2xl text-textprimary font-bold py-4">Vision</h1>
          <p className="text-justify	">
            To be Cambodia’s flagship university with regional standing in
            teaching and learning, research and innovation, and social
            engagement.
          </p>
        </div>
        <div>
          <h1 className="text-2xl text-textprimary font-bold py-4">Mission</h1>
          <p className="text-justify	">
            To contribute to national, regional, and global sustainable
            development and the preservation of national cultural and natural
            heritage by equipping our students with the essential knowledge,
            skills, values, and attitudes required by the information- and
            knowledge-based society; providing high quality research and
            innovation; and being actively engaged with society.
          </p>
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
                  value="Royal University of Phnom Penh"
                  className="col-span-3"
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
                      {/* <SelectLabel>Faculties</SelectLabel> */}
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

export default Datail;
