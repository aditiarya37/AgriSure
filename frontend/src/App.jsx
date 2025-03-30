import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from "./components/Home/Hero Section/Home"
import NavBar from "./components/NavBar/NavBar"
import './App.css'
import Features from './components/Home/Features/Features';
import AboutUs from './components/Home/About Us/AboutUs';

function App() {

  return (
    <>
      <NavBar/>
      <Home/>
      <Features/>
      <AboutUs/>
    </>
  )
}

export default App
