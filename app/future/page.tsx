import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FutureFeatures } from "@/components/future-features"

export default function FuturePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <FutureFeatures />
      </main>
      <Footer />
    </div>
  )
}
