"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TreePine, Globe, Users, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-green-50">

      <section className="py-20 px-4 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-green-800">
          About Wild Safari
        </h1>
        <p className="text-lg text-gray-700 mb-12">
          At Wild Safari, we are passionate about connecting adventurers with the raw beauty of nature. Our mission is to create unforgettable safari experiences that blend thrill, education, and conservation.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-white shadow p-6 rounded-lg">
            <TreePine className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              We aim to provide sustainable safari adventures that not only offer life-changing memories but also contribute to the preservation of wildlife and local communities.
            </p>
          </div>

          <div className="bg-white shadow p-6 rounded-lg">
            <Globe className="w-8 h-8 text-amber-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Global Destinations</h3>
            <p className="text-gray-600">
              From the majestic plains of Africa to the dense Amazon rainforest, we offer a diverse range of safari packages tailored to every explorers dream.
            </p>
          </div>

          <div className="bg-white shadow p-6 rounded-lg">
            <Users className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Expert Team</h3>
            <p className="text-gray-600">
              Our guides and staff are seasoned professionals with deep knowledge of the wilderness, ensuring safety, insight, and authenticity in every journey.
            </p>
          </div>

          <div className="bg-white shadow p-6 rounded-lg">
            <Heart className="w-8 h-8 text-amber-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Commitment to Conservation</h3>
            <p className="text-gray-600">
              We actively support conservation efforts and collaborate with local communities to protect wildlife and preserve the natural world for future generations.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Button asChild size="lg" className="bg-green-700 hover:bg-green-800">
            <Link href="/safaris">Explore Our Safaris</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
