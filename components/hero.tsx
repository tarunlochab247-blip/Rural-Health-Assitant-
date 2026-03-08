"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Mic, Stethoscope, Thermometer, Heart, Pill, Brain, Activity } from "lucide-react"

const quickSymptoms = [
  { icon: Thermometer, label: "Fever", hindi: "बुखार", color: "bg-red-500" },
  { icon: Activity, label: "Cough", hindi: "खांसी", color: "bg-orange-500" },
  { icon: Pill, label: "Stomach Pain", hindi: "पेट दर्द", color: "bg-yellow-500" },
  { icon: Brain, label: "Headache", hindi: "सिरदर्द", color: "bg-purple-500" },
  { icon: Heart, label: "Chest Pain", hindi: "सीने में दर्द", color: "bg-pink-500" },
  { icon: Stethoscope, label: "Breathing Problem", hindi: "साँस की समस्या", color: "bg-blue-500" },
]

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/symptoms?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleQuickSymptom = (symptom: string) => {
    router.push(`/symptoms?q=${encodeURIComponent(symptom)}`)
  }

  const handleVoiceInput = () => {
    setIsListening(true)
    // Simulate voice input
    setTimeout(() => {
      setIsListening(false)
      setSearchQuery("I have fever and headache")
    }, 2000)
  }

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-base font-medium text-primary">
            <Heart className="h-5 w-5" />
            <span>Free Health Help | मुफ्त स्वास्थ्य सहायता</span>
          </div>

          {/* Title - Larger and clearer */}
          <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Tell Us Your Problem
            <span className="mt-2 block text-primary">अपनी समस्या बताएं</span>
          </h1>

          {/* Subtitle - Simpler language */}
          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            We will tell you which doctor to see and which hospital is nearby
            <span className="mt-1 block text-base">हम बताएंगे कौन से डॉक्टर से मिलें और कौन सा अस्पताल पास में है</span>
          </p>

          {/* Voice Button - Large and prominent for easier use */}
          <div className="mx-auto mb-6 max-w-2xl">
            <Button
              size="lg"
              variant={isListening ? "destructive" : "default"}
              className="mb-4 h-20 w-full max-w-md text-xl shadow-lg"
              onClick={handleVoiceInput}
            >
              <Mic className={`mr-3 h-8 w-8 ${isListening ? "animate-pulse" : ""}`} />
              {isListening ? (
                <span>Listening... | सुन रहे हैं...</span>
              ) : (
                <span>Tap to Speak | बोलने के लिए दबाएं</span>
              )}
            </Button>
            
            <p className="mb-4 text-base font-medium text-muted-foreground">
              OR type below | या नीचे लिखें
            </p>

            {/* Search Bar - Larger */}
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Type your problem here... | यहां अपनी समस्या लिखें..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="h-16 pl-14 pr-4 text-lg"
                />
              </div>
              <Button 
                size="lg" 
                className="h-14 text-lg font-semibold shadow-md" 
                onClick={handleSearch}
                disabled={!searchQuery.trim()}
              >
                <Search className="mr-2 h-5 w-5" />
                Find Solution | समाधान खोजें
              </Button>
            </div>
          </div>

          {/* Quick Symptoms - Larger buttons with colors */}
          <div className="mx-auto max-w-4xl">
            <p className="mb-5 text-lg font-semibold text-foreground">
              Or tap your problem below | या नीचे अपनी समस्या चुनें
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
              {quickSymptoms.map((symptom) => (
                <Button
                  key={symptom.label}
                  variant="outline"
                  className="h-auto flex-col gap-2 rounded-2xl border-2 bg-card px-4 py-5 shadow-sm transition-all hover:scale-105 hover:border-primary hover:shadow-md"
                  onClick={() => handleQuickSymptom(symptom.label)}
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-full ${symptom.color}`}>
                    <symptom.icon className="h-7 w-7 text-white" />
                  </div>
                  <span className="text-base font-semibold text-foreground">{symptom.label}</span>
                  <span className="text-sm text-muted-foreground">{symptom.hindi}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
