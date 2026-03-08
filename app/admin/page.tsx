"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users, Building2, Activity, TrendingUp, Calendar, AlertTriangle,
  BarChart3, PieChart, MapPin, Thermometer, FileText, Download
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line
} from "recharts"

const patientTrendData = [
  { month: "Jan", patients: 2400, appointments: 1800 },
  { month: "Feb", patients: 2800, appointments: 2100 },
  { month: "Mar", patients: 3200, appointments: 2400 },
  { month: "Apr", patients: 3600, appointments: 2800 },
  { month: "May", patients: 4100, appointments: 3200 },
  { month: "Jun", patients: 4500, appointments: 3600 },
]

const diseaseData = [
  { name: "Viral Fever", cases: 1245, color: "#3b82f6" },
  { name: "Respiratory", cases: 892, color: "#22c55e" },
  { name: "Gastric Issues", cases: 678, color: "#eab308" },
  { name: "Skin Problems", cases: 456, color: "#f97316" },
  { name: "Others", cases: 324, color: "#8b5cf6" },
]

const hospitalTrafficData = [
  { name: "District Hospital", daily: 145, weekly: 980, monthly: 4200 },
  { name: "PHC Rampur", daily: 45, weekly: 310, monthly: 1340 },
  { name: "CHC Block HQ", daily: 78, weekly: 520, monthly: 2280 },
  { name: "Sub-District", daily: 92, weekly: 640, monthly: 2750 },
]

const weeklyTrendData = [
  { day: "Mon", fever: 45, respiratory: 32, gastric: 28, skin: 15 },
  { day: "Tue", fever: 52, respiratory: 38, gastric: 24, skin: 18 },
  { day: "Wed", fever: 48, respiratory: 42, gastric: 30, skin: 12 },
  { day: "Thu", fever: 61, respiratory: 35, gastric: 26, skin: 20 },
  { day: "Fri", fever: 55, respiratory: 40, gastric: 32, skin: 16 },
  { day: "Sat", fever: 38, respiratory: 28, gastric: 20, skin: 10 },
  { day: "Sun", fever: 25, respiratory: 18, gastric: 15, skin: 8 },
]

const recentAlerts = [
  { id: 1, type: "warning", message: "High fever cases reported in Block A - 15% increase", time: "2 hours ago" },
  { id: 2, type: "info", message: "PHC Rampur operating at 90% capacity", time: "4 hours ago" },
  { id: 3, type: "success", message: "Vaccination drive completed in 5 villages", time: "1 day ago" },
  { id: 4, type: "warning", message: "Gastric issues spike in riverside villages", time: "2 days ago" },
]

const COLORS = ["#3b82f6", "#22c55e", "#eab308", "#f97316", "#8b5cf6"]

