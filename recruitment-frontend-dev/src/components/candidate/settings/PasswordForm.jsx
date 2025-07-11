import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function PasswordForm() {
  return (
    <form
      className="space-y-8 p-6 bg-purple-50 rounded-lg shadow-sm max-w-3xl mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        // handle form submission here
      }}
    >
      {/* Current Password */}
      <div className="space-y-2">
        <Label
          htmlFor="currentPassword"
          className="block text-sm font-semibold text-gray-700"
        >
          Current Password
        </Label>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          placeholder="Enter current password"
          required
          className="rounded-md border-gray-200 shadow-sm focus:ring-[#6B46C1] focus:border-[#6B46C1] placeholder:text-gray-400"
        />
      </div>

      {/* New Password */}
      <div className="space-y-2">
        <Label
          htmlFor="newPassword"
          className="block text-sm font-semibold text-gray-700"
        >
          New Password
        </Label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Enter new password"
          required
          className="rounded-md border-gray-200 shadow-sm focus:ring-[#6B46C1] focus:border-[#6B46C1] placeholder:text-gray-400"
        />
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label
          htmlFor="confirmPassword"
          className="block text-sm font-semibold text-gray-700"
        >
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter new password"
          required
          className="rounded-md border-gray-200 shadow-sm focus:ring-[#6B46C1] focus:border-[#6B46C1] placeholder:text-gray-400"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          className="rounded-md border-gray-300 text-gray-700 hover:bg-gray-50 px-6"
          onClick={() => {}}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="rounded-md bg-purple-950 text-white px-6 hover:bg-purple-900 transition-colors"
        >
          Save
        </Button>
      </div>
    </form>
  );
}
