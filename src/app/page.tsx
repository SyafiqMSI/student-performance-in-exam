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

export default function Dashboard() {
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />{" "}
            {/* bingung wei mau isi apa */}
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
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Fuzzy Inference System</h1>
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
              <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Settings
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="model">Model</Label>
                    <Select>
                      <SelectTrigger
                        id="model"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="genesis">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Rabbit className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
                                <span className="font-medium text-foreground">
                                  Genesis
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                Our fastest model for general use cases.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="explorer">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Bird className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
                                <span className="font-medium text-foreground">
                                  Explorer
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                Performance and speed for efficiency.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="quantum">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Turtle className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
                                <span className="font-medium text-foreground">
                                  Quantum
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                The most powerful model for complex
                                computations.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input id="temperature" type="number" placeholder="0.4" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">Top P</Label>
                    <Input id="top-p" type="number" placeholder="0.7" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-k">Top K</Label>
                    <Input id="top-k" type="number" placeholder="0.0" />
                  </div>
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Messages
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="assistant">Assistant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" placeholder="You are a..." />
                  </div>
                </fieldset>
              </form>
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
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden flex-col items-start gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Params
                </legend>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
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
                    <Label htmlFor="ethnic-group">Ethnic Group</Label>
                    <Input
                      id="ethnic-group"
                      type="text"
                      placeholder="Enter Ethnic Group"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="parent-educ">Parent Education</Label>
                    <Input
                      id="parent-educ"
                      type="text"
                      placeholder="Enter Parent Education"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="lunch-type">Lunch Type</Label>
                    <Input
                      id="lunch-type"
                      type="text"
                      placeholder="Enter Lunch Type"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="test-prep">Test Preparation</Label>
                    <Input
                      id="test-prep"
                      type="text"
                      placeholder="Enter Test Preparation"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="parent-marital-status">
                      Parent Marital Status
                    </Label>
                    <Input
                      id="parent-marital-status"
                      type="text"
                      placeholder="Enter Parent Marital Status"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="practice-sport">Practice Sport</Label>
                    <Input
                      id="practice-sport"
                      type="text"
                      placeholder="Enter Practice Sport"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="is-first-child">Is First Child</Label>
                    <Select>
                      <SelectTrigger
                        id="is-first-child"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select Yes or No" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="nr-siblings">Number of Siblings</Label>
                    <Input
                      id="nr-siblings"
                      type="number"
                      placeholder="Enter Number of Siblings"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="transport-means">Transport Means</Label>
                    <Input
                      id="transport-means"
                      type="text"
                      placeholder="Enter Transport Means"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="wkly-study-hours">Weekly Study Hours</Label>
                    <Input
                      id="wkly-study-hours"
                      type="text"
                      placeholder="Enter Weekly Study Hours"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="math-score">Math Score</Label>
                    <Input
                      id="math-score"
                      type="number"
                      placeholder="Enter Math Score"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="reading-score">Reading Score</Label>
                    <Input
                      id="reading-score"
                      type="number"
                      placeholder="Enter Reading Score"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="writing-score">Writing Score</Label>
                    <Input
                      id="writing-score"
                      type="number"
                      placeholder="Enter Writing Score"
                    />
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge>
            <div className="flex-1" />
          </div>
        </main>
      </div>
    </div>
  );
}
