import Hero from '@components/Hero';
import Menu from '@components/Menu';
import Cats from '@components/Cats';
import ContactFooter from '@components/ContactFooter';

function App() {

  return (
    <main className="pattern">
      {/* <LoadingSection /> */}
      {/* <section className="hero-buffer h-[500px] pointer-events-none top-0 left-0 w-full -z-10"></section> */}
      <Hero />
      <Menu />
      <Cats />
      <ContactFooter />
    </main>
  )
}

export default App
