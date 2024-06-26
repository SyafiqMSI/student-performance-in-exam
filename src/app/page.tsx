"use client";

import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Student Scores",
    },
  },
};

export default function Dashboard() {
  const [data, setData] = useState();
  const [formData, setFormData] = useState({
    gender: "",
    ethnicGroup: "",
    parentEducation: "",
    lunchType: "",
    testPrep: "",
    parentMaritalStatus: "",

    isFirstChild: "",
    nrSiblings: "",
  });
  const [predictedPerformance, setPredictedPerformance] = useState(null);

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/submit",
        formData
      );
      setPredictedPerformance(response.data.predictedPerformance);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="grid h-screen w-full pl-[56px] overflow-hidden">
      <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Settings"
                >
                  <Settings2 className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Settings
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Account"
                >
                  <SquareUser className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Account
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">
            Student Performance Dashboard
          </h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Settings className="size-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
                <DrawerDescription>
                  Configure the settings for the model and messages.
                </DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <Share className="size-3.5" />
            Share
          </Button>
        </header>
        <main className="grid flex-1 gap-4 overflow-hidden p-4 md:grid-cols-[3fr_4fr] lg:grid-cols-[3fr_4fr]">
          <div className="relative flex flex-col items-start gap-8 overflow-auto">
            <form
              className="grid w-full items-start gap-6"
              onSubmit={handleSubmit}
            >
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Params
                </legend>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("gender", value)
                      }
                    >
                      <SelectTrigger
                        id="gender"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="ethnicGroup">Ethnic Group</Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("ethnicGroup", value)
                      }
                    >
                      <SelectTrigger
                        id="ethnicGroup"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select Ethnic Group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="group A">Group A</SelectItem>
                        <SelectItem value="group B">Group B</SelectItem>
                        <SelectItem value="group C">Group C</SelectItem>
                        <SelectItem value="group D">Group D</SelectItem>
                        <SelectItem value="group E">Group E</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="parentEducation">Parent Education</Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("parentEducation", value)
                      }
                    >
                      <SelectTrigger
                        id="parentEducation"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select Parent Education" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="some high school">
                          Some High School
                        </SelectItem>
                        <SelectItem value="high school">High School</SelectItem>
                        <SelectItem value="some college">
                          Some College
                        </SelectItem>
                        <SelectItem value="associate degree">
                          Associate Degree
                        </SelectItem>
                        <SelectItem value="bachelor degree">
                          Bachelor Degree
                        </SelectItem>
                        <SelectItem value="master degree">
                          Master Degree
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="lunchType">Lunch Type</Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("lunchType", value)
                      }
                    >
                      <SelectTrigger
                        id="lunchType"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select Lunch Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="free/reduced">
                          Free/Reduced
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="testPrep">Test Preparation</Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("testPrep", value)
                      }
                    >
                      <SelectTrigger
                        id="testPrep"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select Test Preparation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="parentMaritalStatus">
                      Parent Marital Status
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("parentMaritalStatus", value)
                      }
                    >
                      <SelectTrigger
                        id="parentMaritalStatus"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select Marital Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="isFirstChild">Is First Child</Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("isFirstChild", value)
                      }
                    >
                      <SelectTrigger
                        id="isFirstChild"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select Option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="nrSiblings">Number of Siblings</Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("nrSiblings", value)
                      }
                    >
                      <SelectTrigger
                        id="nrSiblings"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select Number" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="more than 5">More than 5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </fieldset>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
            {predictedPerformance !== null && (
              <div className="w-full">
                <h2 className="text-2xl font-semibold">
                  Predicted Performance
                </h2>
                <div className="mt-4">
                  <p>Gender: {formData.gender}</p>
                  <p>Ethnic Group: {formData.ethnicGroup}</p>
                  <p>Parent Education: {formData.parentEducation}</p>
                  <p>Lunch Type: {formData.lunchType}</p>
                  <p>Test Preparation: {formData.testPrep}</p>
                  <p>Parent Marital Status: {formData.parentMaritalStatus}</p>

                  <p>Is First Child: {formData.isFirstChild}</p>
                  <p>Number of Siblings: {formData.nrSiblings}</p>

                  <p>Predicted Score: {predictedPerformance}</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 overflow-hidden">
            <div className="relative flex-1 overflow-hidden">
              <div className="absolute inset-0 overflow-auto">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold">Performance Chart</h2>
                  {/* Add your chart component here */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
