import Hero from '@components/Hero';
import LoadingSection from '@components/LoadingSection';
import Menu from '@components/Menu';
import Cats from '@components/Cats';
import ContactFooter from '@components/ContactFooter';

function App() {

  return (
    <main className="bg-yellow-950 h-screen text-white">
      <LoadingSection />
      <Hero />
      <Menu />
      <Cats />
      <ContactFooter />
    </main>
  )
}

export default App
