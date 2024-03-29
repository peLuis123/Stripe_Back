# API para Pasarela de Pago con Stripe

Este repositorio contiene una API para la integración de una pasarela de pago con Stripe. La API permite a los usuarios gestionar clientes, agregar fuentes de pago (tarjetas), crear y confirmar intenciones de pago, y realizar otras operaciones relacionadas con pagos.

## Requisitos Previos

Antes de ejecutar la API, asegúrese de tener instalado lo siguiente:

- Node.js (versión x.x.x o posterior)
- npm (Gestor de paquetes de Node)
- Cuenta de Stripe (https://stripe.com/) con claves de API (Prueba o en Vivo)

## Instalación

1. Clonar el repositorio en su máquina local.
2. Navegar al directorio del proyecto.
3. Instalar las dependencias requeridas usando npm:


npm install

## Configuración

Cree un archivo .env en el directorio raíz del proyecto y agregue sus claves de API de Stripe:

- STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXX
- STRIPE_PUBLIC_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXX

Reemplace sk_test_XXXXXXXXXXXXXXXXXXXXXX con su clave secreta de Stripe y pk_test_XXXXXXXXXXXXXXXXXXXXXX con su clave pública de Stripe.


## Ejecución de la API

Para iniciar el servidor de la API, utilice uno de los siguientes comandos:

1. Para desarrollo con recarga automática (usando nodemon):
- npm run dev
2. Para producción:
- npm start
La API estará accesible en http://localhost:3000, donde PUERTO es el número de puerto especificado en su archivo server.js.

## Endpoints
La API proporciona los siguientes endpoints para gestionar pagos y clientes:

- POST /customers: Crear un nuevo cliente.
- GET /customers/:id: Obtener un cliente específico por ID.
- PUT /customers/:id: Actualizar los detalles de un cliente.
- DELETE /customers/:id: Eliminar un cliente.
- POST /customers/:id/sources: Agregar una fuente de pago (tarjeta) a un cliente.
- DELETE /customers/:id/sources: Eliminar una fuente de pago (tarjeta) de un cliente.
- GET /customers/:id/sources: Obtener una lista de fuentes de pago de un cliente.
- POST /tokens: Crear un token de pago para información de tarjeta.
- POST /created: Crear una nueva intención de pago.
- POST /confirm: Confirmar una intención de pago.
- GET /users: Obtener una lista de clientes.
- Documentación Swagger
- La API incluye documentación Swagger para facilitar la prueba y comprensión de los endpoints disponibles. Puede acceder a Swagger UI en http://localhost:3000/doc.

## Dependencias
La API utiliza las siguientes dependencias principales:

- Express: Marco de trabajo web para Node.js.
- Stripe: Biblioteca oficial de Stripe para Node.js.
- Body-parser: Middleware para analizar los cuerpos de las solicitudes entrantes.
- Cors: Middleware para habilitar el Intercambio de Recursos de Origen Cruzado (CORS).
- Dotenv: Cargar variables de entorno desde un archivo .env.
- Swagger-jsdoc: Para generar documentación Swagger a partir de comentarios JSDoc.
- Swagger-ui-express: Para servir el Swagger UI para la documentación de la API.

## Rutas documentadas con Swagger

![Rutas Swagger](./images/doc-swagger.png)
