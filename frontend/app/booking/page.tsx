"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, MapPin, Clock, Star, TreePine } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { API_URL } from "@/config";
import axios from "axios";

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
  includes?: string[];
  image?: string;
};

export default function BookingPage() {
  const [selectedSafari, setSelectedSafari] = useState<string | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [safariPackages, setSafariPackages] = useState<SafariPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    adults: "2",
    children: "0",
    accommodation: "standard",
    specialRequests: "",
  });
        
  useEffect(() => {
    const getSafari = async () => {
      try {
        setLoading(true);
        setError(null);
      
        const response = await axios.get(`${API_URL}api/safari/all`);
        if (response.data?.safari && Array.isArray(response.data.safari)) {
          const transformedSafaris = response.data.safari.map(
            (safari: SafariPackage) => ({
              ...safari,
              image:
                safari.safariImage || "/placeholder.svg?height=300&width=400",
              includes: safari.highlights
                ? safari.highlights.split(", ").slice(0, 4) // Convert highlights to includes array
                : [
                    "Game drives",
                    "Professional guide",
                    "Transportation",
                    "Park fees",
                  ],
            })
          );
          setSafariPackages(transformedSafaris);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching safaris:", error);
        setError("Failed to load safari packages. Please try again.");
        setSafariPackages([]);
      } finally {
        setLoading(false);
      }
    };

    getSafari();
  }, []);

  const selectedPackage = safariPackages.find(
    (pkg) => pkg.id === selectedSafari
  );

  const adults = Number(formData.adults);
  const children = Number(formData.children);
  const basePrice = selectedPackage
    ? selectedPackage.price * adults + selectedPackage.price * 0.5 * children
    : 0;

  const accommodationFee =
    formData.accommodation === "luxury"
      ? basePrice * 0.3
      : formData.accommodation === "premium"
      ? basePrice * 0.15
      : 0;

  const totalPrice = basePrice + accommodationFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkInDate) {
      alert("Please select check-in date");
      return;
    }
    if (!selectedSafari) {
      alert("Please select a safari package");
      return;
    }

    try {

           const response = await axios.post(
        `${API_URL}api/booking/book`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phone,
          adults: adults,
          children: children,
          accommodationType: formData.accommodation.toUpperCase(), // Convert to enum format
          specialRequest: formData.specialRequests, 
          safariId: selectedSafari,
          checkInDate,
          totalPrice,
        },
        { withCredentials: true }
      );

      alert(
        "Booking submitted successfully! We'll contact you soon to confirm your safari adventure."
      );
      console.log("Response:", response.data);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        adults: "2",
        children: "0",
        accommodation: "standard",
        specialRequests: "",
      });
      setSelectedSafari(null);
      setCheckInDate(undefined);
    } catch (error) {
      console.error("Booking failed", error);
      alert("Booking failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
        <div className="pt-20 pb-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-xl">Loading safari packages...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
        <div className="pt-20 pb-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-xl text-red-600">{error}</div>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Book Your Safari Adventure
            </h1>
            <p className="text-xl text-gray-600">
              Choose your perfect safari experience and let us handle the rest
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Safari Booking Details
                  </CardTitle>
                  <CardDescription>
                    Fill in your information to reserve your spot
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Safari Selection */}
                    <div className="space-y-2">
                      <Label>Select Safari Package</Label>
                      <Select
                        value={selectedSafari || ""}
                        onValueChange={(value) => setSelectedSafari(value)}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Choose your safari adventure" />
                        </SelectTrigger>
                        <SelectContent>
                          {safariPackages.length > 0 ? (
                            safariPackages.map((pkg) => (
                              <SelectItem key={pkg.id} value={pkg.id}>
                                <div className="flex items-center gap-3">
                                  <div>
                                    <div className="font-semibold">
                                      {pkg.title}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {pkg.location} • {pkg.duration} • $
                                      {pkg.price}
                                    </div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-packages" disabled>
                              No safari packages available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Check-in Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full h-12 justify-start text-left font-normal bg-transparent"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {checkInDate
                                ? format(checkInDate, "PPP")
                                : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={checkInDate}
                              onSelect={setCheckInDate}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {/* Guests */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Adults</Label>
                        <Select
                          value={formData.adults}
                          onValueChange={(value) =>
                            setFormData({ ...formData, adults: value })
                          }
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} Adult{num > 1 ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Children (under 12)</Label>
                        <Select
                          value={formData.children}
                          onValueChange={(value) =>
                            setFormData({ ...formData, children: value })
                          }
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3, 4].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "Child" : "Children"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Accommodation */}
                    <div className="space-y-2">
                      <Label>Accommodation Type</Label>
                      <Select
                        value={formData.accommodation}
                        onValueChange={(value) =>
                          setFormData({ ...formData, accommodation: value })
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">
                            Standard (Included)
                          </SelectItem>
                          <SelectItem value="premium">
                            Premium (+15%)
                          </SelectItem>
                          <SelectItem value="luxury">Luxury (+30%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-2">
                      <Label htmlFor="requests">Special Requests</Label>
                      <Textarea
                        id="requests"
                        placeholder="Any dietary restrictions, accessibility needs, or special occasions..."
                        value={formData.specialRequests}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specialRequests: e.target.value,
                          })
                        }
                        className="min-h-[100px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-green-600 hover:bg-green-700 text-lg"
                      disabled={!selectedSafari || !checkInDate}
                    >
                      Book Safari Adventure
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              {selectedPackage && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <img
                        src={
                          selectedPackage.image ||
                          "/placeholder.svg?height=300&width=400"
                        }
                        alt={selectedPackage.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {selectedPackage.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {selectedPackage.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedPackage.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">
                            {selectedPackage.rating}
                          </span>
                        </div>
                        <Badge variant="secondary">
                          {selectedPackage.reviews} Reviews
                        </Badge>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Package Includes:</h4>
                      <ul className="space-y-1 text-sm">
                        {selectedPackage.includes?.map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Adults ({adults})</span>
                        <span>
                          ${(selectedPackage.price * adults).toLocaleString()}
                        </span>
                      </div>
                      {children > 0 && (
                        <div className="flex justify-between">
                          <span>Children ({children})</span>
                          <span>
                            $
                            {(
                              selectedPackage.price *
                              0.5 *
                              children
                            ).toLocaleString()}
                          </span>
                        </div>
                      )}
                      {accommodationFee > 0 && (
                        <div className="flex justify-between">
                          <span>Accommodation Upgrade</span>
                          <span>${accommodationFee.toLocaleString()}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>• Price is per person for adults</p>
                      <p>• Children under 12 get 50% discount</p>
                      <p>
                        • Final price may vary based on dates and availability
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TreePine className="w-5 h-5 text-green-600" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Our safari experts are here to help you plan the perfect
                    adventure.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>📞 +1 (555) 123-4567</div>
                    <div>📧 bookings@wildsafari.com</div>
                    <div>💬 Live chat available 24/7</div>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
