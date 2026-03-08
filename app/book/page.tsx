"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { 
  CalendarDays, Clock, Building2, User, Phone, FileText,
  CheckCircle2, ChevronRight, AlertCircle
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const hospitals = [
  { id: "1", name: "District Government Hospital", departments: ["General Medicine", "Pediatrics", "Gynecology", "Surgery", "Orthopedics"] },
  { id: "2", name: "Primary Health Centre (PHC)", departments: ["General Medicine", "Maternal Health", "Vaccination"] },
  { id: "3", name: "Community Health Centre", departments: ["General Medicine", "Emergency", "Pediatrics", "Dental"] },
  { id: "4", name: "Sub-District Hospital", departments: ["General Medicine", "Surgery", "Gynecology", "Pediatrics", "ENT", "Eye"] },
]

const timeSlots = [
  { time: "09:00 AM", available: true },
  { time: "09:30 AM", available: true },
  { time: "10:00 AM", available: false },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: false },
  { time: "02:00 PM", available: true },
  { time: "02:30 PM", available: true },
  { time: "03:00 PM", available: true },
  { time: "03:30 PM", available: false },
  { time: "04:00 PM", available: true },
  { time: "04:30 PM", available: true },
]

const appointmentTypes = [
  { id: "consultation", label: "Doctor Consultation", description: "General checkup or follow-up" },
  { id: "test", label: "Lab Test", description: "Blood test, X-ray, etc." },
  { id: "vaccination", label: "Vaccination", description: "Routine immunization" },
  { id: "emergency", label: "Emergency", description: "Urgent medical attention" },
]

