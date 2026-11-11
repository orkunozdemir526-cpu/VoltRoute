$('planner').addEventListener('submit',event=>{event.preventDefault();planRoute(true);});
for(const id of ['origin','destination','vehicle','battery']) $(id).addEventListener('input',clearPlan);
$('swap').addEventListener('click',()=>{const from=$('origin').value;$('origin').value=$('destination').value;$('destination').value=from;clearPlan();});
$('sample').addEventListener('click',()=>loadSample(true));
for(const key of ['fast','available','cluster','heat']) $(key).addEventListener('click',()=>{filters[key]=!filters[key];renderMap();});
$('all').addEventListener('click',()=>{filters.fast=false;filters.available=false;renderMap();});
$('showStations').addEventListener('click',()=>{filters.expanded=!filters.expanded;renderMap();});
$('zoomIn').addEventListener('click',()=>{setZoom(1.55);$('zoomOut').focus({preventScroll:true});});
$('zoomOut').addEventListener('click',()=>{setZoom(1);$('zoomIn').focus({preventScroll:true});});
$('settingsButton').addEventListener('click',()=>$('settings').showModal());
$('contrast').addEventListener('change',()=>document.body.classList.toggle('contrast',$('contrast').checked));
$('theme').addEventListener('change',()=>document.body.classList.toggle('dark',$('theme').checked));
$('heatDemo').addEventListener('click',()=>{filters.heat=true;renderMap();showPage('plan');notify('Bakış odağı simülasyonu açıldı.');});
$('stationDialog').addEventListener('close',()=>{$('dialogToast').textContent='';if(document.activeElement===document.body) $('mapTitle').focus({preventScroll:true});});
$('mapTitle').tabIndex=-1;
document.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(!button) return;
  const {page,openStation:station,cluster,reserve,cancel,report}=button.dataset;
  if(page) showPage(page);
  if(button.hasAttribute('data-settings')) $('settings').showModal();
  if(station) openStation(station);
  if(cluster){
    setZoom(1.65,Number(button.dataset.x),Number(button.dataset.y));
    const first=visibleStations().find(station=>station.group===cluster);
    if(first) $('pins').querySelector(`[data-open-station="${first.id}"]`)?.focus({preventScroll:true});
  }
  if(reserve!==undefined) updateSocket('reserve',Number(reserve));
  if(cancel!==undefined) updateSocket('cancel',Number(cancel));
  if(report) reportStation(report);
});
setInterval(()=>{
  if(!holds.size) return;
  let expired=false;
  for(const [key,end] of holds){
    if(end<=Date.now()){holds.delete(key);expired=true;}
  }
  if(expired){renderMap();if($('stationDialog').open) renderStation();}
  $('stationDetails').querySelectorAll('[data-hold]').forEach(node=>{node.textContent=holdRemaining(holds.get(node.dataset.hold));});
},1000);
loadSample();
document.querySelectorAll('.input-row .chev').forEach(arrow => {
  arrow.addEventListener('click', () => {
    const select = arrow.closest('.input-row').querySelector('select');

    if (select) {
      select.focus();
      select.showPicker();
    }
  });
});