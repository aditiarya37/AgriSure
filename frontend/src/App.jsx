import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from "./components/Home/Hero Section/Home"
import NavBar from "./components/NavBar/NavBar"
import './App.css'
import Features from './components/Home/Features/Features';
import AboutUs from './components/Home/About Us/AboutUs';
import Statistics from './components/Home/Statistics/Statistics';
import Services from './components/Home/Services/Services';
import Newsletter from './components/Home/Newsletter/Newsletter';
import Testimonials from './components/Home/Testimonials/Testimonials';
import Footer from './components/Home/Footer/Footer';

function App() {

  return (
    <>
      <NavBar/>
      <Home/>
      <Features/>
      <AboutUs/>
      <Statistics/>
      <Services/>
      <Newsletter/>
      <Testimonials/>
      <Footer/>
    </>
  )
}

export default App
