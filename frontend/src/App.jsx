import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:5000/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
    
    fetch("http://localhost:5000/api/empresas")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);
  
  return (
    <div className="p-4">
      {/* Barra de búsqueda */}
      <input 
        type="text" 
        placeholder="Buscar..." 
        className="w-full p-2 border rounded mb-4"
      />
      
      {/* Carrusel de categorías */}
      <div className="flex overflow-x-auto gap-4 mb-6">
        {categories.map((category, index) => (
          <div key={index} className="p-4 border rounded min-w-[150px]">
            <img src={category.image} alt={category.name} className="w-full h-20 object-cover rounded" />
            <p className="text-center mt-2">{category.name}</p>
          </div>
        ))}
      </div>
      
      {/* Lista de empresas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <img src={company.image} alt={company.name} className="w-full h-32 object-cover rounded" />
            <h3 className="text-lg font-bold mt-2">{company.name}</h3>
            <p className="text-sm text-gray-600">{company.description}</p>
            <p className="text-yellow-500 font-bold">⭐ {company.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default App
