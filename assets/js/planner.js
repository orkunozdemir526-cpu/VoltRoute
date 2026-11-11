function selectOptions(id,items){$(id).innerHTML=items.map(item=>`<option value="${item.id}">${item.name}</option>`).join('');}
selectOptions('origin',corridor);
selectOptions('destination',corridor);
selectOptions('vehicle',vehicles);

function setBatteryInfo(){
  const vehicle=currentVehicle();
  const soc=Number($('battery').value);
  $('batteryValue').value=`%${soc}`;
  $('range').textContent=`${localNum(Math.floor((soc-10)*vehicle.capacity/vehicle.use))} km`;
}
function showError(message=''){
  $('formError').textContent=message;
  $('formError').hidden=!message;
  const duplicate=Boolean(message)&&$('origin').value===$('destination').value;
  for(const id of ['origin','destination']){
    $(id).setAttribute('aria-invalid',duplicate);
    if(duplicate) $(id).setAttribute('aria-describedby','formError');
    else $(id).removeAttribute('aria-describedby');
  }
}
function calculatePlan(){
  const from=corridor.findIndex(city=>city.id===$('origin').value);
  const to=corridor.findIndex(city=>city.id===$('destination').value);
  if(from===to) return {error:'Kalkış ve varış için farklı konumlar seç.'};
  const start=corridor[from];
  const end=corridor[to];
  const direction=Math.sign(end.km-start.km);
  const distance=Math.abs(end.km-start.km);
  const vehicle=currentVehicle();
  const soc=Number($('battery').value);
  const energyPerKm=vehicle.use/100;
  const reserve=vehicle.capacity*.10;
  const chargeTarget=vehicle.capacity*.80;
  const candidates=stations.filter(station=>station.km!==null&&direction*(station.km-start.km)>0&&direction*(end.km-station.km)>0&&canCharge(station)).sort((a,b)=>direction*(a.km-b.km));
  const solutions=new Map();
  function bestAfter(index,km,energy){
    const arrival=energy-Math.abs(end.km-km)*energyPerKm;
    if(arrival>=reserve-1e-8) return {stops:[],minutes:0,cost:0,arrival:Math.round(100*arrival/vehicle.capacity)};
    if(solutions.has(index)) return solutions.get(index);
    let best=null;
    for(let next=index+1;next<candidates.length;next++){
      const station=candidates[next];
      const atStop=energy-Math.abs(station.km-km)*energyPerKm;
      if(atStop<reserve-1e-8) break;
      if(atStop>=chargeTarget) continue;
      const remainder=bestAfter(next,station.km,chargeTarget);
      if(!remainder) continue;
      const kwh=chargeTarget-atStop;
      const minutes=Math.ceil(60*kwh/(Math.min(station.kw,125)*.66));
      const option={stops:[{station,kwh,minutes},...remainder.stops],minutes:minutes+remainder.minutes,cost:kwh*station.rate+remainder.cost,arrival:remainder.arrival};
      if(!best||option.stops.length<best.stops.length||(option.stops.length===best.stops.length&&option.minutes<best.minutes)) best=option;
    }
    solutions.set(index,best);
    return best;
  }
  const result=bestAfter(-1,start.km,vehicle.capacity*soc/100);
  if(!result) return {error:'%10 batarya rezerviyle uygun rota bulunamadı. Başlangıç şarjını artır veya daha yakın bir kalkış noktası seç.'};
  const points=[];
  for(let i=Math.min(from,to);i<=Math.max(from,to);i++){
    const city=corridor[i];
    points.push([city.x,city.y]);
    if(i<Math.max(from,to)) points.push(...segments[i]);
  }
  return {...result,start,end,distance,points,travel:Math.ceil(distance/94*60)+result.minutes};
}
function planRoute(announce=false){
  const result=calculatePlan();
  showError(result.error);
  activePlan=result.error?null:result;
  renderSummary();
  renderMap();
  if(announce&&activePlan) notify(activePlan.stops.length?`Rota oluşturuldu · ${activePlan.stops.length} şarj durağı.`:'Rota oluşturuldu · Şarj durağı gerekmiyor.');
}
function clearPlan(){
  setBatteryInfo();
  showError();
  if(!activePlan) return;
  activePlan=null;
  renderSummary();
  renderMap();
}
function renderSummary(){
  const label='<h2 id="summaryTitle">Rota özeti</h2>';
  if(!activePlan){$('summary').innerHTML=`${label}<p class="summary-note">Güncel bilgilerinle rotayı oluşturduğunda özet burada görünecek.</p>`;return;}
  const {stops,distance,travel,arrival,cost}=activePlan;
  const duration=travel>=60?`${Math.floor(travel/60)} sa ${travel%60} dk`:`${travel} dk`;
  $('summary').innerHTML=`<div class="summary-top">${label}<span class="state">${icon('check')} Rota hazır</span></div>
    <div class="stats"><div><strong>${localNum(distance)} km</strong><small>Mesafe</small></div><div><strong>${duration}</strong><small>Şarj dâhil süre</small></div><div><strong>%${arrival}</strong><small>Varış şarjı</small></div></div>
    ${stops.map(({station,minutes})=>`<button class="stop" data-open-station="${station.id}"><span class="stop-ico">${icon('bolt')}</span><span><strong>${station.name}</strong><small>${station.network} · ${station.kw} kW · ~${minutes} dk şarj</small></span><span class="arr">${icon('chev')}</span></button>`).join('')}
    <p class="summary-note">${stops.length?`Tahmini şarj maliyeti ${localNum(cost)} ₺`:'Bu rota için şarj durağı gerekmiyor.'}</p>`;
}

