// app/recommendations/page.tsx
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Recommendations from '@/components/Recommendations'

export default function RecommendationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Recommendations />
      </main>
      <Footer />
    </div>
  )
}