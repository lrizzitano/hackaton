import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // --------------------------------------------------------------------------
  // Estado para controlar si el usuario ya se ha logeado
  const [login, setLogin] = useState(false);

  // --------------------------------------------------------------------------
  // Estado para controlar la visibilidad del panel de login
  const [loginOpen, setLoginOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);

    // --------------------------------------------------------------------------
    // Función para alternar la visibilidad del panel de login
    const toggleLogin = () => {
      setLoginOpen(!loginOpen); // Cambia de abierto a cerrado o viceversa
    };

    const toggleCartPanel = () => {
      setCartOpen(!cartOpen); // Cambia de abierto a cerrado o viceversa
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
  const [productsOnCart, setProductsOnCart] = useState([]); // Contador de productos en el carrito
  const [showProductsWithoutCategory, setShowProductsWithoutCategory] = useState(false);


  useEffect(() => {
    // Obtener todas las categorías   
    fetch("https://hackathon-9hw7.onrender.com/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error al obtener categorías:", err));

    // Obtener todas las empresas
    fetch("https://hackathon-9hw7.onrender.com/api/empresas")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error("Error al obtener empresas:", err));

    
    // Obtener todos los productos (no se si es lo ideal traer todo al front, pero es lo que hay)
    fetch("https://hackathon-9hw7.onrender.com/api/productos")
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((err) => console.error("Error al obtener productos:", err));
  
  }, []);

  // Obtener productos de la categoría seleccionada
  const filterProductsByCategory = (categoryId) => {
    setProductsShown(products.filter((product => product.category._id === categoryId)));
    setShowProducts(true);
    setShowProductsWithoutCategory(false);
    setShowCatalog(false);
    setSelectedCategory(categoryId);
  };
  
  const getSelectedCategoryName = () => {
    return categories.find(cat => cat._id === selectedCategory).name
  }
  const filterProductsBySearchWithCategory = (e) => {
    setProductsShown(products.filter(product => {
      return product.name.toLowerCase().includes(e.target.value.toLowerCase()) && product.category._id === selectedCategory;
    }));
    setShowProducts(true);
    setShowCatalog(false);
    setSearch(e.target.value);
  }

  const filterProductsBySearchWithoutCategory = (e) => {
    setProductsShown(products.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase())));
    setShowProducts(true);
    setShowProductsWithoutCategory(true);
    setShowCatalog(false);
    setSearch(e.target.value);
  } 

  const addProductToCart = (product) => {
    setProductsOnCart(prevProducts => [...prevProducts, product]);
  }
  return (
    <>
    <title>Ethos Market</title>
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
            {/* Botón "Loguearse" que se activa al hacer click o presionar Enter */}
            <button type="submit" className="login-submit-button">
              Loguearse
            </button>
          </form>
        </div>
      )}

      {cartOpen && (
        <div>
          Aca iria el panel del carrito
        </div>
      )}

      {login && (
        <div className="logged-message">
          Logueado
        </div>
      )}
    
      {/* ---------------------------------------------------------------------- */}


    <div className="container">
      {showCatalog ? (
       <>
        <div className="header">
          {/* Logo */}
          <img src="/Ethosmarket-Logo3.png" alt="Logo" />
          {/* Título principal */}
          <h1 className="main-title">Ethos Market</h1>
        </div>

        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar productos"
          className="search-bar"
          value={search}
          onChange={(e) => filterProductsBySearchWithoutCategory(e)}
        />

        <div className="cart-button" onClick={toggleCartPanel}>
          <img src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" alt="Carrito de compras" className="cart-icon" />
        </div>


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
    ) : showProducts ? (

        <>
          {/* Barra de búsqueda */}
          <input
          autoFocus
          type="text"
          placeholder="Buscar productos"
          className="search-bar"
          value={search}
          onChange={(e) => {
            showProductsWithoutCategory? filterProductsBySearchWithoutCategory(e) : filterProductsBySearchWithCategory(e);
            }}
        />

        <div className="cart-button" onClick={toggleCartPanel}>
          <img src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" alt="Carrito de compras" className="cart-icon" />
        </div>
          <div className="section-title">{showProductsWithoutCategory? "Productos" : getSelectedCategoryName()}</div>
          <div className="products-container">
            {productsShown.length > 0 ? (
              productsShown.map((product, index) => (
                <div key={index} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">💲{product.price}</p>
                  <p className="product-company">🏢 {product.company.name}</p>
                  <div className="contenedor">
                    <button onClick={addProductToCart(product)}  className="boton-carrito">Agregar al carrito</button>
                  </div>

                </div>
              ))
            ) : (
              <p className="no-results">No hay productos en esta categoría.</p>
            )}
          </div>
        {/* Botón para volver a la página principal */}
        <button className="back-button" onClick={() => {setShowProducts(false); setShowCatalog(true); setSearch("")}}>
          Volver atras
        </button>
        </>
    
    ) : (
      // 📌 Página de inicio
      <div className="home-container">
        <h1 className="home-title">Ethos Market</h1>
        <h2 className="home-subtitle">"El poder de elegir, el poder de cambiar"</h2>
        <p className="home-description">
          En Ethos Market creemos que cada compra es un voto por el futuro que queremos.
          Nuestra plataforma no es solo una tienda online, sino una herramienta de empoderamiento
          para los consumidores. A través de información clara y accesible, ayudamos a nuestros clientes
          a tomar decisiones conscientes, incentivando a las empresas a adoptar prácticas más sostenibles.
        </p>
        <p className="home-description">
          Creemos en el poder de la demanda informada: cuando los consumidores exigen productos éticos y ecológicos,
          las marcas deben adaptarse. Por eso, en EthosMarket ofrecemos solo productos alineados con valores
          de responsabilidad ambiental y social, fomentando un sistema de consumo más justo, transparente y sustentable.
        </p>
        <p className="home-description">
          Cada compra aquí es un paso hacia un mundo donde la economía y el bienestar del planeta van de la mano.
          Tú eliges. Tú decides. Tú transformas.
        </p>
        <button className="catalog-button" onClick={() => setShowCatalog(true)}>
          Ir al catálogo
        </button>
      </div>

     )
     
   }
   </div>
    </>
  );
}

export default App;
