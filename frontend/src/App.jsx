import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCatalog, setShowCatalog] = useState(false); // Estado para cambiar entre vistas

  useEffect(() => {
    // Obtener todas las categorías
    fetch("http://localhost:5000/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error al obtener categorías:", err));

    // Obtener todas las empresas
    fetch("http://localhost:5000/api/empresas")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error("Error al obtener empresas:", err));
  }, []);

  // Obtener productos de la categoría seleccionada
  const fetchProductsByCategory = (categoryId) => {
    fetch(`http://localhost:5000/api/productos/categoria/${categoryId}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al obtener productos:", err));

    setSelectedCategory(categoryId);
  };

  // Filtrar categorías y empresas según el término de búsqueda
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      {showCatalog ? (
       <>
        {/* Título principal */}
        <h1 className="main-title">EcoStore</h1>

        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar categorías o empresas..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Sección de Categorías */}
        <div className="section-title">Categorías</div>
        <div className="categories-container">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <div
                key={index}
                className={`category-card ${
                  selectedCategory === category._id ? "selected" : ""
                }`}
                onClick={() => fetchProductsByCategory(category._id)}
              >
                <img src={category.image} alt={category.name} className="category-image" />
                <p className="category-name">{category.name}</p>
              </div>
            ))
          ) : (
            <p className="no-results">No se encontraron categorías.</p>
          )}
        </div>

        {/* Sección de Productos de la Categoría Seleccionada */}
        {selectedCategory && (
          <>
            <div className="section-title">Productos</div>
            <div className="products-container">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div key={index} className="product-card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">💲{product.price}</p>
                    <p className="product-company">🏢 {product.company.name}</p>
                  </div>
                ))
              ) : (
                <p className="no-results">No hay productos en esta categoría.</p>
              )}
            </div>
          </>
        )}

        {/* Sección de Empresas */}
        <div className="section-title">🏆 Ranking de Empresas</div>
        <div className="leaderboard-container">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company, index) => (
              <div key={index} className="leaderboard-item">
                <span className="leaderboard-rank">#{index + 1}</span>
                <img src={company.image} alt={company.name} className="leaderboard-logo" />
                <div className="leaderboard-info">
                 <h3 className="leaderboard-name">{company.name}</h3>
                 <p className="company-description">{company.description}</p>
                <p className="leaderboard-rating">⭐ {company.rating}</p>
                </div>
              </div>
            ))
            
          ) : (
            <p className="no-results">No se encontraron empresas.</p>
          )}
        </div>

        {/* Botón para volver a la página principal */}
        <button className="back-button" onClick={() => setShowCatalog(false)}>
          Volver al inicio
        </button>
      </>
    ) : (
      // 📌 Página de inicio
      <div className="home-container">
        <h1 className="home-title">Bienvenido a EcoStore</h1>
        <p className="home-description">
          Un marketplace sustentable donde encontrarás productos ecológicos de las mejores empresas comprometidas con el medio ambiente.
        </p>
        <button className="catalog-button" onClick={() => setShowCatalog(true)}>
          Ir al catálogo
        </button>
      </div>
     )}
   </div>
  );
}

export default App;
