"use client";

import type React from "react";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, TreePine } from "lucide-react";
import axios from "axios";
import { API_URL } from "@/config";
import Swal from "sweetalert2";
export default function ContactPage() {
  const [formData, setFormData] = useState({
    FullName: "",
    email: "",
    phone: "",
    Subject: "",
    inquiryType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}api/contact/c`, {
        FullName: formData.FullName,
        email: formData.email,
        phone: formData.phone,
        Subject: formData.Subject,
        inquiryType: formData.inquiryType,
        message: formData.message,
      });

      console.log("Contact form submission:", response.data);
      Swal.fire({
        title: "Thank you for your message!",
        text: "We'll get back to you within 24 hours.",
        icon: "success",
        timer: 2000,
      });

      setFormData({
        FullName: "",
        email: "",
        phone: "",
        Subject: "",
        inquiryType: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Error",
        text: "There was a problem submitting your message. Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our safaris? Were here to help you plan your
              perfect adventure
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 ">
            {/* Contact Form */}
            <Card className="shadow-lg h-[42rem]">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we will get back to you as soon as
                  possible
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-0">
                <form onSubmit={handleSubmit} className="space-y-4 mb-0 pb-0">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.FullName}
                      onChange={(e) =>
                        setFormData({ ...formData, FullName: e.target.value })
                      }
                      required
                      className="h-12"
                    />
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
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Inquiry Type</Label>
                    <Select
                      value={formData.inquiryType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, inquiryType: value })
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select Inquiry Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAFARI_BOOKING">
                          Safari Booking
                        </SelectItem>
                        <SelectItem value="GENERAL_INFORMATION">
                          General Information
                        </SelectItem>
                        <SelectItem value="CUSTOM_SAFARI">
                          Custom Safari
                        </SelectItem>
                        <SelectItem value="GROUP_BOOKING">
                          Group Booking
                        </SelectItem>
                        <SelectItem value="CUSTOMER_SUPPORT">
                          Customer Support
                        </SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.Subject}
                      onChange={(e) =>
                        setFormData({ ...formData, Subject: e.target.value })
                      }
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your safari interests, travel dates, group size, or any specific questions..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full  h-12 bg-green-600 hover:bg-green-700 text-lg"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TreePine className="w-6 h-6 text-green-600" />
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">
                        Available 24/7 for emergencies
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-gray-600">info@wildsafari.com</p>
                      <p className="text-sm text-gray-500">
                        We respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Address</h3>
                      <p className="text-gray-600">
                        123 Adventure Street
                        <br />
                        Safari City, SC 12345
                      </p>
                      <p className="text-sm text-gray-500">
                        Visit our office for personalized planning
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Office Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      What is included in safari packages?
                    </h4>
                    <p className="text-sm text-gray-600">
                      All packages include accommodation, meals, transportation,
                      professional guides, and park fees. Specific inclusions
                      vary by package.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">
                      What should I pack for a safari?
                    </h4>
                    <p className="text-sm text-gray-600">
                      We provide a detailed packing list upon booking. Essential
                      items include comfortable clothing, sun protection, and
                      binoculars.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">
                      Are safaris suitable for children?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Many of our safaris are family-friendly. We offer special
                      rates for children and can customize experiences for
                      younger travelers.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">
                      What is your cancellation policy?
                    </h4>
                    <p className="text-sm text-gray-600">
                      We offer flexible cancellation policies. Full details are
                      provided during booking and vary by package and timing.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
