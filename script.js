// TABS
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'))
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'))
    btn.classList.add('active')
    document.getElementById(btn.dataset.tab).classList.add('active')
  })
})

function swapUnits(type) {
  const from = document.getElementById(`${type}-from`)
  const to = document.getElementById(`${type}-to`)
  ;[from.value, to.value] = [to.value, from.value]
  window[`convert${type.charAt(0).toUpperCase() + type.slice(1)}`]()
}

function fmt(n) {
  if (!Number.isFinite(n)) return '—'

  const rounded = Math.round(n * 1e6) / 1e6
  if (Math.abs(rounded) >= 1e10 || (Math.abs(rounded) < 0.000001 && rounded !== 0)) {
    return rounded.toExponential(4)
  }

  return rounded.toString()
}

function parseInputValue(id) {
  const raw = document.getElementById(id).value.trim()
  if (raw === '') return { ok: false, reason: 'empty' }

  const value = Number(raw)
  if (!Number.isFinite(value)) return { ok: false, reason: 'nan' }

  return { ok: true, value }
}

function setInvalidState(type, message) {
  document.getElementById(`${type}-result-input`).value = ''
  document.getElementById(`${type}-result`).textContent = '—'
  document.getElementById(`${type}-formula`).textContent = message
}

const LABELS = {
  temp: { C: '°C', F: '°F', K: 'K' },
  area: { m2: 'm²', km2: 'km²', cm2: 'cm²', ft2: 'ft²', in2: 'in²', mi2: 'mi²', ha: 'ha', acre: 'acre' },
  length: { m: 'm', km: 'km', cm: 'cm', mm: 'mm', mi: 'mi', yd: 'yd', ft: 'ft', in: 'in', nm: 'nm' },
  speed: { kmh: 'km/h', ms: 'm/s', mph: 'mph', knot: 'nudos', mach: 'Mach', fts: 'ft/s' },
  mass: { kg: 'kg', g: 'g', lb: 'lb', oz: 'oz' },
  volume: { l: 'L', ml: 'ml', m3: 'm³', gal: 'gal' }
}
function ul(type, key) {
  return LABELS[type]?.[key] || key
}

// TEMPERATURA
function toK(v, u) {
  if (u === 'C') return v + 273.15
  if (u === 'F') return (v - 32) * 5 / 9 + 273.15
  return v
}
function fromK(k, u) {
  if (u === 'C') return k - 273.15
  if (u === 'F') return (k - 273.15) * 9 / 5 + 32
  return k
}
function convertTemp() {
  const input = parseInputValue('temp-val')
  if (!input.ok) return setInvalidState('temp', 'Ingresa un número válido en origen.')

  const v = input.value
  const f = document.getElementById('temp-from').value
  const t = document.getElementById('temp-to').value
  const r = fromK(toK(v, f), t)

  document.getElementById('temp-result-input').value = fmt(r)
  document.getElementById('temp-result').textContent = `${fmt(r)} ${ul('temp', t)}`
  document.getElementById('temp-formula').textContent = `${fmt(v)} ${ul('temp', f)} → ${fmt(r)} ${ul('temp', t)}`
}
function convertTempReverse() {
  const input = parseInputValue('temp-result-input')
  if (!input.ok) {
    document.getElementById('temp-val').value = ''
    return setInvalidState('temp', 'Ingresa un número válido en destino.')
  }

  const v = input.value
  const f = document.getElementById('temp-to').value
  const t = document.getElementById('temp-from').value
  const r = fromK(toK(v, f), t)

  document.getElementById('temp-val').value = fmt(r)
  document.getElementById('temp-result').textContent = `${fmt(v)} ${ul('temp', f)}`
  document.getElementById('temp-formula').textContent = `${fmt(r)} ${ul('temp', t)} → ${fmt(v)} ${ul('temp', f)}`
}

