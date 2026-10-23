# SheetFlow

Dashboard de inventario y movimientos construido sobre **Google Sheets + Google Apps Script**, con la interfaz en **React**.

El backend vive en Apps Script (ORM sobre una hoja de cálculo) y el frontend consume sus funciones a través de `google.script.run`. El build del frontend se empaqueta en un único HTML que Apps Script sirve como web app.

## Enlaces

| Recurso | URL |
| --- | --- |
| Aplicación (web app) | <https://script.google.com/macros/s/AKfycby55qOgUEm7oIcEWq2JDbQ6vwzRmdfLkZ4VIznUZfgzxXm4O3gZMQzjnH7y6NEL5e3X/exec> |
| Hoja de cálculo | <https://docs.google.com/spreadsheets/d/1iBjo0PRiY_12P-3aaFHYeeYnOqKHo8BpGgLWODfKtzU/edit?usp=sharing> |
| Proyecto Apps Script | <https://script.google.com/d/1L56jVCRcJObXe-shRWXCV6cADhzAywr7hOJV_RCS12AGjvFSOhnfZTbc/edit?usp=sharing> |
| ORM (ORMN) | <https://github.com/JhoanCuervo/ORMN> |

## Estructura

```
Code/
├── Backend/            # Proyecto de Apps Script (clasp)
│   ├── appsscript.json
│   ├── controler/      # Funciones expuestas y agregaciones del dashboard
│   └── model/          # Acceso a datos (ORM sobre Google Sheets)
└── Frontend/           # App React + Vite + Tailwind
    └── src/
```

## Requisitos

- Node.js 20+
- [clasp](https://github.com/google/clasp) (`npm i -g @google/clasp`) y una cuenta de Google

## Frontend

```bash
cd Frontend
npm install
npm start        # servidor de desarrollo (Vite)
npm run typecheck
```

> Fuera del entorno de Apps Script no existe `google.script.run`, así que en desarrollo
> las tarjetas y gráficas se quedan en su estado de "sin datos".

## Compilar y desplegar el backend

El frontend se compila a un único archivo que se escribe directamente en `Backend/`:

```bash
cd Frontend
npm run build          # genera ../Backend/index.html (ignorado por git)
```

Luego, desde `Backend/`:

```bash
clasp push             # sube el código a Apps Script
```

### Recrear la configuración de clasp

`Backend/.clasp.json` está ignorado por git porque contiene el `scriptId` de tu proyecto.
Para trabajar en un clon nuevo:

```bash
cd Backend
clasp clone 1L56jVCRcJObXe-shRWXCV6cADhzAywr7hOJV_RCS12AGjvFSOhnfZTbc
# o, para un proyecto nuevo: clasp create --title "SheetFlow" --type webapp
```

## Base de datos

El backend se conecta a una hoja de cálculo mediante el ORM externo **ORMN**
(<https://github.com/JhoanCuervo/ORMN>), declarado como librería en `Backend/appsscript.json`.

Si despliegas tu propia copia y quieres apuntar a **tu** hoja:

1. En el editor de Apps Script: **Configuración del proyecto → Propiedades de la secuencia de comandos**.
2. Agrega `SPREADSHEET_ID` con el ID de tu hoja de cálculo.
3. Crea las pestañas `Products`, `Categories`, `Movements` y `Configuracion` con los
   encabezados que espera el código (`id`, `name`, `color`, `stockCurrent`, `purchasePrice`, `type`, `amount`, `date`, ...).

## Seguridad

- La web app está configurada como `ANYONE_ANONYMOUS` en `appsscript.json`. Cámbialo si
  necesitas restringir el acceso.
- En Apps Script, **toda función de nivel superior es invocable desde el navegador**.
  Funciones como `getAllProducts`, `getAllMovements` o `getAllCategories` devuelven las
  tablas completas, así que no deben exponerse en un entorno con datos sensibles.
  (Las funciones terminadas en `_` son privadas.)
- La zona horaria está fijada a `America/Bogota`; ajústala en `appsscript.json`.
