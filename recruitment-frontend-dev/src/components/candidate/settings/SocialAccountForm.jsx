import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Facebook,
  Chrome,
  Linkedin,
  Twitter,
  Instagram,
  Briefcase,
} from "lucide-react";

/**
 * @typedef {Object} SocialConnections
 * @property {boolean} facebook
 * @property {boolean} google
 * @property {boolean} linkedin
 */

/**
 * @typedef {Object} SocialProfiles
 * @property {string} facebook
 * @property {string} twitter
 * @property {string} instagram
 * @property {string} workStatus
 */

const socialConnectionOptions = [
  {
    key: "facebook",
    label: "Facebook",
    icon: <Facebook className="w-4 h-4 text-white" />,
    bgColor: "bg-[#1877F2]",
  },
  {
    key: "google",
    label: "Google",
    icon: <Chrome className="w-4 h-4 text-white" />,
    bgColor: "bg-[#EA4335]",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: <Linkedin className="w-4 h-4 text-white" />,
    bgColor: "bg-[#0A66C2]",
  },
];

export default function SocialAccountForm() {
  const [socialConnections, setSocialConnections] = useState({
    facebook: false,
    google: true,
    linkedin: false,
  });
  const handleToggle = (platform) => {
    setSocialConnections((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  const [socialProfiles, setSocialProfiles] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    workStatus: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateUrl = (url, platform) => {
    if (!url) return true; // Empty URLs are valid (optional fields)

    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(url)) {
      return `Please enter a valid ${platform} URL starting with http:// or https://`;
    }
    return true;
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate social profile URLs
    const facebookValidation = validateUrl(socialProfiles.facebook, "Facebook");
    if (facebookValidation !== true) {
      newErrors.facebook = facebookValidation;
    }

    const twitterValidation = validateUrl(socialProfiles.twitter, "Twitter");
    if (twitterValidation !== true) {
      newErrors.twitter = twitterValidation;
    }

    const instagramValidation = validateUrl(
      socialProfiles.instagram,
      "Instagram"
    );
    if (instagramValidation !== true) {
      newErrors.instagram = instagramValidation;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setSocialProfiles((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log("Social Connections:", socialConnections);
      console.log("Social Profiles:", socialProfiles);

      // Example: Prepare payload for backend integration
      const _payload = {
        connections: socialConnections,
        profiles: socialProfiles,
      };

      // TODO: Integrate API call (e.g., via fetch/axios/posthog/etc.)
      // await api.updateSocialAccounts(payload);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Social accounts updated successfully");
    } catch (error) {
      console.error("Error updating social accounts:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSocialProfiles({
      facebook: "",
      twitter: "",
      instagram: "",
      workStatus: "",
    });
    setErrors({});
  };

  return (
    <div className="space-y-10 p-6 bg-purple-50 rounded-lg shadow-sm max-w-3xl mx-auto">
      {/* Linking Accounts */}
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          You can link your account with the following networks:
        </p>
        <div className="space-y-4">
          {socialConnectionOptions.map(({ key, label, icon, bgColor }) => {
            const isConnected = socialConnections[key];
            return (
              <div className="flex items-center justify-between" key={key}>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${bgColor}`}
                  >
                    {icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {label}
                  </span>
                </div>
                <button
                  onClick={() => handleToggle(key)}
                  className={`
                    relative inline-flex items-center h-6 w-12 rounded-full p-1
                    transition-colors duration-300 focus:outline-none
                    ${isConnected ? "bg-purple-700" : "bg-gray-300"}`}
                >
                  <span
                    className={`
                      inline-block h-5 w-5 rounded-full bg-white shadow
                      transform transition-transform duration-300
                      ${isConnected ? "translate-x-5" : "translate-x-0"}
                    `}
                  />
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4">
          <div className="w-1/2 space-y-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Facebook className="w-4 h-4 text-[#1877F2]" />
              </div>
              <Input
                name="facebook"
                aria-label="Facebook profile"
                placeholder="https://facebook.com/username"
                value={socialProfiles.facebook}
                onChange={(e) => handleInputChange("facebook", e.target.value)}
                className={`pl-10 rounded-md border-gray-200 shadow-sm focus:ring-primary focus:border-primary placeholder:text-gray-400 w-full ${
                  errors.facebook ? "border-error" : ""
                }`}
                disabled={isLoading}
              />
              {errors.facebook && (
                <p className="text-error text-xs mt-1">{errors.facebook}</p>
              )}
            </div>
          </div>
          <div className="w-1/2 space-y-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Twitter className="w-4 h-4 text-[#1DA1F2]" />
              </div>
              <Input
                name="twitter"
                aria-label="Twitter profile"
                placeholder="https://twitter.com/username"
                value={socialProfiles.twitter}
                onChange={(e) => handleInputChange("twitter", e.target.value)}
                className={`pl-10 rounded-md border-gray-200 shadow-sm focus:ring-primary focus:border-primary placeholder:text-gray-400 w-full ${
                  errors.twitter ? "border-error" : ""
                }`}
                disabled={isLoading}
              />
              {errors.twitter && (
                <p className="text-error text-xs mt-1">{errors.twitter}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2 space-y-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Instagram className="w-4 h-4 text-[#E4405F]" />
              </div>
              <Input
                name="instagram"
                aria-label="Instagram profile"
                placeholder="https://instagram.com/username"
                value={socialProfiles.instagram}
                onChange={(e) => handleInputChange("instagram", e.target.value)}
                className={`pl-10 rounded-md border-gray-200 shadow-sm focus:ring-primary focus:border-primary placeholder:text-gray-400 w-full ${
                  errors.instagram ? "border-error" : ""
                }`}
                disabled={isLoading}
              />
              {errors.instagram && (
                <p className="text-error text-xs mt-1">{errors.instagram}</p>
              )}
            </div>
          </div>
          <div className="w-1/2 space-y-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="w-4 h-4 text-primary" />
              </div>
              <Input
                name="workStatus"
                aria-label="Work status"
                placeholder="Are you currently working?"
                value={socialProfiles.workStatus}
                onChange={(e) =>
                  handleInputChange("workStatus", e.target.value)
                }
                className="pl-10 rounded-md border-gray-200 shadow-sm focus:ring-primary focus:border-primary placeholder:text-gray-400 w-full"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          className="rounded-md border-gray-300 text-gray-700 hover:bg-gray-50 px-6"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleSave}
          className="rounded-md bg-primary hover:bg-primary/90 text-white px-6"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
