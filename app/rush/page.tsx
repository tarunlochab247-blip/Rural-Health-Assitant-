"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, Users, Clock, TrendingUp, TrendingDown, 
  Minus, RefreshCw, MapPin, Activity
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts"

const hospitals = [
  {
    id: 1,
    name: "District Government Hospital",
    type: "District Hospital",
    currentPatients: 45,
    capacity: 200,
    rushLevel: "low",
    waitTime: "15-20 min",
    trend: "stable",
    departments: {
      "General Medicine": { patients: 15, trend: "up" },
      "Pediatrics": { patients: 8, trend: "down" },
      "Gynecology": { patients: 12, trend: "stable" },
      "Emergency": { patients: 10, trend: "up" },
    },
  },
  {
    id: 2,
    name: "Primary Health Centre (PHC)",
    type: "PHC",
    currentPatients: 28,
    capacity: 30,
    rushLevel: "high",
    waitTime: "60-90 min",
    trend: "up",
    departments: {
      "General Medicine": { patients: 18, trend: "up" },
      "Maternal Health": { patients: 7, trend: "stable" },
      "Vaccination": { patients: 3, trend: "down" },
    },
  },
  {
    id: 3,
    name: "Community Health Centre",
    type: "CHC",
    currentPatients: 35,
    capacity: 50,
    rushLevel: "medium",
    waitTime: "30-45 min",
    trend: "down",
    departments: {
      "General Medicine": { patients: 12, trend: "stable" },
      "Emergency": { patients: 8, trend: "down" },
      "Pediatrics": { patients: 10, trend: "stable" },
      "Dental": { patients: 5, trend: "up" },
    },
  },
  {
    id: 4,
    name: "Sub-District Hospital",
    type: "Sub-District",
    currentPatients: 55,
    capacity: 100,
    rushLevel: "medium",
    waitTime: "25-35 min",
    trend: "stable",
    departments: {
      "General Medicine": { patients: 15, trend: "stable" },
      "Surgery": { patients: 10, trend: "down" },
      "Gynecology": { patients: 12, trend: "up" },
      "ENT": { patients: 8, trend: "stable" },
      "Eye": { patients: 10, trend: "stable" },
    },
  },
]

const hourlyData = [
  { time: "6AM", patients: 12 },
  { time: "8AM", patients: 45 },
  { time: "10AM", patients: 78 },
  { time: "12PM", patients: 65 },
  { time: "2PM", patients: 82 },
  { time: "4PM", patients: 58 },
  { time: "6PM", patients: 42 },
  { time: "8PM", patients: 25 },
]

const weeklyData = [
  { day: "Mon", low: 120, medium: 80, high: 45 },
  { day: "Tue", low: 150, medium: 70, high: 35 },
  { day: "Wed", low: 140, medium: 90, high: 50 },
  { day: "Thu", low: 130, medium: 85, high: 40 },
  { day: "Fri", low: 110, medium: 95, high: 55 },
  { day: "Sat", low: 90, medium: 60, high: 30 },
  { day: "Sun", low: 70, medium: 40, high: 20 },
]

const rushColors = {
  low: { bg: "bg-green-500", text: "text-green-500", label: "Low Rush" },
  medium: { bg: "bg-yellow-500", text: "text-yellow-500", label: "Medium Rush" },
  high: { bg: "bg-red-500", text: "text-red-500", label: "High Rush" },
}

const trendIcons = {
  up: <TrendingUp className="h-4 w-4 text-red-500" />,
  down: <TrendingDown className="h-4 w-4 text-green-500" />,
  stable: <Minus className="h-4 w-4 text-yellow-500" />,
}

