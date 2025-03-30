import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from "./components/Home/Hero Section/Home"
import NavBar from "./components/NavBar/NavBar"
import './App.css'
import Features from './components/Home/Features/Features';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <Home/>
      <Features/>
    </>
  )
}

export default App
