# Eat-Rush 🍽️🚀

Descripción: es una plataforma de comercio electrónico especializada en el sector alimenticio, diseñada para ofrecer una experiencia de compra fluida, rápida y eficiente. La solución emplea una arquitectura moderna que integra un frontend dinámico desarrollado con React y TypeScript, un backend robusto** basado en Node.js con Express, y una gestión de datos en tiempo real mediante MySQL y Sequelize.
Su diseño modular y extensible permite incorporar de forma sencilla nuevos productos, restaurantes y usuarios, lo que convierte al sistema en altamente escalable y adaptable a distintos modelos de negocio y volúmenes de operación. La combinación de TypeScript para un desarrollo tipado y seguro, Sequelize para una gestión de datos estructurada, y Redux para un estado predecible, asegura que cada ampliación mantenga la estabilidad, rendimiento y calidad del conjunto.
Por otro lado, con el objetivo de garantizar la integridad y seguridad de la plataforma, el acceso al panel de administración está restringido. Solo un usuario administrador preconfigurado puede acceder, eliminando la posibilidad de registro público para roles administrativos. Esto permite un control estricto sobre las operaciones sensibles y protege la información crítica, limitando el acceso únicamente a personal autorizado.

Para correr el sevidor /backend/api y ejecutar => node index.js

Para correr la app frontend /frontend y ejecutar => npm run dev

Ejecutar migraciones con Sequelize: npx sequelize-cli db:migrate

Crear una nueva migración: npx sequelize-cli migration:generate --name nombre-migracion --attributes (todos los atributos con los tipos de datos de cada uno de ellos);

Compilar TypeScript: tsc

🏗️ Arquitectura Técnica:
Backend (API RESTful).
Lenguaje: TypeScript con Node.js

Framework: Express.js para gestión de rutas y middleware.

ORM: Sequelize para manipulación de base de datos.
Base de Datos: MySQL alojada en Clever Cloud.
Autenticación: JWT (JSON Web Tokens).
API RESTful: Endpoints documentados para productos, usuarios y pedidos.

Frontend (Aplicación Web).
Lenguaje: TypeScript.
Framework: React con Ts.
Gestión de Estado: Redux Toolkit para estado global.
Estilos: CSS Modules / Styled Components.
Enrutamiento: React Router DOM.
UI Components: Material-UI.

Base de Datos (Clever Cloud - MySQL).
Proveedor: Clever Cloud.
Tipo: MySQL Managed Database.
Características: Escalabilidad automática, backups automáticos, alta disponibilidad.
Modelos Principales: Usuarios, Productos, Categorías, Pedidos, Detalles de Pedido, Restaurantes.

