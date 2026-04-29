# PRD — Conversor de Unidades (Temperatura, Velocidad, Longitud, Volumen)

## 1. Descripción del producto
Aplicación digital que permite convertir valores entre diferentes unidades de temperatura, velocidad, longitud y volumen de forma rápida, precisa e intuitiva.

## 2. Objetivo
Desarrollar una herramienta que realice conversiones exactas en tiempo real, minimizando errores humanos y facilitando su uso tanto en contextos educativos como prácticos.

## 3. Alcance
El sistema cubrirá las siguientes magnitudes:
- Temperatura
- Velocidad
- Longitud
- Volumen

No incluye otras magnitudes en esta versión.

## 4. Usuarios objetivo
- Estudiantes
- Profesionales técnicos
- Público general

## 5. Requisitos funcionales
- RF1: Permitir ingreso de valores numéricos
- RF2: Permitir selección de magnitud
- RF3: Permitir selección de unidad de origen
- RF4: Permitir selección de unidad de destino
- RF5: Mostrar resultado automáticamente en tiempo real
- RF6: Validar entradas (evitar valores no numéricos)
- RF7: Permitir invertir unidades (swap)

## 6. Requisitos no funcionales
- RNF1: Tiempo de respuesta menor a 1 segundo
- RNF2: Precisión de hasta 6 decimales
- RNF3: Interfaz simple e intuitiva
- RNF4: Compatible con navegadores modernos
- RNF5: Bajo consumo de recursos

## 7. Unidades soportadas

### Temperatura
- Celsius (°C)
- Fahrenheit (°F)
- Kelvin (K)

### Velocidad
- m/s
- km/h
- mph
- nudos

### Longitud
- mm
- cm
- m
- km
- pulgadas
- pies

### Volumen
- ml
- L
- m³
- galones

## 8. Reglas de negocio
- Uso de estándares internacionales
- Fórmulas específicas para temperatura
- Evitar resultados inválidos

## 9. Flujo de usuario
1. Ingresar valor
2. Seleccionar magnitud
3. Seleccionar unidad origen
4. Seleccionar unidad destino
5. Mostrar resultado

## 10. Arquitectura
- Frontend: HTML, CSS, JavaScript
- Backend: No requerido (lógica local)

## 11. Métricas de éxito
- Precisión
- Rapidez
- Facilidad de uso
- Número de conversiones

## 12. Riesgos
- Errores en fórmulas
- Mala UX
- Confusión de unidades

## 13. Futuras mejoras
- Más magnitudes
- Historial
- Modo oscuro
- App móvil