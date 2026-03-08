"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  MapPin, Phone, Clock, Users, Navigation, Star, 
  Building2, Stethoscope, Filter, Search, CalendarPlus 
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const hospitals = [
  {
    id: 1,
    name: "District Government Hospital",
    type: "District Hospital",
    distance: "2.5 km",
    address: "Main Road, Near Bus Stand, Barabanki",
    phone: "05248-222333",
    timings: "24 Hours",
    departments: ["General Medicine", "Pediatrics", "Gynecology", "Surgery", "Orthopedics"],
    doctors: 45,
    beds: 200,
    rating: 4.2,
    rushLevel: "low",
    waitTime: "15-20 min",
    coordinates: { lat: 26.9282, lng: 81.1945 },
  },
  {
    id: 2,
    name: "Primary Health Centre (PHC)",
    type: "PHC",
    distance: "0.8 km",
    address: "Village Panchayat Office Road, Gram Panchayat",
    phone: "05248-223456",
    timings: "8:00 AM - 8:00 PM",
    departments: ["General Medicine", "Maternal Health", "Vaccination"],
    doctors: 5,
    beds: 10,
    rating: 4.0,
    rushLevel: "medium",
    waitTime: "30-45 min",
    coordinates: { lat: 26.9312, lng: 81.1875 },
  },
  {
    id: 3,
    name: "Community Health Centre",
    type: "CHC",
    distance: "5.2 km",
    address: "Block Headquarters, Tehsil Road",
    phone: "05248-224567",
    timings: "24 Hours",
    departments: ["General Medicine", "Emergency", "Pediatrics", "Dental"],
    doctors: 15,
    beds: 50,
    rating: 4.1,
    rushLevel: "high",
    waitTime: "60-90 min",
    coordinates: { lat: 26.9152, lng: 81.2105 },
  },
  {
    id: 4,
    name: "Sub-District Hospital",
    type: "Sub-District",
    distance: "8.7 km",
    address: "Tehsil Main Road, Rudauli",
    phone: "05248-225678",
    timings: "24 Hours",
    departments: ["General Medicine", "Surgery", "Gynecology", "Pediatrics", "ENT", "Eye"],
    doctors: 25,
    beds: 100,
    rating: 4.3,
    rushLevel: "low",
    waitTime: "20-30 min",
    coordinates: { lat: 26.8982, lng: 81.2345 },
  },
]

const rushColors = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
}

const rushLabels = {
  low: "Low Rush",
  medium: "Medium Rush",
  high: "High Rush",
}

function HospitalsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const specialist = searchParams.get("specialist") || ""
  
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null)

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.departments.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = filterType === "all" || hospital.type === filterType
    return matchesSearch && matchesType
  })

  const handleBookAppointment = (hospitalId: number) => {
    router.push(`/book?hospital=${hospitalId}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground">Find Government Hospitals</h1>
            <p className="text-muted-foreground">
              {specialist ? (
                <>Showing hospitals with <Badge variant="secondary">{specialist}</Badge> department</>
              ) : (
                "Locate nearest government hospitals and health centres"
              )}
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search hospitals or departments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="PHC">PHC</SelectItem>
                  <SelectItem value="CHC">CHC</SelectItem>
                  <SelectItem value="District Hospital">District Hospital</SelectItem>
                  <SelectItem value="Sub-District">Sub-District</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-5">
            {/* Hospital List */}
            <div className="space-y-4 lg:col-span-3">
              {filteredHospitals.map((hospital) => (
                <Card 
                  key={hospital.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${selectedHospital === hospital.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedHospital(hospital.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-foreground">{hospital.name}</h3>
                          <Badge variant="outline">{hospital.type}</Badge>
                          <div className="flex items-center gap-1">
                            <div className={`h-2 w-2 rounded-full ${rushColors[hospital.rushLevel as keyof typeof rushColors]}`} />
                            <span className="text-xs text-muted-foreground">
                              {rushLabels[hospital.rushLevel as keyof typeof rushLabels]}
                            </span>
                          </div>
                        </div>

                        <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {hospital.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Wait: {hospital.waitTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            {hospital.rating}
                          </span>
                        </div>

                        <p className="mb-3 text-sm text-muted-foreground">
                          <MapPin className="mr-1 inline h-3 w-3" />
                          {hospital.address}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {hospital.departments.slice(0, 4).map((dept) => (
                            <Badge key={dept} variant="secondary" className="text-xs">
                              {dept}
                            </Badge>
                          ))}
                          {hospital.departments.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{hospital.departments.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 sm:items-end">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            {hospital.doctors} Doctors
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Building2 className="h-4 w-4" />
                            {hospital.beds} Beds
                          </span>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleBookAppointment(hospital.id)
                          }}
                        >
                          <CalendarPlus className="mr-2 h-4 w-4" />
                          Book Appointment
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`tel:${hospital.phone}`}>
                            <Phone className="mr-2 h-4 w-4" />
                            {hospital.phone}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredHospitals.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Building2 className="mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="text-lg font-medium text-foreground">No hospitals found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Map Section */}
            <div className="lg:col-span-2">
              <Card className="sticky top-24">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                    Hospital Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                    {/* Simplified Map Visualization */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
                      {/* Map grid lines */}
                      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                      
                      {/* Roads */}
                      <div className="absolute left-1/4 top-0 h-full w-1 bg-gray-300" />
                      <div className="absolute left-0 top-1/3 h-1 w-full bg-gray-300" />
                      <div className="absolute left-0 top-2/3 h-1 w-full bg-gray-400" />
                      
                      {/* Hospital markers */}
                      {filteredHospitals.map((hospital, index) => {
                        const positions = [
                          { top: "20%", left: "30%" },
                          { top: "40%", left: "15%" },
                          { top: "60%", left: "60%" },
                          { top: "75%", left: "40%" },
                        ]
                        const pos = positions[index % positions.length]
                        const isSelected = selectedHospital === hospital.id
                        
                        return (
                          <button
                            key={hospital.id}
                            className={`absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all ${
                              isSelected 
                                ? "z-10 scale-125 bg-primary shadow-lg" 
                                : "bg-primary/80 hover:scale-110"
                            }`}
                            style={{ top: pos.top, left: pos.left }}
                            onClick={() => setSelectedHospital(hospital.id)}
                          >
                            <Building2 className="h-5 w-5 text-white" />
                          </button>
                        )
                      })}
                      
                      {/* User location */}
                      <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                        <div className="absolute h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                        <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                          <Navigation className="h-3 w-3 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Map Legend */}
                    <div className="absolute bottom-2 left-2 rounded-lg bg-white/90 p-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
                          <Navigation className="h-2 w-2 text-white" />
                        </div>
                        <span>Your Location</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                          <Building2 className="h-2 w-2 text-white" />
                        </div>
                        <span>Hospital</span>
                      </div>
                    </div>
                  </div>

                  {selectedHospital && (
                    <div className="mt-4 rounded-lg border border-border p-3">
                      <p className="font-medium text-foreground">
                        {hospitals.find(h => h.id === selectedHospital)?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {hospitals.find(h => h.id === selectedHospital)?.address}
                      </p>
                      <Button className="mt-2 w-full" size="sm">
                        <Navigation className="mr-2 h-4 w-4" />
                        Get Directions
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function HospitalsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <HospitalsContent />
    </Suspense>
  )
}
