import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'; // Estilos de Tailwind CSS

// Importación de las páginas
import App from './App';
import Home from './pages/Home';
import ExperimentDetail from './pages/ExperimentDetail';
import Logs from './pages/Logs';

// Definición de rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/experimento/:id', element: <ExperimentDetail /> },
      { path: '/logs', element: <Logs /> }
    ]
  }
]);

// Renderización de la aplicación
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
