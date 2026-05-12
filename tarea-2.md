# Tarea 2 — Validación de entrada y precisión de resultados

**Proyecto:** Conversor de Unidades  
**Nivel:** Principiante - Intermedio

## Objetivo
Mejorar la confiabilidad del conversor con dos cambios:
- validar que la entrada sea numérica (evitar conversiones silenciosas a `0`),
- estandarizar resultados con precisión de hasta 6 decimales.

## Problema detectado
En una versión previa se usaba `parseFloat(valor) || 0`, lo que ocultaba errores de entrada:
- si el usuario escribía texto o dejaba vacío, el sistema convertía como si fuera `0`.

## Alcance de esta tarea
Aplicar validación y formato en todos los módulos activos:
- Temperatura
- Área
- Longitud
- Velocidad
- Masa
- Volumen
- Moneda

## Paso 1 — Crear función de validación
Agregar una función para leer y validar inputs:

```js
function parseInputValue(id) {
  const raw = document.getElementById(id).value.trim()
  if (raw === '') return { ok: false, reason: 'empty' }

  const value = Number(raw)
  if (!Number.isFinite(value)) return { ok: false, reason: 'nan' }

  return { ok: true, value }
}
```

## Paso 2 — Crear estado inválido uniforme
Cuando un valor no es válido:
- limpiar el campo de resultado,
- mostrar `—`,
- mostrar mensaje claro al usuario.

```js
function setInvalidState(type, message) {
  document.getElementById(`${type}-result-input`).value = ''
  document.getElementById(`${type}-result`).textContent = '—'
  document.getElementById(`${type}-formula`).textContent = message
}
```

## Paso 3 — Ajustar formato a 6 decimales

```js
function fmt(n) {
  if (!Number.isFinite(n)) return '—'

  const rounded = Math.round(n * 1e6) / 1e6
  if (Math.abs(rounded) >= 1e10 || (Math.abs(rounded) < 0.000001 && rounded !== 0)) {
    return rounded.toExponential(4)
  }

  return rounded.toString()
}
```

## Paso 4 — Aplicar en cada convertidor
Aplicar el mismo patrón en funciones directas y reversas:
1. leer con `parseInputValue(...)`
2. si falla, usar `setInvalidState(...)` o mensaje equivalente
3. si pasa, convertir y renderizar con `fmt(...)`

Funciones cubiertas:
- `convertTemp`, `convertTempReverse`
- `convertArea`, `convertAreaReverse`
- `convertLength`, `convertLengthReverse`
- `convertSpeed`, `convertSpeedReverse`
- `convertMass`, `convertMassReverse`
- `convertVolume`, `convertVolumeReverse`
- `convertCurrency`

## Pruebas manuales
1. Escribir letras (`abc`) en cualquier campo origen y verificar mensaje de número inválido.
2. Borrar totalmente el valor y verificar que no convierta.
3. Probar decimales largos (`1.123456789`) y confirmar redondeo a 6 decimales.
4. Probar valores muy pequeños (`0.0000000123`) y confirmar notación científica.
5. Probar ida y vuelta (reverse) en módulos que la soportan.
6. Probar moneda con valor válido y verificar resultado + fórmula.
7. Desconectar internet y probar moneda para verificar manejo de error.

## Resultado esperado
- Sin entradas inválidas convertidas como cero.
- Resultados consistentes y legibles en todos los módulos.
- Mejor cumplimiento de validación de entrada y precisión numérica.
