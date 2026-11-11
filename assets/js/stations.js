function notify(message){
  clearTimeout(toastTimer);
  $('toast').textContent='';
  $('dialogToast').textContent='';
  const target=$('stationDialog').open?$('dialogToast'):$('toast');
  target.textContent=message;
  toastTimer=setTimeout(()=>{target.textContent='';},3500);
}
function openStation(id){
  selectedStation=stationById(id);
  renderStation();
  $('stationDialog').showModal();
}
function holdRemaining(end){
  const seconds=Math.max(0,Math.ceil((end-Date.now())/1000));
  return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
}
function renderStation(){
  const station=selectedStation;
  const focus=document.activeElement.dataset.focus;
  const status=stationStatus(station);
  const report=reports.get(station.id);
  $('stationDetails').innerHTML=`<div class="dialog-top"><div><h2 id="stationTitle">${station.name}</h2><p>${station.network} · ${station.city} · ${localNum(station.rate,2)} ₺/kWh</p></div><form method="dialog"><button class="icon-btn" aria-label="İstasyon detayını kapat" data-focus="close" autofocus>${icon('close')}</button></form></div>
    <span class="chip ${status}">${icon(statusIcon[status])}${statusName[status]} soket durumu</span>
    <h3>Soketler</h3>${station.sockets.map((_,index)=>{
      const state=socketStatus(station,index);
      const held=isHeld(station,index);
      const connector=station.acSocket===index?'Type 2 · 22 kW':`CCS2 · ${station.kw} kW`;
      return `<div class="socket"><div><strong>${connector} · Soket ${index+1}</strong>${held?`<small class="reserved-text">Demo rezervasyonu · <span data-hold="${holdKey(station,index)}">${holdRemaining(holds.get(holdKey(station,index)))}</span></small>`:`<small>${statusName[state]}</small>`}</div>
        ${held?`<button class="sample" data-cancel="${index}" data-focus="socket${index}">İptal et</button>`:`<button class="primary" data-reserve="${index}" data-focus="socket${index}" aria-label="Soket ${index+1} için 15 dakikalık demo rezervasyonu" ${state!=='ok'?'disabled':''}>15 dk ayır</button>`}</div>`;
    }).join('')}
    <h3>Durum bildir</h3><div class="report">${Object.entries(reportText).map(([key,label])=>`<button class="chip" data-report="${key}" data-focus="report${key}" aria-pressed="${report?.status===key}">${icon(statusIcon[key])}${label}</button>`).join('')}</div>
    <p class="dialog-note">${report?`Son demo bildirimi: ${reportText[report.status]}. `:''}Rezervasyonlar ve bildirimler bu oturumda simüle edilir.</p>`;
  if(focus&&$('stationDialog').open) $('stationDetails').querySelector(`[data-focus="${focus}"]`)?.focus({preventScroll:true});
}
function updateSocket(action,index){
  const key=holdKey(selectedStation,index);
  if(action==='reserve'){
    if(socketStatus(selectedStation,index)!=='ok'||isHeld(selectedStation,index)) return;
    holds.set(key,Date.now()+15*60*1000);
  }else{holds.delete(key);}
  renderStation();
  renderMap();
  notify(action==='reserve'?'Soket 15 dakikalığına demo için ayrıldı.':'Demo rezervasyonu iptal edildi.');
}
function reportStation(state){
  reports.set(selectedStation.id,{status:state});
  if(state!=='ok') selectedStation.sockets.forEach((_,index)=>holds.delete(holdKey(selectedStation,index)));
  const needReplan=activePlan?.stops.some(stop=>stop.station.id===selectedStation.id)&&!canCharge(selectedStation);
  if(needReplan) planRoute();
  else renderMap();
  renderStation();
  notify(needReplan?`Bildirim kaydedildi. ${activePlan?'Rota yeniden hesaplandı.':'Bu şarjla uygun alternatif bulunamadı.'}`:'Demo durum bildirimi kaydedildi.');
}
