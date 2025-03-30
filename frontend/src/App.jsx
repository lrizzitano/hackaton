import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // --------------------------------------------------------------------------
  // Estado para controlar si el usuario ya se ha logeado
  const [login, setLogin] = useState(false);

  // --------------------------------------------------------------------------
  // Estado para controlar la visibilidad del panel de login
  const [loginOpen, setLoginOpen] = useState(false);


    // --------------------------------------------------------------------------
    // Función para alternar la visibilidad del panel de login
    const toggleLogin = () => {
      setLoginOpen(!loginOpen); // Cambia de abierto a cerrado o viceversa
    };

    // --------------------------------------------------------------------------
    // Función para manejar el envío del formulario del login
    // Al presionar Enter o al hacer click en el botón "Logearse", se cierra el panel y se marca como logeado
    const handleLoginSubmit = (e) => {
      e.preventDefault(); // Evita el comportamiento por defecto del formulario
      toggleLogin();      // Cierra el panel de login
      setLogin(true);     // Marca que el usuario ya se logeo
    };


  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsShown, setProductsShown] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showProducts, setShowProducts] = useState(false); // boolean para saber si mostrar los productos 
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
    <>
      {/*
        Condicionalmente se muestra el botón "Log In" si el usuario aún no se ha logeado.
        Si login es true, el botón desaparece.
      */}
      {!login && (
        <div className="login-button" onClick={toggleLogin}>
          Log In
        </div>
      )}

      {/*
        Panel de login centrado en la pantalla.
        Se muestra si loginOpen es true.
        Se utiliza un formulario para que al presionar Enter se active el botón.
      */}
      {loginOpen && (
        <div className="login-panel">
          <form onSubmit={handleLoginSubmit}>
            {/* Input para ingresar el mail */}
            <div className="boton-cerrar" onClick={toggleLogin}>
              X
            </div>
            <div className="input-container">
              <label htmlFor="email">Ingrese su mail</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ejemplo@correo.com"
              />
            </div>
            {/* Input para ingresar la contraseña */}
            <div className="input-container">
              <label htmlFor="password">Ingrese su contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
              />
            </div>
            {/* Botón "Logearse" que se activa al hacer click o presionar Enter */}
            <button type="submit" className="login-submit-button">
              Logearse
            </button>
          </form>
        </div>
      )}
    
      {/* ---------------------------------------------------------------------- */}


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
          onChange={(e) => filterProductsBySearch(e)}
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
        <div className="section-title">🏆 Ranking de Empresas</div>
        <div className="leaderboard-container">
          {companies.length > 0 ? (
            companies.map((company, index) => (
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
    </>
  );
}

export default App;
