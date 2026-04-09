import HeroSection from '../components/HeroSection'
import PropertyScrollShowcase from '../components/PropertyScrollShowcase'
import StatsSection from '../components/StatsSection'
import FeaturedProperties from '../components/FeaturedProperties'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import MapSection from '../components/MapSection'
import LeadForm from '../components/LeadForm'

export default function Home() {
  return (
    <>
      <HeroSection />
      <PropertyScrollShowcase />
      <StatsSection />
      <FeaturedProperties limit={6} />
      <WhyChooseUs />
      <Testimonials />
      <MapSection />
      <LeadForm />
    </>
  )
}
