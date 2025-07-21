"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { logout } from "@/lib/store/features/auth/authSlice"; 
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TreePine, Menu, X, User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import ManageAcccount from "./ManageAccountmodel";

export default function Navigation() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isManageAccountOpen, setIsManageAccountOpen] = useState(false);


  const handleSignOut = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    setIsManageAccountOpen(false);
    console.log("Signed out");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-bold text-xl"
            >
              <TreePine className="w-8 h-8 text-green-400" />
              Wild Safari
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-white hover:text-green-400 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/safaris"
                className="text-white hover:text-green-400 transition-colors"
              >
                Safaris
              </Link>
              <Link
                href="/booking"
                className="text-white hover:text-green-400 transition-colors"
              >
                Book Now
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-green-400 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-green-400 transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {auth.isAuth ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 rounded-full border border-white/30"
                    >
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={() => setIsManageAccountOpen(true)}
                      className="cursor-pointer"
                    >
                      <Settings className="w-4 h-4 mr-2" /> Manage Account
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    asChild
                    variant="ghost"
                    className="text-white hover:bg-white/20 border border-white/30"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20">
              <div className="flex flex-col gap-4 mt-4">
                <Link
                  href="/"
                  className="text-white hover:text-green-400 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/safaris"
                  className="text-white hover:text-green-400 transition-colors"
                >
                  Safaris
                </Link>
                <Link
                  href="/booking"
                  className="text-white hover:text-green-400 transition-colors"
                >
                  Book Now
                </Link>
                <Link
                  href="/about"
                  className="text-white hover:text-green-400 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-white hover:text-green-400 transition-colors"
                >
                  Contact
                </Link>

                <div className="flex flex-col gap-2 mt-4">
                  {auth.isAuth ? (
                    <>
                      <Button
                        variant="ghost"
                        className="text-white hover:bg-white/20 justify-start"
                        onClick={() => setIsManageAccountOpen(true)}
                      >
                        <Settings className="w-4 h-4 mr-2" /> Manage Account
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-red-300 hover:bg-red-800/30 justify-start"
                        onClick={handleSignOut}
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        asChild
                        variant="ghost"
                        className="text-white hover:bg-white/20 justify-start border border-white/30"
                      >
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button
                        asChild
                        className="bg-green-600 hover:bg-green-700 justify-start"
                      >
                        <Link href="/register">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      <ManageAcccount isOpen={isManageAccountOpen} setIsOpen={setIsManageAccountOpen}/>
    </>
  );
}
