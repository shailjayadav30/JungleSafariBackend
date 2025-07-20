import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { API_URL } from "@/config";
import Swal from "sweetalert2";
import axios, { AxiosError } from "axios";


interface ChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

export default function ChangePassword({ isOpen, onClose, id }: ChangePasswordProps) {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passData, setPassData] = useState({
    currentpass: "",
    newpass: "",
    confirmpass: "",
  });

  const handleChange = (field: string, value: string) => {
    setPassData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdatePassword = async () => {
    if (!passData.currentpass || !passData.newpass || !passData.confirmpass) {
      Swal.fire({ title: "All fields are required", timer: 1500 });
      return;
    }

    if (passData.newpass !== passData.confirmpass) {
      Swal.fire({ title: "New password and confirm password do not match", timer: 1500 });
      return;
    }

    try {
      await axios.put(`${API_URL}api/auth/updatepass/${id}`, {
        currentpass: passData.currentpass,
        newpass: passData.newpass,
      });

      Swal.fire({ title: "Password updated successfully", timer: 1500 });
      onClose();
    } catch (err:unknown) {
        const error = err as AxiosError<{ message: string }>;
      Swal.fire({ title: "Failed to update password", text:error.response?.data?.message || "Unknown error", timer: 2000 });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">Change Password</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update your password below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {["currentpass", "newpass", "confirmpass"].map((field) => (
            <div key={field} className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-foreground font-medium">{field.replace("Pass", " Password")}</Label>
              <div className="col-span-3 relative">
                <Input
                  type={showPassword[field.toLowerCase() as keyof typeof showPassword] ? "text" : "password"}
                  placeholder={`Enter ${field.replace("Pass", "").toLowerCase()} password`}
                  value={passData[field as keyof typeof passData]}
                  onChange={(e) => handleChange(field as keyof typeof passData, e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      [field.toLowerCase()]: !prev[field.toLowerCase() as keyof typeof showPassword],
                    }))
                  }
                >
                  {showPassword[field.toLowerCase() as keyof typeof showPassword] ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleUpdatePassword}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Update Password
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
