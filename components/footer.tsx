import Link from "next/link"
import { Heart, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Rural Health Assist</span>
            </Link>
            <p className="mb-4 text-sm text-muted-foreground">
              Empowering rural India with accessible healthcare guidance and hospital information.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>Emergency: 108</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/symptoms" className="hover:text-primary">Check Symptoms</Link></li>
              <li><Link href="/hospitals" className="hover:text-primary">Find Hospitals</Link></li>
              <li><Link href="/rush" className="hover:text-primary">Hospital Rush</Link></li>
              <li><Link href="/book" className="hover:text-primary">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/future" className="hover:text-primary">Upcoming Features</Link></li>
              <li><Link href="/admin" className="hover:text-primary">Admin Dashboard</Link></li>
              <li><Link href="#" className="hover:text-primary">Health Tips</Link></li>
              <li><Link href="#" className="hover:text-primary">Government Schemes</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@ruralhealth.gov.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4" />
                <span>Ministry of Health, New Delhi</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>A Government of India Initiative for Rural Healthcare</p>
          <p className="mt-1">Made with care for Rural India</p>
        </div>
      </div>
    </footer>
  )
}
