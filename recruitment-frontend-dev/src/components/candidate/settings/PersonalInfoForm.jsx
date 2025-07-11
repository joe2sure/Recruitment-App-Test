import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Camera, User2Icon } from "lucide-react";

export default function PersonalInfoForm() {
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const formData = new FormData();

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    // Append other fields here (you can link them to useState or refs for controlled inputs)

    try {
      const response = await fetch("/api/user-profile", {
        method: "POST", // or PUT
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      const result = await response.json();
      console.log("Saved successfully:", result);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="space-y-10 p-8 bg-purple-50 rounded-lg shadow-sm max-w-3xl mx-auto">
      {/* Profile Section */}
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer" onClick={handleImageClick}>
          <div className="w-20 h-20 rounded-full bg-purple-700 overflow-hidden flex items-center justify-center">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl text-white">
                <User2Icon size={30} />
              </span>
            )}
          </div>
          <div className="absolute top-0 right-0 bg-purple-900 w-6 h-6 rounded-full text-white text-xs flex items-center justify-center">
            <Camera size={12} />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Edna Paulina</h2>
          <p className="text-sm text-gray-500">Certified Nurse</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Name Section */}
        <div className="space-y-4">
          <Label className="block text-sm font-semibold text-gray-600">
            Name
          </Label>
          <div className="space-y-4">
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
          </div>
        </div>

        {/* Phone Number Section */}
        <div className="space-y-4">
          <Label className="block text-sm font-semibold text-gray-600">
            Phone Number
          </Label>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Country Code" />
              </SelectTrigger>
              <SelectContent className="bg-purple-50">
                <SelectItem value="+234">+234</SelectItem>
                <SelectItem value="+233">+233</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Mobile Number" />
          </div>
        </div>

        {/* Email Section */}
        <div className="space-y-4">
          <Label className="block text-sm font-semibold text-gray-600">
            Email Address
          </Label>
          <Input placeholder="Enter your email address" />
        </div>

        {/* Date of Birth Section */}
        <div className="space-y-4">
          <Label className="block text-sm font-semibold text-gray-600">
            Date of Birth
          </Label>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="DD" />
              </SelectTrigger>
              <SelectContent className="bg-purple-50">
                {Array.from({ length: 31 }, (_, i) => (
                  <SelectItem
                    key={i + 1}
                    value={String(i + 1).padStart(2, "0")}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent className="bg-purple-50">
                {Array.from({ length: 12 }, (_, i) => {
                  const month = String(i + 1).padStart(2, "0");
                  return (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="YYYY" />
              </SelectTrigger>
              <SelectContent className="bg-purple-50">
                {Array.from({ length: 50 }, (_, i) => {
                  const year = 2025 - i;
                  return (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Nationality Section */}
        <div className="space-y-4">
          <Label className="block text-sm font-semibold text-gray-600">
            Nationality
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-purple-50">
              <SelectItem value="nigeria">Nigeria</SelectItem>
              <SelectItem value="ghana">Ghana</SelectItem>
              <SelectItem value="kenya">Kenya</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gender Section */}
        <div className="space-y-4">
          <Label className="block text-sm font-semibold text-gray-600">
            Gender
          </Label>
          <RadioGroup defaultValue="male" className="flex gap-10">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="text-gray-600">
                Male
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female" className="text-gray-600">
                Female
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Export/Delete Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Your account, your data. Export a copy of the data in your
            DiamondViva Account:
          </p>
          <Button variant="outline" className="gap-2 text-purple-800">
            <Download className="w-4 h-4" /> Download
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Disclaimer: Account/Profile once deleted cannot be recovered
          </p>
          <Button variant="outline" className="gap-2 text-purple-800">
            <Trash2 className="w-4 h-4" /> Delete Account
          </Button>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4 justify-center flex">
        <Button
          className="rounded-md bg-purple-950 text-white px-10 py-3 text-base"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
