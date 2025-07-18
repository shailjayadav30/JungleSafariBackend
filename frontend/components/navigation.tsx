"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TreePine, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="  fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-bold text-xl"
          >
            <TreePine className="w-8 h-8 text-green-400" />
            Wild Safari
          </Link>

          {/* Desktop Navigation */}
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
            <Button
              asChild
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
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

        {/* Mobile Navigation */}
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
                <Button
                  asChild
                  variant="ghost"
                  className="text-white hover:bg-white/20 justify-start"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="bg-amber-600 hover:bg-amber-700 justify-start"
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
