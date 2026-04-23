// TABS
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

function swapUnits(type) {
  const from = document.getElementById(`${type}-from`);
  const to   = document.getElementById(`${type}-to`);
  [from.value, to.value] = [to.value, from.value];
  window[`convert${type.charAt(0).toUpperCase()+type.slice(1)}`]();
}

function fmt(n) {
  if (isNaN(n) || !isFinite(n)) return '—';
  if (Math.abs(n) >= 1e10 || (Math.abs(n) < 0.0001 && n !== 0)) return n.toExponential(4);
  return parseFloat(n.toPrecision(7)).toString();
}

const LABELS = {
  temp:   { C:'°C', F:'°F', K:'K' },
  area:   { m2:'m²', km2:'km²', cm2:'cm²', ft2:'ft²', in2:'in²', mi2:'mi²', ha:'ha', acre:'acre' },
  length: { m:'m', km:'km', cm:'cm', mm:'mm', mi:'mi', yd:'yd', ft:'ft', in:'in', nm:'nm' },
  speed:  { kmh:'km/h', ms:'m/s', mph:'mph', knot:'nudos', mach:'Mach', fts:'ft/s' }
};
function ul(type, key) { return LABELS[type][key] || key; }

// TEMPERATURA
function toK(v, u) {
  if (u==='C') return v + 273.15;
  if (u==='F') return (v-32)*5/9 + 273.15;
  return v;
}
function fromK(k, u) {
  if (u==='C') return k - 273.15;
  if (u==='F') return (k-273.15)*9/5 + 32;
  return k;
}
function convertTemp() {
  const v = parseFloat(document.getElementById('temp-val').value)||0;
  const f = document.getElementById('temp-from').value;
  const t = document.getElementById('temp-to').value;
  const r = fromK(toK(v,f),t);
  document.getElementById('temp-result-input').value = fmt(r);
  document.getElementById('temp-result').textContent  = `${fmt(r)} ${ul('temp',t)}`;
  document.getElementById('temp-formula').textContent = `${v} ${ul('temp',f)} → ${fmt(r)} ${ul('temp',t)}`;
}
function convertTempReverse() {
  const v = parseFloat(document.getElementById('temp-result-input').value)||0;
  const f = document.getElementById('temp-to').value;
  const t = document.getElementById('temp-from').value;
  const r = fromK(toK(v,f),t);
  document.getElementById('temp-val').value = fmt(r);
  document.getElementById('temp-result').textContent  = `${fmt(v)} ${ul('temp',f)}`;
  document.getElementById('temp-formula').textContent = `${fmt(r)} ${ul('temp',t)} → ${fmt(v)} ${ul('temp',f)}`;
}

// ÁREA
const A2M2 = { m2:1, km2:1e6, cm2:1e-4, ft2:0.092903, in2:6.4516e-4, mi2:2589988.11, ha:10000, acre:4046.86 };
function convertArea() {
  const v = parseFloat(document.getElementById('area-val').value)||0;
  const f = document.getElementById('area-from').value;
  const t = document.getElementById('area-to').value;
  const r = v * A2M2[f] / A2M2[t];
  document.getElementById('area-result-input').value = fmt(r);
  document.getElementById('area-result').textContent  = `${fmt(r)} ${ul('area',t)}`;
  document.getElementById('area-formula').textContent = `${v} ${ul('area',f)} → ${fmt(r)} ${ul('area',t)}`;
}
function convertAreaReverse() {
  const v = parseFloat(document.getElementById('area-result-input').value)||0;
  const f = document.getElementById('area-to').value;
  const t = document.getElementById('area-from').value;
  const r = v * A2M2[f] / A2M2[t];
  document.getElementById('area-val').value = fmt(r);
  document.getElementById('area-result').textContent  = `${fmt(v)} ${ul('area',f)}`;
  document.getElementById('area-formula').textContent = `${fmt(r)} ${ul('area',t)} → ${fmt(v)} ${ul('area',f)}`;
}

// LONGITUD
const L2M = { m:1, km:1000, cm:0.01, mm:0.001, mi:1609.344, yd:0.9144, ft:0.3048, in:0.0254, nm:1852 };
function convertLength() {
  const v = parseFloat(document.getElementById('length-val').value)||0;
  const f = document.getElementById('length-from').value;
  const t = document.getElementById('length-to').value;
  const r = v * L2M[f] / L2M[t];
  document.getElementById('length-result-input').value = fmt(r);
  document.getElementById('length-result').textContent  = `${fmt(r)} ${ul('length',t)}`;
  document.getElementById('length-formula').textContent = `${v} ${ul('length',f)} → ${fmt(r)} ${ul('length',t)}`;
}
function convertLengthReverse() {
  const v = parseFloat(document.getElementById('length-result-input').value)||0;
  const f = document.getElementById('length-to').value;
  const t = document.getElementById('length-from').value;
  const r = v * L2M[f] / L2M[t];
  document.getElementById('length-val').value = fmt(r);
  document.getElementById('length-result').textContent  = `${fmt(v)} ${ul('length',f)}`;
  document.getElementById('length-formula').textContent = `${fmt(r)} ${ul('length',t)} → ${fmt(v)} ${ul('length',f)}`;
}

// VELOCIDAD
const S2MS = { kmh:1/3.6, ms:1, mph:0.44704, knot:0.514444, mach:343, fts:0.3048 };
function convertSpeed() {
  const v = parseFloat(document.getElementById('speed-val').value)||0;
  const f = document.getElementById('speed-from').value;
  const t = document.getElementById('speed-to').value;
  const r = v * S2MS[f] / S2MS[t];
  document.getElementById('speed-result-input').value = fmt(r);
  document.getElementById('speed-result').textContent  = `${fmt(r)} ${ul('speed',t)}`;
  document.getElementById('speed-formula').textContent = `${v} ${ul('speed',f)} → ${fmt(r)} ${ul('speed',t)}`;
}
function convertSpeedReverse() {
  const v = parseFloat(document.getElementById('speed-result-input').value)||0;
  const f = document.getElementById('speed-to').value;
  const t = document.getElementById('speed-from').value;
  const r = v * S2MS[f] / S2MS[t];
  document.getElementById('speed-val').value = fmt(r);
  document.getElementById('speed-result').textContent  = `${fmt(v)} ${ul('speed',f)}`;
  document.getElementById('speed-formula').textContent = `${fmt(r)} ${ul('speed',t)} → ${fmt(v)} ${ul('speed',f)}`;
}

// INIT
convertTemp();
convertArea();
convertLength();
convertSpeed();
