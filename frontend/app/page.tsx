"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Clock,
  Camera,
  TelescopeIcon as Binoculars,
  TreePine,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/navigation";
import axios from "axios";
import { useEffect, useState } from "react";


type SafariPackage = {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  bestTime: string;
  highlights: string;  
  safariImage?: string;
};

export default function HomePage() {
   const [SafariPackages,setSafariPackages]=useState<SafariPackage[]>([])
           const url = process.env.NEXT_PUBLIC_URL;

   useEffect(()=>{
const getSafari=async()=>{
  try {
    // const response=await axios.get("http://localhost:4000/api/safari/all")
    const response=await axios.get(`${url}api/safari/all`)

    console.log("Safari",response.data)
    setSafariPackages(response.data.safari ?? [])
  } catch (error) {
    console.log("Failed to fetch safari",error)
  }
 }
   getSafari()
   },[])
 
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Jungle Safari"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Journey Awaits
            <span className="block text-amber-400">Discover Nature</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Set out on captivating safaris, uncover hidden gems of nature, and
            experience moments that bring you closer to the beauty of the
            planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-lg px-8 py-6"
            >
              <Link href="/safaris">Explore Safaris</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              <Link href="/booking">Book Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our Safaris?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the wild like never before with our expert guides and
              premium safari packages
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Binoculars className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Expert Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our experienced local guides know every trail and can spot
                  wildlife others might miss
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-amber-600" />
                </div>
                <CardTitle className="text-2xl">Photo Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Capture stunning wildlife photography with perfect positioning
                  and timing
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TreePine className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Eco-Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sustainable tourism that supports conservation and local
                  communities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Safaris */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Featured Safari Adventures
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular safari experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(SafariPackages) && SafariPackages.slice(0,3).map((safari) => (
              <Card
                key={safari.id}
                className="overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={safari.safariImage || "/placeholder.svg"}
                    alt={safari.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-amber-600">
                    {safari.price}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{safari.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {safari.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {safari.duration}
                    </span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col justify-between min-h-[200px]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{safari.rating}</span>
                    </div>
                    <span className="text-gray-500">
                      ({safari.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {safari.highlights.split(",").map((highlight, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    asChild
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Link href={`/booking?safari=${safari.id}`}>
                      Book This Safari
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/safaris">Show more Safaris</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Your Adventure?</h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of satisfied adventurers who have experienced the
            wild with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Link href="/register">Create Account</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-800 bg-transparent"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TreePine className="w-6 h-6 text-green-400" />
              Wild Safari
            </h3>
            <p className="text-gray-400">
              Your gateway to unforgettable jungle adventures and wildlife
              experiences.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/safaris" className="hover:text-white">
                  Safari Packages
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-white">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  African Safaris
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Amazon Tours
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Asian Wildlife
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Custom Tours
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@wildsafari.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Adventure St, Safari City</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Wild Safari. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
