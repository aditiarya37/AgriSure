import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import AppRoutes from './Routes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <NavBar />
          <main className="main-content">
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;