// AREA
const A2M2 = { m2: 1, km2: 1e6, cm2: 1e-4, ft2: 0.092903, in2: 6.4516e-4, mi2: 2589988.11, ha: 10000, acre: 4046.86 }
function convertArea() {
  const input = parseInputValue('area-val')
  if (!input.ok) return setInvalidState('area', 'Ingresa un número válido en origen.')

  const v = input.value
  const f = document.getElementById('area-from').value
  const t = document.getElementById('area-to').value
  const r = v * A2M2[f] / A2M2[t]

  document.getElementById('area-result-input').value = fmt(r)
  document.getElementById('area-result').textContent = `${fmt(r)} ${ul('area', t)}`
  document.getElementById('area-formula').textContent = `${fmt(v)} ${ul('area', f)} → ${fmt(r)} ${ul('area', t)}`
}
function convertAreaReverse() {
  const input = parseInputValue('area-result-input')
  if (!input.ok) {
    document.getElementById('area-val').value = ''
    return setInvalidState('area', 'Ingresa un número válido en destino.')
  }

  const v = input.value
  const f = document.getElementById('area-to').value
  const t = document.getElementById('area-from').value
  const r = v * A2M2[f] / A2M2[t]

  document.getElementById('area-val').value = fmt(r)
  document.getElementById('area-result').textContent = `${fmt(v)} ${ul('area', f)}`
  document.getElementById('area-formula').textContent = `${fmt(r)} ${ul('area', t)} → ${fmt(v)} ${ul('area', f)}`
}

// LONGITUD
const L2M = { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, yd: 0.9144, ft: 0.3048, in: 0.0254, nm: 1852 }
function convertLength() {
  const input = parseInputValue('length-val')
  if (!input.ok) return setInvalidState('length', 'Ingresa un número válido en origen.')

  const v = input.value
  const f = document.getElementById('length-from').value
  const t = document.getElementById('length-to').value
  const r = v * L2M[f] / L2M[t]

  document.getElementById('length-result-input').value = fmt(r)
  document.getElementById('length-result').textContent = `${fmt(r)} ${ul('length', t)}`
  document.getElementById('length-formula').textContent = `${fmt(v)} ${ul('length', f)} → ${fmt(r)} ${ul('length', t)}`
}
function convertLengthReverse() {
  const input = parseInputValue('length-result-input')
  if (!input.ok) {
    document.getElementById('length-val').value = ''
    return setInvalidState('length', 'Ingresa un número válido en destino.')
  }

  const v = input.value
  const f = document.getElementById('length-to').value
  const t = document.getElementById('length-from').value
  const r = v * L2M[f] / L2M[t]

  document.getElementById('length-val').value = fmt(r)
  document.getElementById('length-result').textContent = `${fmt(v)} ${ul('length', f)}`
  document.getElementById('length-formula').textContent = `${fmt(r)} ${ul('length', t)} → ${fmt(v)} ${ul('length', f)}`
}

// VELOCIDAD
const S2MS = { kmh: 1 / 3.6, ms: 1, mph: 0.44704, knot: 0.514444, mach: 343, fts: 0.3048 }
function convertSpeed() {
  const input = parseInputValue('speed-val')
  if (!input.ok) return setInvalidState('speed', 'Ingresa un número válido en origen.')

  const v = input.value
  const f = document.getElementById('speed-from').value
  const t = document.getElementById('speed-to').value
  const r = v * S2MS[f] / S2MS[t]

  document.getElementById('speed-result-input').value = fmt(r)
  document.getElementById('speed-result').textContent = `${fmt(r)} ${ul('speed', t)}`
  document.getElementById('speed-formula').textContent = `${fmt(v)} ${ul('speed', f)} → ${fmt(r)} ${ul('speed', t)}`
}
function convertSpeedReverse() {
  const input = parseInputValue('speed-result-input')
  if (!input.ok) {
    document.getElementById('speed-val').value = ''
    return setInvalidState('speed', 'Ingresa un número válido en destino.')
  }

  const v = input.value
  const f = document.getElementById('speed-to').value
  const t = document.getElementById('speed-from').value
  const r = v * S2MS[f] / S2MS[t]

  document.getElementById('speed-val').value = fmt(r)
  document.getElementById('speed-result').textContent = `${fmt(v)} ${ul('speed', f)}`
  document.getElementById('speed-formula').textContent = `${fmt(r)} ${ul('speed', t)} → ${fmt(v)} ${ul('speed', f)}`
}

// MASA
const M2G = { kg: 1000, g: 1, lb: 453.592, oz: 28.3495 }
function convertMass() {
  const input = parseInputValue('mass-val')
  if (!input.ok) return setInvalidState('mass', 'Ingresa un número válido en origen.')

  const v = input.value
  const f = document.getElementById('mass-from').value
  const t = document.getElementById('mass-to').value
  const r = v * M2G[f] / M2G[t]

  document.getElementById('mass-result-input').value = fmt(r)
  document.getElementById('mass-result').textContent = `${fmt(r)} ${ul('mass', t)}`
  document.getElementById('mass-formula').textContent = `${fmt(v)} ${ul('mass', f)} → ${fmt(r)} ${ul('mass', t)}`
}
function convertMassReverse() {
  const input = parseInputValue('mass-result-input')
  if (!input.ok) {
    document.getElementById('mass-val').value = ''
    return setInvalidState('mass', 'Ingresa un número válido en destino.')
  }

  const v = input.value
  const f = document.getElementById('mass-to').value
  const t = document.getElementById('mass-from').value
  const r = v * M2G[f] / M2G[t]

  document.getElementById('mass-val').value = fmt(r)
  document.getElementById('mass-result').textContent = `${fmt(v)} ${ul('mass', f)}`
  document.getElementById('mass-formula').textContent = `${fmt(r)} ${ul('mass', t)} → ${fmt(v)} ${ul('mass', f)}`
}