function BookingContent() {
  const searchParams = useSearchParams()
  const initialHospital = searchParams.get("hospital") || ""
  
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    hospital: initialHospital,
    department: "",
    appointmentType: "",
    date: undefined as Date | undefined,
    timeSlot: "",
    patientName: "",
    patientAge: "",
    patientPhone: "",
    patientAadhar: "",
    symptoms: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  const selectedHospital = hospitals.find(h => h.id === formData.hospital)

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsBooked(true)
    }, 2000)
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.hospital && formData.department && formData.appointmentType
      case 2:
        return formData.date && formData.timeSlot
      case 3:
        return formData.patientName && formData.patientAge && formData.patientPhone
      default:
        return true
    }
  }

  if (isBooked) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center bg-background py-8">
          <Card className="mx-4 max-w-lg text-center">
            <CardContent className="p-8">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Appointment Booked!</h2>
              <p className="mb-6 text-muted-foreground">
                Your appointment has been successfully scheduled
              </p>
              
              <div className="mb-6 space-y-3 rounded-lg bg-muted p-4 text-left">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking ID</span>
                  <span className="font-mono font-semibold">RHA-2024-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hospital</span>
                  <span className="font-medium">{selectedHospital?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department</span>
                  <span className="font-medium">{formData.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{formData.date?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">{formData.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Patient</span>
                  <span className="font-medium">{formData.patientName}</span>
                </div>
              </div>

              <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-left">
                <div className="flex gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800">Important Instructions</p>
                    <ul className="mt-1 text-sm text-yellow-700">
                      <li>Arrive 15 minutes before your appointment</li>
                      <li>Bring your Aadhar card and any previous reports</li>
                      <li>SMS confirmation will be sent to {formData.patientPhone}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                  Print Details
                </Button>
                <Button className="flex-1" onClick={() => window.location.href = "/"}>
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {/* Page Header */}
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-foreground">Book Appointment</h1>
              <p className="text-muted-foreground">
                Schedule your visit to a government hospital
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex flex-1 items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                        s < step
                          ? "bg-primary text-primary-foreground"
                          : s === step
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {s < step ? <CheckCircle2 className="h-5 w-5" /> : s}
                    </div>
                    {s < 4 && (
                      <div className={`h-1 flex-1 ${s < step ? "bg-primary" : "bg-muted"}`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Hospital</span>
                <span>Date & Time</span>
                <span>Patient Info</span>
                <span>Confirm</span>
              </div>
            </div>

            {/* Step 1: Select Hospital & Department */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Select Hospital & Service
                  </CardTitle>
                  <CardDescription>Choose where and what type of appointment you need</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Hospital</Label>
                    <Select
                      value={formData.hospital}
                      onValueChange={(value) => setFormData({ ...formData, hospital: value, department: "" })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        {hospitals.map((h) => (
                          <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.hospital && (
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) => setFormData({ ...formData, department: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedHospital?.departments.map((d) => (
                            <SelectItem key={d} value={d}>{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Appointment Type</Label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {appointmentTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                            formData.appointmentType === type.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setFormData({ ...formData, appointmentType: type.id })}
                        >
                          <p className="font-medium text-foreground">{type.label}</p>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Select Date & Time */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    Select Date & Time
                  </CardTitle>
                  <CardDescription>Choose your preferred appointment slot</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Label className="mb-2 block">Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => setFormData({ ...formData, date })}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        className="rounded-md border"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Select Time Slot</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            disabled={!slot.available}
                            className={`rounded-lg border p-3 text-sm transition-all ${
                              formData.timeSlot === slot.time
                                ? "border-primary bg-primary text-primary-foreground"
                                : slot.available
                                ? "border-border hover:border-primary"
                                : "cursor-not-allowed bg-muted text-muted-foreground line-through"
                            }`}
                            onClick={() => slot.available && setFormData({ ...formData, timeSlot: slot.time })}
                          >
                            <Clock className="mb-1 inline h-4 w-4" />
                            <span className="ml-1">{slot.time}</span>
                          </button>
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">
                        Slots marked with strikethrough are not available
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Patient Information */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Patient Information
                  </CardTitle>
                  <CardDescription>Enter the patient details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter patient name"
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Enter age"
                        value={formData.patientAge}
                        onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={formData.patientPhone}
                        onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aadhar">Aadhar Number (Optional)</Label>
                      <Input
                        id="aadhar"
                        placeholder="12-digit Aadhar number"
                        value={formData.patientAadhar}
                        onChange={(e) => setFormData({ ...formData, patientAadhar: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="symptoms">Brief Description of Problem</Label>
                    <Textarea
                      id="symptoms"
                      placeholder="Describe your symptoms or reason for visit..."
                      value={formData.symptoms}
                      onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Confirm Booking
                  </CardTitle>
                  <CardDescription>Review your appointment details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="mb-3 font-semibold text-foreground">Appointment Details</h4>
                      <div className="grid gap-3 text-sm sm:grid-cols-2">
                        <div>
                          <span className="text-muted-foreground">Hospital:</span>
                          <p className="font-medium">{selectedHospital?.name}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Department:</span>
                          <p className="font-medium">{formData.department}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Type:</span>
                          <p className="font-medium">
                            {appointmentTypes.find(t => t.id === formData.appointmentType)?.label}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Date & Time:</span>
                          <p className="font-medium">
                            {formData.date?.toLocaleDateString()} at {formData.timeSlot}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="mb-3 font-semibold text-foreground">Patient Details</h4>
                      <div className="grid gap-3 text-sm sm:grid-cols-2">
                        <div>
                          <span className="text-muted-foreground">Name:</span>
                          <p className="font-medium">{formData.patientName}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Age:</span>
                          <p className="font-medium">{formData.patientAge} years</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Phone:</span>
                          <p className="font-medium">{formData.patientPhone}</p>
                        </div>
                        {formData.patientAadhar && (
                          <div>
                            <span className="text-muted-foreground">Aadhar:</span>
                            <p className="font-medium">{formData.patientAadhar}</p>
                          </div>
                        )}
                      </div>
                      {formData.symptoms && (
                        <div className="mt-3">
                          <span className="text-muted-foreground">Symptoms:</span>
                          <p className="font-medium">{formData.symptoms}</p>
                        </div>
                      )}
                    </div>

                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <p className="text-sm text-foreground">
                        By confirming this booking, you agree to arrive 15 minutes before the appointment time.
                        Please carry your Aadhar card and any relevant medical documents.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </Button>
              {step < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                >
                  Continue
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <BookingContent />
    </Suspense>
  )
}
