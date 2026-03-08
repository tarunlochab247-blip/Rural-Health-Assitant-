import { Globe, Clock, Shield, Users, Smartphone, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Communicate in Hindi, English, Tamil, Telugu, Bengali, Marathi and more.",
  },
  {
    icon: Clock,
    title: "Real-time Rush Data",
    description: "Check live crowd levels at hospitals before you visit to save waiting time.",
  },
  {
    icon: Shield,
    title: "Government Hospitals",
    description: "Find verified government hospitals and PHCs near your location.",
  },
  {
    icon: Users,
    title: "Specialist Guidance",
    description: "Get recommendations for the right specialist based on your symptoms.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Easy to use on any smartphone with simple interface for all ages.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get symptom analysis and hospital suggestions within seconds.",
  },
]

export function Features() {
  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Why Choose Rural Health Assist?
          </h2>
          <p className="text-lg text-muted-foreground">
            Built specifically for rural healthcare needs
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 bg-card shadow-sm transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