// =======================
// CLIMA EN TIEMPO REAL
// =======================

async function getWeather() {

  const city =
    document.getElementById("weather-country").value;

  const apiKey = "f884dbe41a53a8bee26c1f5fa456658b";

  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

  try {

    const response = await fetch(url);

    const data = await response.json();

    const temp = data.main.temp;

    const description = data.weather[0].description;

    document.getElementById("weather-result").textContent =
      `${temp} °C`;

    document.getElementById("weather-info").textContent =
      description;

  } catch (error) {

    document.getElementById("weather-result").textContent =
      "Error";

  }
}

// VOLUMEN
const V2L = { l: 1, ml: 0.001, m3: 1000, gal: 3.78541 }
function convertVolume() {
  const input = parseInputValue('volume-val')
  if (!input.ok) return setInvalidState('volume', 'Ingresa un número válido en origen.')

  const v = input.value
  const f = document.getElementById('volume-from').value
  const t = document.getElementById('volume-to').value
  const r = v * V2L[f] / V2L[t]

  document.getElementById('volume-result-input').value = fmt(r)
  document.getElementById('volume-result').textContent = `${fmt(r)} ${ul('volume', t)}`
  document.getElementById('volume-formula').textContent = `${fmt(v)} ${ul('volume', f)} → ${fmt(r)} ${ul('volume', t)}`
}
function convertVolumeReverse() {
  const input = parseInputValue('volume-result-input')
  if (!input.ok) {
    document.getElementById('volume-val').value = ''
    return setInvalidState('volume', 'Ingresa un número válido en destino.')
  }

  const v = input.value
  const f = document.getElementById('volume-to').value
  const t = document.getElementById('volume-from').value
  const r = v * V2L[f] / V2L[t]

  document.getElementById('volume-val').value = fmt(r)
  document.getElementById('volume-result').textContent = `${fmt(v)} ${ul('volume', f)}`
  document.getElementById('volume-formula').textContent = `${fmt(r)} ${ul('volume', t)} → ${fmt(v)} ${ul('volume', f)}`
}

// MONEDA
async function convertCurrency() {
  const amountInput = parseInputValue('currency-val')
  if (!amountInput.ok) {
    setInvalidState('currency', 'Ingresa un número válido en origen.')
    return
  }

  const amount = amountInput.value
  const from = document.getElementById('currency-from').value
  const to = document.getElementById('currency-to').value

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    const data = await response.json()
    const rate = data.rates[to]
    const result = amount * rate

    document.getElementById('currency-result-input').value = fmt(result)
    document.getElementById('currency-result').textContent = `${fmt(result)} ${to}`
    document.getElementById('currency-formula').textContent = `${fmt(amount)} ${from} → ${fmt(result)} ${to}`
  } catch (error) {
    document.getElementById('currency-result-input').value = ''
    document.getElementById('currency-result').textContent = 'Error'
    document.getElementById('currency-formula').textContent = 'No se pudo consultar la tasa de cambio.'
    console.error('Error:', error)
  }
}

// =========================
// LIMITAR INPUTS
// =========================

function limitInput(id, maxLength) {
  const input = document.getElementById(id);

  input.addEventListener("input", () => {

    // eliminar negativos, letras y símbolos raros
    input.value = input.value.replace(/[^0-9.]/g, "");

    // evitar múltiples puntos decimales
    const parts = input.value.split(".");
    if (parts.length > 2) {
      input.value = parts[0] + "." + parts[1];
    }

    // limitar cantidad de caracteres
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }

  });
}

// =========================
// LIMITES
// =========================

limitInput("temp-val", 15);

limitInput("area-val", 15);

limitInput("length-val", 15);

limitInput("speed-val", 15);

limitInput("mass-val", 15);

limitInput("volume-val", 15);

limitInput("currency-val", 15);

// INIT
convertTemp()
convertArea()
convertLength()
convertSpeed()
convertMass()
convertVolume()
getWeather()
