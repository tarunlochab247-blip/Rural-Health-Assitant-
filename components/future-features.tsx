import { BarChart3, Building2, TrendingUp, Bell, FileText, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const futureFeatures = [
  {
    icon: BarChart3,
    title: "Government Disease Analytics",
    description: "Real-time disease outbreak tracking and analytics dashboard for government health departments.",
    status: "In Development",
  },
  {
    icon: Building2,
    title: "Emergency Private Hospital",
    description: "Instant suggestions for nearby private hospitals during emergencies when government facilities are unavailable.",
    status: "Coming Soon",
  },
  {
    icon: TrendingUp,
    title: "Health Trend Analytics",
    description: "AI-powered health trend analysis to help government plan resources and interventions.",
    status: "Planned",
  },
  {
    icon: Bell,
    title: "Outbreak Alerts",
    description: "Real-time notifications about disease outbreaks in your area with preventive measures.",
    status: "Planned",
  },
  {
    icon: FileText,
    title: "Digital Health Records",
    description: "Secure digital health records accessible across all government hospitals.",
    status: "Coming Soon",
  },
  {
    icon: Shield,
    title: "Telemedicine Support",
    description: "Video consultations with doctors for follow-ups and non-emergency cases.",
    status: "In Development",
  },
]

const statusColors: Record<string, string> = {
  "In Development": "bg-chart-1 text-white",
  "Coming Soon": "bg-chart-2 text-white",
  "Planned": "bg-muted text-muted-foreground",
}

export function FutureFeatures() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">Roadmap</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Upcoming Features
          </h2>
          <p className="text-lg text-muted-foreground">
            We are constantly improving to serve rural India better
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {futureFeatures.map((feature) => (
            <Card key={feature.title} className="relative overflow-hidden border transition-all hover:shadow-lg">
              <div className="absolute right-4 top-4">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[feature.status]}`}>
                  {feature.status}
                </span>
              </div>
              <CardContent className="p-6 pt-12">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20">
                  <feature.icon className="h-6 w-6 text-secondary" />
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
