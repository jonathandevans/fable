"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "../image-uploader";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function NewSiteForm() {
  const [imagePath, setImagePath] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Site Details
        </CardTitle>
        <CardDescription>
          Fill out the details for your new site. All of this can be changed
          later in the site settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-y-4">
        <form id="siteForm" className="grid gap-y-4">
          <input
            type="hidden"
            value={imagePath ? imagePath : ""}
            name="imagePath"
          />

          <div className="grid gap-y-2">
            <Label>Site Name</Label>
            <Input />
          </div>
          <div className="grid gap-y-2">
            <Label>Slug</Label>
            <Input />
          </div>
          <div className="grid gap-y-2">
            <Label>Site Description</Label>
            <Textarea />
          </div>
          <div className="grid gap-y-2">
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Public</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Private</Label>
              </div>
            </RadioGroup>
          </div>
        </form>
        <div className="grid gap-y-2">
          <Label>Site Image</Label>
          <ImageUploader setParentState={setImagePath} />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" form="siteForm">
          Create Site
        </Button>
      </CardFooter>
    </Card>
  );
}
