# Caja Registradora - Proyecto FreeCodeCamp

## Descripción del Proyecto

Este es un proyecto de **Caja Registradora** desarrollado como parte del currículo de FreeCodeCamp. La aplicación simula el funcionamiento de una caja registradora que calcula el cambio exacto que se debe devolver a un cliente después de una compra.

## Funcionalidades

- **Cálculo de Cambio**: Calcula automáticamente el cambio exacto basado en el dinero disponible en la caja
- **Gestión de Inventario**: Mantiene un registro del dinero disponible en diferentes denominaciones (centavos, monedas de 5¢, 10¢, 25¢, billetes de $1, $5, $10, $20, $100)
- **Estados de Caja**: 
  - `OPEN`: La caja tiene suficiente dinero para dar cambio
  - `CLOSED`: La caja se queda exactamente sin dinero después de la transacción
  - `INSUFFICIENT_FUNDS`: No hay suficiente dinero en la caja para dar el cambio
- **Validación de Entrada**: Verifica que el cliente tenga suficiente dinero para la compra
- **Interfaz Visual**: Muestra el estado actual del dinero en la caja y el cambio a devolver

## Tecnologías Utilizadas

- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos y diseño visual
- **JavaScript (ES6+)**: Lógica de la aplicación y manipulación del DOM
- **SVG**: Iconos y elementos gráficos

## Estructura del Proyecto

```
Cash-Register-Project/
├── index.html          # Página principal
├── script.js           # Lógica de la aplicación
├── styles.css          # Estilos CSS
├── assets/             # Recursos gráficos
│   ├── iconCashRegister.png
│   ├── Logo MiGaNg.svg
│   ├── logoMigang.svg
│   └── migang logo.png
└── README.md           # Documentación del proyecto
```

## Cómo Usar

1. Abre el archivo `index.html` en tu navegador web
2. Observa el precio del artículo ($3.26) y el dinero disponible en la caja
3. Ingresa la cantidad de dinero que el cliente está pagando
4. Haz clic en "Comprar" para calcular el cambio
5. La aplicación mostrará el estado de la caja y el cambio exacto a devolver

## Algoritmo de Cálculo

El algoritmo utiliza un enfoque de **greedy** (voraz) para calcular el cambio:

1. Comienza con las denominaciones más altas
2. Usa la mayor cantidad posible de cada denominación
3. Continúa con las denominaciones menores hasta completar el cambio
4. Verifica si hay suficiente dinero en la caja para completar la transacción

## Características Técnicas

- **Precisión Decimal**: Manejo preciso de cálculos monetarios usando `parseFloat()` y `toFixed(2)`
- **Actualización en Tiempo Real**: El inventario de la caja se actualiza después de cada transacción
- **Validación de Entrada**: Verificación de valores numéricos válidos y suficiencia de fondos
- **Interfaz Responsiva**: Diseño adaptativo para diferentes tamaños de pantalla

## Requisitos de FreeCodeCamp

Este proyecto cumple con los siguientes requisitos del desafío de FreeCodeCamp:

- ✅ Función que acepta precio, dinero del cliente y dinero en caja (cid)
- ✅ Retorna un objeto con status y change
- ✅ Maneja los tres estados: OPEN, CLOSED, INSUFFICIENT_FUNDS
- ✅ Calcula el cambio exacto usando el algoritmo greedy
- ✅ Actualiza el inventario de la caja después de cada transacción

## Autor

Desarrollado como parte del currículo de FreeCodeCamp - JavaScript Algorithms and Data Structures Certification.
