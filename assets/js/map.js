function setZoom(value,x=50,y=50){zoom=value;center=[x,y];renderMap();}
function screenPosition(point){return `left:${point.x/10}%;top:${point.y/5.6}%`;}
function renderMap(){
  const route=activePlan?.points.map(([x,y],index)=>`${index?'L':'M'}${x} ${y}`).join(' ')??'';
  $('routeLine').setAttribute('d',route);
  $('routeUnder').setAttribute('d',route);
  const list=visibleStations();
  const [x,y]=center;
  const tx=Math.max((1-zoom)*100,Math.min(0,50-x*zoom));
  const ty=Math.max((1-zoom)*100,Math.min(0,50-y*zoom));
  const grouped=new Map();
  for(const station of list){
    if(!station.group||!filters.cluster||zoom>1) continue;
    if(!grouped.has(station.group)) grouped.set(station.group,[]);
    grouped.get(station.group).push(station);
  }
  const clusterMembers=new Set();
  const pins=[];
  for(const [group,members] of grouped){
    if(members.length<2) continue;
    members.forEach(station=>clusterMembers.add(station.id));
    const x=members.reduce((sum,station)=>sum+station.x,0)/members.length;
    const y=members.reduce((sum,station)=>sum+station.y,0)/members.length;
    pins.push(`<button type="button" class="marker cluster" data-cluster="${group}" data-x="${x/10}" data-y="${y/5.6}" style="${screenPosition({x,y})}" aria-label="${members.length} istasyonlu kümeyi aç" title="${members.length} istasyonlu kümeyi aç"><span class="pin">${members.length}</span></button>`);
  }
  const stopIds=new Set(activePlan?.stops.map(stop=>stop.station.id));
  for(const station of list){
    if(clusterMembers.has(station.id)) continue;
    const status=stationStatus(station);
    const left=station.x/10*zoom+tx;
    const top=station.y/5.6*zoom+ty;
    if(left<3||left>97||top<4||top>96) continue;
    pins.push(`<button type="button" class="marker${stopIds.has(station.id)?' recommended':''}" data-status="${status}" data-open-station="${station.id}" style="${screenPosition(station)}" aria-label="${station.name}, ${statusName[status]}" title="${station.name} · ${statusName[status]}"><span class="pin">${icon(statusIcon[status])}</span></button>`);
  }
  if(activePlan) pins.push(`<span class="route-dot" style="${screenPosition(activePlan.start)}" aria-hidden="true"></span><span class="route-dot end" style="${screenPosition(activePlan.end)}" aria-hidden="true"></span>`);
  const mapFocus=document.activeElement.closest('#pins')?.dataset.openStation;
  $('pins').innerHTML=pins.join('');
  if(mapFocus) $('pins').querySelector(`[data-open-station="${mapFocus}"]`)?.focus({preventScroll:true});
  $('scene').style.transform=`translate(${tx}%,${ty}%) scale(${zoom})`;
  $('zoomIn').disabled=zoom>1;
  $('zoomOut').disabled=zoom===1;
  $('heatLayer').hidden=!filters.heat;
  $('mapLabel').textContent=filters.heat?'BAKIŞ ODAĞI SİMÜLASYONU':'ŞEMATİK KORİDOR · ÖRNEK VERİ';
  for(const key of ['fast','available','cluster','heat']) $(key).setAttribute('aria-pressed',filters[key]);
  $('all').setAttribute('aria-pressed',!filters.fast&&!filters.available);
  const statusText=`${list.length} istasyon`;
  if($('count').textContent!==statusText) $('count').textContent=statusText;
  const sorted=list.sort((a,b)=>Number(stopIds.has(b.id))-Number(stopIds.has(a.id)));
  $('showStations').hidden=sorted.length<=3;
  $('showStations').setAttribute('aria-expanded',filters.expanded);
  $('showStations').textContent=filters.expanded?'Daha az göster':'Tümünü göster';
  const listFocus=document.activeElement.closest('#stationList')?.dataset.openStation;
  $('stationList').innerHTML=(filters.expanded?sorted:sorted.slice(0,3)).map(station=>{
    const status=stationStatus(station);
    return `<button class="station" data-open-station="${station.id}"><span class="badge-icon ${status}">${icon(statusIcon[status])}</span><span style="min-width:0"><strong>${station.name}</strong><small>${station.kw} kW · ${statusName[status]}</small></span><span class="arr">${icon('chev')}</span></button>`;
  }).join('')||'<p class="empty">Bu filtrelere uyan istasyon yok. Filtrelerden birini kaldırabilirsin.</p>';
  if(listFocus) $('stationList').querySelector(`[data-open-station="${listFocus}"]`)?.focus({preventScroll:true});
}