export default function AdminPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="mb-1 text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Healthcare analytics and hospital traffic monitoring
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                Live Data
              </Badge>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Patients Today</p>
                    <p className="text-3xl font-bold text-foreground">1,247</p>
                    <p className="mt-1 flex items-center text-xs text-green-600">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +12% from yesterday
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Hospitals</p>
                    <p className="text-3xl font-bold text-foreground">24</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      4 PHCs, 12 CHCs, 8 District
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Building2 className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Appointments Today</p>
                    <p className="text-3xl font-bold text-foreground">342</p>
                    <p className="mt-1 flex items-center text-xs text-green-600">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +8% from last week
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Alerts</p>
                    <p className="text-3xl font-bold text-foreground">3</p>
                    <p className="mt-1 text-xs text-yellow-600">
                      2 warnings, 1 critical
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="diseases">Disease Trends</TabsTrigger>
              <TabsTrigger value="hospitals">Hospital Traffic</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Patient Trend Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Patient & Appointment Trends
                    </CardTitle>
                    <CardDescription>Monthly statistics for the past 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={patientTrendData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                          <YAxis stroke="var(--muted-foreground)" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "var(--card)",
                              border: "1px solid var(--border)",
                              borderRadius: "8px",
                            }}
                          />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="patients" 
                            name="Total Patients"
                            stroke="#3b82f6" 
                            fill="#3b82f6" 
                            fillOpacity={0.2} 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="appointments" 
                            name="Appointments"
                            stroke="#22c55e" 
                            fill="#22c55e" 
                            fillOpacity={0.2} 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Disease Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-secondary" />
                      Disease Distribution
                    </CardTitle>
                    <CardDescription>Current month breakdown by condition</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={diseaseData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="cases"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {diseaseData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "var(--card)",
                              border: "1px solid var(--border)",
                              borderRadius: "8px",
                            }}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`flex items-start gap-3 rounded-lg p-3 ${
                          alert.type === "warning"
                            ? "bg-yellow-50"
                            : alert.type === "success"
                            ? "bg-green-50"
                            : "bg-blue-50"
                        }`}
                      >
                        <AlertTriangle
                          className={`mt-0.5 h-5 w-5 ${
                            alert.type === "warning"
                              ? "text-yellow-600"
                              : alert.type === "success"
                              ? "text-green-600"
                              : "text-blue-600"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Disease Trends Tab */}
            <TabsContent value="diseases" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-red-500" />
                    Weekly Disease Trends
                  </CardTitle>
                  <CardDescription>Number of cases by disease type over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="day" stroke="var(--muted-foreground)" />
                        <YAxis stroke="var(--muted-foreground)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="fever" name="Viral Fever" stroke="#ef4444" strokeWidth={2} />
                        <Line type="monotone" dataKey="respiratory" name="Respiratory" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="gastric" name="Gastric" stroke="#eab308" strokeWidth={2} />
                        <Line type="monotone" dataKey="skin" name="Skin Problems" stroke="#22c55e" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {diseaseData.map((disease) => (
                  <Card key={disease.name}>
                    <CardContent className="p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{disease.name}</span>
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: disease.color }}
                        />
                      </div>
                      <p className="text-2xl font-bold text-foreground">{disease.cases}</p>
                      <p className="text-xs text-muted-foreground">cases this month</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Hospital Traffic Tab */}
            <TabsContent value="hospitals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Hospital Traffic Comparison
                  </CardTitle>
                  <CardDescription>Patient visits across different hospitals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={hospitalTrafficData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis type="number" stroke="var(--muted-foreground)" />
                        <YAxis dataKey="name" type="category" width={120} stroke="var(--muted-foreground)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="daily" name="Daily" fill="#3b82f6" />
                        <Bar dataKey="weekly" name="Weekly" fill="#22c55e" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                {hospitalTrafficData.map((hospital) => (
                  <Card key={hospital.name}>
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{hospital.name}</p>
                          <p className="text-sm text-muted-foreground">Active</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-foreground">{hospital.daily}</p>
                          <p className="text-xs text-muted-foreground">Today</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">{hospital.weekly}</p>
                          <p className="text-xs text-muted-foreground">This Week</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">{hospital.monthly}</p>
                          <p className="text-xs text-muted-foreground">This Month</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-red-600">Critical</p>
                        <p className="text-2xl font-bold text-red-700">1</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-yellow-600">Warnings</p>
                        <p className="text-2xl font-bold text-yellow-700">2</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <Activity className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-green-600">Resolved Today</p>
                        <p className="text-2xl font-bold text-green-700">5</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Alerts</CardTitle>
                  <CardDescription>System-wide health alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-red-700">Critical: Dengue Cases Spike</p>
                            <Badge variant="destructive">Critical</Badge>
                          </div>
                          <p className="mt-1 text-sm text-red-600">
                            15 new dengue cases reported in Block C villages. Immediate intervention required.
                          </p>
                          <p className="mt-2 text-xs text-red-500">Reported 30 minutes ago</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-yellow-700">Warning: High Fever Cases</p>
                            <Badge className="bg-yellow-500">Warning</Badge>
                          </div>
                          <p className="mt-1 text-sm text-yellow-600">
                            High fever cases reported in Block A - 15% increase from last week.
                          </p>
                          <p className="mt-2 text-xs text-yellow-500">Reported 2 hours ago</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                      <div className="flex items-start gap-3">
                        <Building2 className="mt-0.5 h-5 w-5 text-yellow-600" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-yellow-700">Warning: Hospital Capacity</p>
                            <Badge className="bg-yellow-500">Warning</Badge>
                          </div>
                          <p className="mt-1 text-sm text-yellow-600">
                            PHC Rampur operating at 90% capacity. Consider patient redistribution.
                          </p>
                          <p className="mt-2 text-xs text-yellow-500">Reported 4 hours ago</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                      <div className="flex items-start gap-3">
                        <Activity className="mt-0.5 h-5 w-5 text-green-600" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-green-700">Resolved: Vaccination Drive Complete</p>
                            <Badge className="bg-green-500">Resolved</Badge>
                          </div>
                          <p className="mt-1 text-sm text-green-600">
                            Polio vaccination drive completed successfully in 5 villages. 2,340 children vaccinated.
                          </p>
                          <p className="mt-2 text-xs text-green-500">Resolved 1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
