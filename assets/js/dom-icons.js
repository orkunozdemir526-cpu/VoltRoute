
const $ = id => document.getElementById(id);
const icons = {
  bolt:'<path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z"/>', map:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z M9 3v15m6-12v15"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>', chart:'<path d="M3 3v18h18M8 16v-4m5 4V7m5 9v-7"/>',
  settings:'<path d="M4 7h16M4 12h16M4 17h16"/><circle cx="8" cy="7" r="2" fill="var(--surface)"/><circle cx="15" cy="12" r="2" fill="var(--surface)"/><circle cx="10" cy="17" r="2" fill="var(--surface)"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',refresh:'<path d="M20 10a8 8 0 1 0 0 5m0-11v6h-6"/>',
  route:'<circle cx="5" cy="17" r="2"/><circle cx="19" cy="7" r="2"/><path d="M7 17h8a2.5 2.5 0 0 0 0-5H9a2.5 2.5 0 0 1 0-5h8"/>',circle:'<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/>',
  pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',down:'<path d="m6 9 6 6 6-6"/>',swap:'<path d="M8 20V4L5 7m3-3 3 3m5-3v16l-3-3m3 3 3-3"/>',
  car:'<path d="m4 11 2-5h12l2 5m-16 0h16v7H4v-7Zm2 7v2m12-2v2M7 14h1m8 0h1"/>', battery:'<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M22 10v4M7 10v4m4-4v4m4-4v4"/>',
  arrow:'<path d="M4 12h15m-5-5 5 5-5 5"/>',chev:'<path d="m9 6 6 6-6 6"/>', cluster:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  eye:'<path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',check:'<path d="m5 12 4 4L19 6"/>',clock:'<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
  alert:'<path d="M12 3 2.8 20h18.4L12 3Zm0 6v4m0 3v.3"/>',plus:'<path d="M5 12h14M12 5v14"/>',minus:'<path d="M5 12h14"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8v.3"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>'
};
function icon(name){return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;}
document.querySelectorAll('[data-icon]').forEach(node=>{node.innerHTML=icon(node.dataset.icon);});

