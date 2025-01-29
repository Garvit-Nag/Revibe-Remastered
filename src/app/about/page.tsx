// app/recommendations/page.tsx
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AboutPage from '@/components/About'

export default function RecommendationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#040404]">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <AboutPage />
      </main>
      <Footer />
    </div>
  )
}