export default function RushPage() {
  const [selectedHospital, setSelectedHospital] = useState<string>("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  const getOccupancyPercentage = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-foreground">Live Hospital Rush</h1>
              <p className="text-muted-foreground">
                Real-time crowd levels and estimated waiting times
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Select hospital" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hospitals</SelectItem>
                  {hospitals.map((h) => (
                    <SelectItem key={h.id} value={h.id.toString()}>{h.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Low Rush</p>
                  <p className="text-2xl font-bold text-foreground">2</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <Building2 className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Medium Rush</p>
                  <p className="text-2xl font-bold text-foreground">2</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <Building2 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">High Rush</p>
                  <p className="text-2xl font-bold text-foreground">0</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold text-foreground">163</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Hospital Cards */}
            <div className="space-y-4 lg:col-span-2">
              {hospitals
                .filter((h) => selectedHospital === "all" || h.id.toString() === selectedHospital)
                .map((hospital) => (
                  <Card key={hospital.id} className="overflow-hidden">
                    <div className={`h-1 ${rushColors[hospital.rushLevel as keyof typeof rushColors].bg}`} />
                    <CardContent className="p-6">
                      <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                        <div>
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold text-foreground">{hospital.name}</h3>
                            <Badge variant="outline">{hospital.type}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Wait: {hospital.waitTime}
                            </span>
                            <span className="flex items-center gap-1">
                              {trendIcons[hospital.trend as keyof typeof trendIcons]}
                              {hospital.trend === "up" ? "Increasing" : hospital.trend === "down" ? "Decreasing" : "Stable"}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={`${rushColors[hospital.rushLevel as keyof typeof rushColors].bg} text-white`}>
                            {rushColors[hospital.rushLevel as keyof typeof rushColors].label}
                          </Badge>
                        </div>
                      </div>

                      {/* Occupancy Bar */}
                      <div className="mb-4">
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Current: {hospital.currentPatients} / {hospital.capacity}
                          </span>
                          <span className={rushColors[hospital.rushLevel as keyof typeof rushColors].text}>
                            {getOccupancyPercentage(hospital.currentPatients, hospital.capacity)}% Occupied
                          </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full transition-all ${rushColors[hospital.rushLevel as keyof typeof rushColors].bg}`}
                            style={{ width: `${getOccupancyPercentage(hospital.currentPatients, hospital.capacity)}%` }}
                          />
                        </div>
                      </div>

                      {/* Department Status */}
                      <div className="grid gap-2 sm:grid-cols-2">
                        {Object.entries(hospital.departments).map(([dept, data]) => (
                          <div
                            key={dept}
                            className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
                          >
                            <span className="text-sm text-foreground">{dept}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{data.patients}</span>
                              {trendIcons[data.trend as keyof typeof trendIcons]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Charts */}
            <div className="space-y-6">
              {/* Hourly Traffic Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Activity className="h-5 w-5 text-primary" />
                    Today&apos;s Patient Traffic
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={hourlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis 
                          dataKey="time" 
                          tick={{ fontSize: 12 }} 
                          stroke="var(--muted-foreground)"
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }} 
                          stroke="var(--muted-foreground)"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="patients" 
                          stroke="var(--primary)" 
                          fill="var(--primary)" 
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                    Weekly Rush Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis 
                          dataKey="day" 
                          tick={{ fontSize: 12 }} 
                          stroke="var(--muted-foreground)"
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }} 
                          stroke="var(--muted-foreground)"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="low" name="Low" stackId="a" fill="#22c55e" />
                        <Bar dataKey="medium" name="Medium" stackId="a" fill="#eab308" />
                        <Bar dataKey="high" name="High" stackId="a" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Best Time to Visit */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Best Time to Visit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-green-50 px-4 py-3">
                    <span className="font-medium text-green-700">Morning (6-8 AM)</span>
                    <Badge className="bg-green-500">Recommended</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-green-50 px-4 py-3">
                    <span className="font-medium text-green-700">Evening (6-8 PM)</span>
                    <Badge className="bg-green-500">Good</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-yellow-50 px-4 py-3">
                    <span className="font-medium text-yellow-700">Afternoon (12-2 PM)</span>
                    <Badge className="bg-yellow-500">Moderate</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-red-50 px-4 py-3">
                    <span className="font-medium text-red-700">Mid-Morning (10-12 AM)</span>
                    <Badge className="bg-red-500">Busy</Badge>
                  </div>
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
