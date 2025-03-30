import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsShown, setProductsShown] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showProducts, setShowProducts] = useState(false); // boolean para saber si mostrar los productos 

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

    
    // Obtener todos los productos (no se si es lo ideal traer todo al front, pero es lo que hay)
    fetch("http://localhost:5000/api/productos")
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((err) => console.error("Error al obtener productos:", err));
  
  }, []);

  // Obtener productos de la categoría seleccionada
  const filterProductsByCategory = (categoryId) => {
    setProductsShown(products.filter((product => product.category._id === categoryId)));
    setSelectedCategory(categoryId);
  };
  
  /*.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );*/

  const filterProductsBySearch = (e) => {
    setProductsShown(products.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase())));
    setSearch(e.target.value);
  } 


  return (
    <div className="container">
      {/* Título principal */}
      <h1 className="main-title">EcoMarket</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar categorías o empresas..."
        className="search-bar"
        value={search}
        onChange={e => filterProductsBySearch(e)}
      />

      {/* Sección de Categorías */}
      <div className="section-title">Categorías</div>
      <div className="categories-container">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div
              key={index}
              className={`category-card ${
                selectedCategory === category._id ? "selected" : ""
              }`}
              onClick={() => filterProductsByCategory(category._id)}
            >
              <img src={category.image} alt={category.name} className="category-image"/>
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
            {productsShown.length > 0 ? (
              productsShown.map((product, index) => (
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
      <div className="section-title">Empresas</div>
      <div className="companies-container">
        {companies.length > 0 ? (
          companies.map((company, index) => (
            <div key={index} className="company-card">
              <img src={company.image} alt={company.name} className="company-image" />
              <h3 className="company-name">{company.name}</h3>
              <p className="company-description">{company.description}</p>
              <p className="company-rating">⭐ {company.rating}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No se encontraron empresas.</p>
        )}
      </div>
    </div>
  );
}

export default App;
