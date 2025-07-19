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
import { Star, MapPin, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/config";

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

export default function SafarisPage() {
  const [safaripackages, setSafariPackages] = useState<SafariPackage[]>([]);      

  useEffect(() => {
    const getSafari = async () => {
      try {
        
         const response = await axios.get(`${API_URL}api/safari/all`)
        console.log("Safari API Response", response.data);
        setSafariPackages(response.data.safari ?? []); // assuming API returns { safaris: [] }
      } catch (error) {
        console.error("Failed to fetch safaris", error);
      }
    };
    getSafari();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      <Navigation />

      <div className="pt-20 pb-12 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Safari Adventures
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Discover our carefully curated safari experiences across the globes most spectacular wildlife destinations.
        </p>

        {/* Safari Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(safaripackages) &&   safaripackages.map((safari) => (
            <Card key={safari.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative h-48">
                <Image
                  src={safari.safariImage || "/placeholder.svg"}
                  alt={safari.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{safari.title}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" /> {safari.location}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" /> {safari.duration}
                  <Users className="w-4 h-4 ml-4" /> Group tours available
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{safari.rating}</span>
                  <span className="text-gray-500">({safari.reviews} reviews)</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {safari.highlights.split(",").map((highlight, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {highlight.trim()}
                    </Badge>
                  ))}
                </div>

                <div className="text-lg font-bold text-green-600 mb-2">${safari.price.toFixed(2)}</div>

                <div className="text-sm text-gray-600 mb-4">
                  Best time to visit: <span className="font-medium">{safari.bestTime}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/safaris/${safari.id}`}>View Details</Link>
                  </Button>
                  <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 ">
                    <Link href={`/booking?safari=${safari.id}`}>Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
