# Conversor Universal de Unidades

Aplicación web desarrollada con **HTML, CSS y JavaScript** para convertir unidades de forma rápida y clara.

## Objetivo
Facilitar conversiones en contexto educativo y práctico, reduciendo errores manuales y mostrando resultados con formato consistente.

## Funcionalidades implementadas
- Conversión de **temperatura** (°C, °F, K)
- Conversión de **área** (m², km², cm², ft², in², mi², ha, acre)
- Conversión de **longitud** (m, km, cm, mm, mi, yd, ft, in, nm)
- Conversión de **velocidad** (km/h, m/s, mph, nudos, Mach, ft/s)
- Conversión de **masa** (kg, g, lb, oz)
- Conversión de **volumen** (L, ml, m³, gal)
- Conversión de **moneda** (consultando tasa en línea)
- Intercambio de unidades origen/destino (`swap`)
- Validación de entradas numéricas
- Formato de salida con precisión de hasta 6 decimales

## Tecnologías
- HTML5
- CSS3
- JavaScript (vanilla)

## Estructura del proyecto
```text
convertidor-de-unidades-de-1113/
├── index.html
├── script.js
├── PRD.md
└── README.md
```

## Cómo ejecutar
1. Clona o descarga el repositorio.
2. Abre `index.html` en tu navegador.
3. Selecciona módulo, unidades y valor para convertir.

## Notas importantes
- El módulo de moneda depende de internet para consultar tasas.
- Si no hay conexión, el sistema muestra un mensaje de error en ese módulo.

## Integrantes
- Andry Sanabria
- Braian Otalora
- Victor Moya
- Michael Otalora

## Estado del proyecto
- Interfaz y lógica principal implementadas.
- Mejoras futuras sugeridas:
  - Historial de conversiones
  - Mejoras de accesibilidad
  - Pruebas automáticas
