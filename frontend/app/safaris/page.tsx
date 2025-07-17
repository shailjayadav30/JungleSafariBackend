import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, MapPin, Clock, Users, Search, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/navigation";

export default function SafarisPage() {
  const safariPackages = [
    {
      id: 1,
      title: "African Big Five Safari",
      location: "Serengeti National Park, Tanzania",
      duration: "7 days",
      price: "$2,499",
      originalPrice: "$2,999",
      rating: 4.9,
      reviews: 127,
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Big Five", "Great Migration", "Luxury Camps"],
      difficulty: "Easy",
      groupSize: "2-12 people",
      bestTime: "Jun-Oct",
    },
    {
      id: 2,
      title: "Amazon Rainforest Adventure",
      location: "Amazon Basin, Brazil",
      duration: "5 days",
      price: "$1,899",
      originalPrice: "$2,299",
      rating: 4.8,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["River Cruise", "Wildlife Spotting", "Indigenous Culture"],
      difficulty: "Moderate",
      groupSize: "4-16 people",
      bestTime: "May-Sep",
    },
    {
      id: 3,
      title: "Borneo Orangutan Experience",
      location: "Sabah, Malaysia",
      duration: "4 days",
      price: "$1,299",
      originalPrice: "$1,599",
      rating: 4.7,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Orangutans", "Canopy Walk", "Night Safari"],
      difficulty: "Easy",
      groupSize: "2-10 people",
      bestTime: "Mar-Oct",
    },
    {
      id: 4,
      title: "Costa Rica Wildlife Safari",
      location: "Manuel Antonio, Costa Rica",
      duration: "6 days",
      price: "$1,799",
      originalPrice: "$2,199",
      rating: 4.6,
      reviews: 203,
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Sloths", "Monkeys", "Beach Access"],
      difficulty: "Easy",
      groupSize: "2-14 people",
      bestTime: "Dec-Apr",
    },
    {
      id: 5,
      title: "Indian Tiger Safari",
      location: "Ranthambore National Park, India",
      duration: "5 days",
      price: "$1,599",
      originalPrice: "$1,899",
      rating: 4.8,
      reviews: 178,
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Bengal Tigers", "Ancient Ruins", "Cultural Tours"],
      difficulty: "Moderate",
      groupSize: "4-12 people",
      bestTime: "Oct-Mar",
    },
    {
      id: 6,
      title: "Madagascar Lemur Adventure",
      location: "Andasibe-Mantadia, Madagascar",
      duration: "8 days",
      price: "$2,199",
      originalPrice: "$2,699",
      rating: 4.5,
      reviews: 94,
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Lemurs", "Unique Flora", "Baobab Trees"],
      difficulty: "Challenging",
      groupSize: "2-8 people",
      bestTime: "Apr-Nov",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      <Navigation />

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Safari Adventures
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated safari experiences across the
              globes most spectacular wildlife destinations
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search destinations..."
                    className="pl-10"
                  />
                </div>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3 days</SelectItem>
                    <SelectItem value="4-6">4-6 days</SelectItem>
                    <SelectItem value="7+">7+ days</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1500">Under $1,500</SelectItem>
                    <SelectItem value="1500-2500">$1,500 - $2,500</SelectItem>
                    <SelectItem value="over-2500">Over $2,500</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="challenging">Challenging</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Safari Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safariPackages.map((safari) => (
              <Card
                key={safari.id}
                className="overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={safari.image || "/placeholder.svg"}
                    alt={safari.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Badge className="bg-green-600 text-white">
                      Save $
                      {Number.parseInt(
                        safari.originalPrice.replace("$", "").replace(",", "")
                      ) -
                        Number.parseInt(
                          safari.price.replace("$", "").replace(",", "")
                        )}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/90">
                      {safari.difficulty}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{safari.title}</CardTitle>
                  <CardDescription className="space-y-2">
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="w-4 h-4" />
                      {safari.location}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {safari.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {safari.groupSize}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>

                <CardContent>
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
                    {safari.highlights.map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">
                          {safari.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {safari.originalPrice}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">per person</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Best time:</div>
                      <div className="text-sm font-semibold">
                        {safari.bestTime}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/safaris/${safari.id}`}>View Details</Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Link href={`/booking?safari=${safari.id}`}>
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Safaris
            </Button>
          </div>

          {/* Why Choose Us */}
          <section className="mt-20 py-16 px-8 bg-white rounded-2xl shadow-lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Why Choose Our Safaris?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Were committed to providing unforgettable wildlife experiences
                while supporting conservation efforts
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Guides</h3>
                <p className="text-gray-600">
                  Local wildlife experts with years of experience and deep
                  knowledge of animal behavior
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Premium Experience
                </h3>
                <p className="text-gray-600">
                  Carefully selected accommodations and exclusive access to the
                  best wildlife viewing spots
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Conservation Focus
                </h3>
                <p className="text-gray-600">
                  Supporting local communities and wildlife conservation through
                  responsible tourism practices
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
