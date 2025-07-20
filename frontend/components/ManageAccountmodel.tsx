import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ChangePassword from "./ChangePassword";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store/store";

interface ManageAccountProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function ManageAccount({ isOpen, setIsOpen }: ManageAccountProps) {
  const user = useSelector((state: Rootstate) => state.auth.user);
  const [showChangePassword, setShowChangePassword] = useState(false);

  if (!user) return null; // handle case if user is null

  const handleOpenChangePassword = () => {
    setIsOpen(false);
    setShowChangePassword(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] bg-stone-50 border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground text-xl font-bold">Manage Account</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Update your personal information.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <h3 className="text-foreground font-semibold text-lg border-b border-border pb-2">Personal Information</h3>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-foreground font-medium">Name</Label>
                <Input id="name" defaultValue={user.username} className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right text-foreground font-medium">Email</Label>
                <Input id="email" defaultValue={user.email} className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right text-foreground font-medium">Phone</Label>
                <Input id="phone" defaultValue={user.phone} className="col-span-3" />
              </div>

              <Button variant="outline" onClick={handleOpenChangePassword} className="mt-4 w-full">
                Change Password
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                console.log("Personal information updated");
                setIsOpen(false);
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ChangePassword
        isOpen={showChangePassword}
        onClose={() => {
          setShowChangePassword(false);
          setIsOpen(true);
        }}
        id={user.id}
      />
    </>
  );
}
