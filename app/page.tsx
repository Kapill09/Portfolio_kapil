import { Hero } from '@/components/sections/Hero'
import { Education } from '@/components/sections/Education'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Education />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}
