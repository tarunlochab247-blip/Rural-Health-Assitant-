import { MessageSquare, Stethoscope, MapPin, CalendarCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    icon: MessageSquare,
    title: "Describe Symptoms",
    description: "Tell us how you feel in your own language. You can type or use voice input.",
    color: "bg-primary",
  },
  {
    icon: Stethoscope,
    title: "Get AI Analysis",
    description: "Our AI analyzes your symptoms and suggests possible conditions and urgency level.",
    color: "bg-secondary",
  },
  {
    icon: MapPin,
    title: "Find Hospital",
    description: "Locate the nearest government hospital with the right specialist for your condition.",
    color: "bg-primary",
  },
  {
    icon: CalendarCheck,
    title: "Book Appointment",
    description: "Schedule your visit and check real-time hospital rush to avoid long wait times.",
    color: "bg-secondary",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get healthcare guidance in four simple steps
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={step.title} className="relative overflow-hidden border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${step.color}`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-4xl font-bold text-muted-foreground/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
