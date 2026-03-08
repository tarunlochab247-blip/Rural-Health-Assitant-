"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Search, Mic, AlertTriangle, Clock, Stethoscope, MapPin, ChevronRight, Loader2, Star, Calendar, User, Building2, Upload, X, ImageIcon, Camera } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    specialty: "General Physician",
    hospital: "District Hospital, Jaipur",
    experience: "15 years",
    rating: 4.8,
    reviews: 234,
    languages: ["Hindi", "English"],
    availableToday: true,
    nextSlot: "10:30 AM",
    consultationFee: "Free (Govt.)",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialty: "General Physician",
    hospital: "CHC Sanganer",
    experience: "8 years",
    rating: 4.6,
    reviews: 156,
    languages: ["Hindi", "English", "Rajasthani"],
    availableToday: true,
    nextSlot: "11:00 AM",
    consultationFee: "Free (Govt.)",
  },
  {
    id: 3,
    name: "Dr. Mohammed Ansari",
    specialty: "General Physician",
    hospital: "PHC Amber",
    experience: "12 years",
    rating: 4.7,
    reviews: 189,
    languages: ["Hindi", "Urdu", "English"],
    availableToday: false,
    nextSlot: "Tomorrow 9:00 AM",
    consultationFee: "Free (Govt.)",
  },
]

const mockAnalysis = {
  possibleConditions: [
    {
      name: "Viral Fever",
      probability: "High",
      description: "Common viral infection causing fever, body aches, and fatigue",
    },
    {
      name: "Common Cold",
      probability: "Medium",
      description: "Upper respiratory infection with congestion and mild fever",
    },
    {
      name: "Dengue Fever",
      probability: "Low",
      description: "Mosquito-borne illness - seek immediate medical attention if symptoms worsen",
    },
  ],
  recommendedSpecialist: "General Physician",
  urgencyLevel: "Moderate",
  urgencyColor: "bg-chart-4",
  recommendations: [
    "Stay hydrated and rest well",
    "Take paracetamol for fever (as directed)",
    "Monitor temperature every 4 hours",
    "Seek immediate care if fever exceeds 103°F",
  ],
}

function SymptomsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get("q") || ""
  
  const [symptoms, setSymptoms] = useState(initialQuery)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<typeof mockAnalysis | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<{ file: File; preview: string }[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    
    setUploadedImages((prev) => [...prev, ...newImages].slice(0, 5)) // Max 5 images
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

  useEffect(() => {
    if (initialQuery) {
      handleAnalyze()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAnalyze = () => {
    if (!symptoms.trim()) return
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleVoiceInput = () => {
    setIsListening(true)
    setTimeout(() => {
      setIsListening(false)
      setSymptoms("I have high fever since 2 days with body pain and headache")
    }, 2000)
  }

  const handleFindHospital = () => {
    router.push(`/hospitals?specialist=${encodeURIComponent(analysis?.recommendedSpecialist || "")}`)
  }

  const handleBookDoctor = (doctorId: number) => {
    router.push(`/book?doctor=${doctorId}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Page Header */}
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-foreground">
                Tell Us Your Problem
                <span className="mt-1 block text-2xl text-primary">अपनी समस्या बताएं</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We will help you find the right doctor
                <span className="block text-base">हम सही डॉक्टर खोजने में मदद करेंगे</span>
              </p>
            </div>

            {/* Symptom Input */}
            <Card className="mb-8 border-2">
              <CardContent className="p-6">
                {/* Voice Input - Primary action for low-literacy users */}
                <div className="mb-6">
                  <Button
                    size="lg"
                    variant={isListening ? "destructive" : "default"}
                    className="mb-3 h-16 w-full text-lg shadow-md"
                    onClick={handleVoiceInput}
                  >
                    <Mic className={`mr-3 h-7 w-7 ${isListening ? "animate-pulse" : ""}`} />
                    {isListening ? (
                      <span>Listening... | सुन रहे हैं...</span>
                    ) : (
                      <span>Tap to Speak | बोलने के लिए दबाएं</span>
                    )}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Speak in any language | किसी भी भाषा में बोलें
                  </p>
                </div>

                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-sm font-medium text-muted-foreground">OR Type | या लिखें</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-base font-semibold text-foreground">
                    Write your problem here | यहां अपनी समस्या लिखें
                  </label>
                  <Textarea
                    placeholder="Example: I have fever since 2 days...&#10;उदाहरण: मुझे 2 दिन से बुखार है..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="min-h-[100px] text-base"
                  />
                </div>

                {/* Image Upload Section */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Upload Photos (Optional)
                  </label>
                  <p className="mb-3 text-xs text-muted-foreground">
                    Upload photos of skin conditions, injuries, or reports for better AI analysis
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {/* Uploaded Images Preview */}
                    {uploadedImages.map((img, index) => (
                      <div 
                        key={index} 
                        className="relative h-24 w-24 overflow-hidden rounded-lg border-2 border-border"
                      >
                        <img
                          src={img.preview}
                          alt={`Uploaded ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-md transition-transform hover:scale-110"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    
                    {/* Upload Button */}
                    {uploadedImages.length < 5 && (
                      <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/30 bg-muted/30 transition-colors hover:border-primary hover:bg-muted/50">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Camera className="mb-1 h-6 w-6 text-primary" />
                        <span className="text-xs text-muted-foreground">Add Photo</span>
                      </label>
                    )}
                  </div>
                  
                  {uploadedImages.length > 0 && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg bg-secondary/10 p-2">
                      <ImageIcon className="h-4 w-4 text-secondary" />
                      <span className="text-xs text-muted-foreground">
                        {uploadedImages.length} photo{uploadedImages.length > 1 ? "s" : ""} attached - AI will analyze these along with your symptoms
                      </span>
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !symptoms.trim()}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing Symptoms...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Analyze Symptoms
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {analysis && (
              <div className="space-y-6">
                {/* Urgency Level */}
                <Card className="border-2 border-chart-4">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full ${analysis.urgencyColor}`}>
                      <AlertTriangle className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-foreground">Urgency Level:</span>
                        <Badge variant="outline" className="border-chart-4 text-chart-4">
                          {analysis.urgencyLevel}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on your symptoms, we recommend visiting a doctor within 24-48 hours
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Possible Conditions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5 text-primary" />
                      Possible Conditions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {analysis.possibleConditions.map((condition, index) => (
                      <div
                        key={condition.name}
                        className="flex items-start gap-4 rounded-lg border border-border p-4"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">{condition.name}</span>
                            <Badge
                              variant={condition.probability === "High" ? "default" : "outline"}
                              className={condition.probability === "High" ? "bg-chart-5" : ""}
                            >
                              {condition.probability} Probability
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{condition.description}</p>
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground">
                      Note: This is an AI-based assessment. Please consult a doctor for accurate diagnosis.
                    </p>
                  </CardContent>
                </Card>

                {/* Recommended Specialist */}
                <Card>
                  <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Stethoscope className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Recommended Specialist</p>
                        <p className="text-lg font-semibold text-foreground">{analysis.recommendedSpecialist}</p>
                      </div>
                    </div>
                    <Button onClick={handleFindHospital}>
                      <MapPin className="mr-2 h-4 w-4" />
                      Find More Hospitals
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Suggested Doctors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Suggested Doctors Near You
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Based on your symptoms, we recommend these {analysis.recommendedSpecialist}s
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockDoctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex gap-4">
                            <Avatar className="h-14 w-14 border-2 border-primary/20">
                              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {doctor.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                                {doctor.availableToday && (
                                  <Badge className="bg-secondary text-secondary-foreground">
                                    Available Today
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-primary">{doctor.specialty}</p>
                              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                                <Building2 className="h-3.5 w-3.5" />
                                {doctor.hospital}
                              </div>
                              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <Star className="h-4 w-4 fill-chart-4 text-chart-4" />
                                  <span className="font-medium text-foreground">{doctor.rating}</span>
                                  <span>({doctor.reviews} reviews)</span>
                                </span>
                                <span className="text-muted-foreground">|</span>
                                <span className="text-muted-foreground">{doctor.experience} exp.</span>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {doctor.languages.map((lang) => (
                                  <Badge key={lang} variant="outline" className="text-xs">
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-start gap-2 sm:items-end">
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">Next Available</p>
                              <p className="font-semibold text-secondary">{doctor.nextSlot}</p>
                            </div>
                            <p className="text-sm font-medium text-foreground">{doctor.consultationFee}</p>
                            <Button 
                              size="sm" 
                              onClick={() => handleBookDoctor(doctor.id)}
                              className="mt-1"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              Book Appointment
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-center pt-2">
                      <Button variant="outline" onClick={handleFindHospital}>
                        View All Doctors & Hospitals
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-secondary" />
                      Immediate Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysis.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                            {index + 1}
                          </div>
                          <span className="text-foreground">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function SymptomsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <SymptomsContent />
    </Suspense>
  )
}
