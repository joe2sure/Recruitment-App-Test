// src/pages/LogoutPage.jsx
import { useState } from "react";
import LogoutModal from "@/components/LogoutModal";

export default function LogoutPage() {
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        window.location.href = "/login"; // redirect to login or home
      } else {
        alert("Failed to log out.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <LogoutModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onLogout={handleLogout}
    />
  );
}
