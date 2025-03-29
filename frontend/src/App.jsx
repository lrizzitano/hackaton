import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Traer las categorías
    fetch("http://localhost:5000/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));

    // Traer las empresas
    fetch("http://localhost:5000/api/empresas")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);

  return (
    <div className="container">
      {/* Título principal */}
      <h1 className="main-title">EcoMarket</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar..."
        className="search-bar"
      />

      {/* Sección de Categorías */}
      <div className="section-title">Categorías</div>
      <div className="categories-container">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.image} alt={category.name} className="category-image" />
            <p className="category-name">{category.name}</p>
          </div>
        ))}
      </div>

      {/* Sección de Empresas */}
      <div className="section-title">Empresas</div>
      <div className="companies-container">
        {companies.map((company, index) => (
          <div key={index} className="company-card">
            <img src={company.image} alt={company.name} className="company-image" />
            <h3 className="company-name">{company.name}</h3>
            <p className="company-description">{company.description}</p>
            <p className="company-rating">⭐ {company.rating}</p>
          </div>
        ))}
      </div>
    </div>        
  );
}

export default App;
