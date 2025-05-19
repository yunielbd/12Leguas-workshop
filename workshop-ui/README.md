# Workshop UI

Aplicación frontend Angular v19 (standalone) con Tailwind CSS para gestionar el inventario de vehículos de un taller.

---

## 📋 Requisitos previos

- **Node.js** ≥ v20 (recomendado LTS)  
- **npm** ≥ v8  
- **Angular CLI** (se instala como dependencia de desarrollo)

---

## ⚙️ Instalación

1. Clona tu repositorio (o añade el remoto y haz pull):

```bash
   git clone <URL-de-tu-repo> workshop-ui
   cd workshop-ui
```

2. Instala las dependencias:

```bash
   npm install
```

---

## 🚀 Desarrollo

Arranca el servidor de desarrollo con live-reload:

```bash
npm start
# o directamente:
npx ng serve
```

- La app quedará disponible en [http://localhost:4200](http://localhost:4200)
- Cualquier cambio en el código recargará automáticamente el navegador.

---

## 📦 Build de producción

Para generar los archivos optimizados y listos para desplegar:

```bash
npx ng build --configuration production
```

Los ficheros compilados se dejarán en la carpeta `dist/workshop-ui`. Puedes servirlos con cualquier servidor estático (nginx, Firebase Hosting, GitHub Pages, etc.).

---

## 🖼️ Activos estáticos

- Coloca tus imágenes en `src/assets/img/…`
- Referéncialas siempre usando ruta absoluta:

  ```html
  <img src="/assets/img/mi-imagen.png" alt="…">
  ```

---

## 🌐 Entornos

Se manejan dos archivos de configuración:

- `src/environments/environment.ts`

  - `apiUrl: string` → URL del backend en **desarrollo** (por defecto `http://localhost:3000/api`)
- `src/environments/environment.prod.ts`

  - `apiUrl: string` → URL del backend en **producción**

Angular CLI usará automáticamente el correcto al compilar con `--configuration production`.

---

## 📂 Estructura básica

```
workshop-ui/
├── src/
│   ├── app/
│   │   ├── features/
│   │   │   ├── inventory/     ← Listado y tarjetas
│   │   │   ├── entry/         ← Formulario modal de entrada
│   │   ├── core/
│   │   │   └── services/      ← VehicleService con API calls
│   │   └── models/            ← Interfaces TypeScript
│   ├── assets/                ← Iconos e imágenes estáticas
│   ├── environments/          ← Configuración dev/prod
│   ├── styles.scss            ← Tailwind y estilos globales
│   └── main.ts                ← `bootstrapApplication()` y rutas
├── angular.json
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🔧 Tailwind CSS

- Las clases de utilidad se aplican en SCSS con `@apply`.
- Configurado en `tailwind.config.js` para procesar todos los templates `.html` y `.ts` bajo `src/`.

---

## ❓ Problemas comunes

- **404 en assets**:
  Asegúrate de usar rutas absolutas `/assets/...` y reinicia `ng serve` tras mover imágenes.
- **Modal muy alto**:
  El contenedor del modal tiene `max-h-[90vh] overflow-y-auto` en SCSS; ajusta si es necesario.
