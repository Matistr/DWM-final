// Inicio de Hero
const Hero = () => (
  <header
    className="w-full h-screen bg-cover bg-center flex flex-col justify-center items-center text-center text-red-600"
    style={{ backgroundImage: 'url(/fondo-principal.jpg)' }}
  >
    <div className="mt-24">
      <h1 className="text-6xl font-bold">Bienvenidos a Fukusaku</h1>
      <p className="text-2xl mt-4">La primera y mejor casa de sushi de todo Maipú.</p>
      <a
        href="carta.html"
        className="mt-6 inline-block bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
      >
        Ver Menú
      </a>
    </div>
  </header>
);
// Fin de Hero

// Inicio de Nosotros
const Nosotros = () => (
  <section id="Sobrenosotros" className="py-16 bg-white text-center">
    <h2 className="text-4xl font-bold text-red-600 mb-6">Sobre Nosotros</h2>
    <p className="text-xl max-w-4xl mx-auto mb-4">
      Nuestros ancestros de origen japonés llegaron a Chile en el año 1976, llegando a la comuna de Maipú
      para comenzar una nueva vida, y trayendo sus tradiciones milenarias del Oriente al Occidente, 
      siendo la primera casa de sushi de la comuna, región y del país.
    </p>
    <p className="text-xl max-w-4xl mx-auto mb-4">
      Nos enorgullece contar con 48 años de experiencia, brindando piezas de fusión japonesa/americana y piezas 100% japonesas,
      gracias a la disciplina y amor hemos transmitido nuestro conocimiento sobre el sushi de generación en generación,
      siendo esta la tercera generación de la familia que decide ser parte de este gran y bello proyecto, enfocados en entregarte una 
      experiencia de primer nivel tanto culinariamente como en entretenimiento.
    </p>
    <p className="text-xl max-w-4xl mx-auto mb-4">
      ¡Ven a visitarnos en nuestro nuevo local ubicado en Maipú 20654!
    </p>
  </section>
);

// Inicio de Opciones
const Opciones = () => (
  <section id="opciones" className="py-16 bg-gray-100">
    <h2 className="text-4xl font-bold text-red-600 text-center mb-6">Nuestras opciones</h2>
    <div className="flex flex-wrap justify-center gap-8">
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
        <img src="/img/logo-restourant.webp" alt="retiro en local" className="rounded" />
        <h3 className="mt-4 text-2xl font-bold">Retiro en local</h3>
        <p className="text-lg">Puedes pedir a través de nuestra página y retirar tu pedido en nuestro local en Maipú.</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
        <img src="/img/logo-delivery.jpg" alt="despacho" className="rounded" />
        <h3 className="mt-4 text-2xl font-bold">Despacho a domicilio</h3>
        <p className="text-lg">Si te encuentras en un radio de 3 km, tu pedido es entregado de manera gratuita en tu domicilio.</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
        <img src="/img/mesas-restaurant.png" alt="comer en local" className="rounded" />
        <h3 className="mt-4 text-2xl font-bold">Ven a nuestro local</h3>
        <p className="text-lg">Contamos con capacidad para 12 personas. ¡Ven pronto a disfrutar de nuestro local!</p>
      </div>
    </div>
  </section>
);
// Fin de Opciones

// Inicio de Fotos
const Fotos = () => (
  <section id="fotos" className="py-16 bg-white">
    <h2 className="text-4xl font-bold text-red-600 text-center mb-6">Galería</h2>
    <div className="photo-grid flex flex-wrap justify-around">
      <img src="/img/foto1.png" alt="Foto 1" className="w-1/3 p-2" />
      <img src="/img/foto2.png" alt="Foto 2" className="w-1/3 p-2" />
      <img src="/img/foto3.png" alt="Foto 3" className="w-1/3 p-2" />
      <img src="..assets/img/foto4.png" alt="Foto 4" className="w-1/3 p-2" />
      <img src="/img/foto5.png" alt="Foto 5" className="w-1/3 p-2" />
      <img src="/img/foto6.png" alt="Foto 6" className="w-1/3 p-2" />

    </div>
  </section>
);
// Fin de Fotos

// Inicio de Testimonios
const Testimonios = () => (
  <section className="py-16 bg-gray-100 text-center">
    <h2 className="text-4xl font-bold text-red-600 mb-6">Comentarios</h2>
    <div className="flex flex-wrap justify-center gap-8">
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
        <p className="text-lg">&quot;La mejor experiencia de comida japonesa que he tenido...&quot;</p>
        <p className="text-lg">- Javier Fuenzalida</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
        <p className="text-lg">&quot;Los sabores son exquisitos y el ambiente es inmejorable.&quot;</p>
        <p className="text-lg">- Matias Sepulveda</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
        <p className="text-lg">&quot;El Teriyaki me recordó a mi viaje a Japón. ¡Delicioso!&quot;</p>
        <p className="text-lg">- Matias Salas</p>
      </div>
    </div>
  </section>
);
// Fin de Testimonios

// Página Principal Combinada
const HomePage = () => {
  return (
    <div>
      <Hero />
      <Nosotros />
      <Opciones />
      <Fotos />
      <Testimonios />
    </div>
  );
};

export default HomePage;