# Sistema de manejo de productos

API RESTful para gestionar un sistema de manejo de productos con Node.js, Express y MySQL.

## Características

- Sistema de ingreso y gestion con validaciones
- Base de datos MySQL

## Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/cjotasM/storage.git
cd storage
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor:
```bash
# Modo desarrollo
npm run dev

```

## URL base

la API está disponible en:
```
http://localhost:3000/
```

### Endpoints Principales

#### productos
- `GET api/products`: Listar productos
- `GET api/products/{id}`: Obtener producto por ID
- `DELETE api/products/{id}`: Eliminar producto
- `PUT api/products/{id}`: Actualizar producto

#### Categorias
- `GET api/categories`: Listar productos
- `GET api/categories/{id}`: Obtener producto por ID
- `DELETE api/categories/{id}`: Eliminar producto
- `PUT api/categories/{id}`: Actualizar producto





## Estructura del Proyecto

```
 ├──storage/   
    ├──backend/
        ├── src/
        │   ├── config/
        │   │   ├── database.js
        │   │   └── swagger.js
        │   ├── controllers/
        │   │   ├── categoriesController.js
        │   │   ├── productsController.js
        │   ├── routes/
        │   │   ├── categoriesRoute.js
        │   │   ├── productsRoute.js
        │   └── app.js
        ├── .env
        ├── package.json
        └── README.md
```
## Licencia

Este proyecto está bajo la Licencia ISC.