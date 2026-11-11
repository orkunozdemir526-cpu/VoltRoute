function showPage(page){
  for(const id of ['plan','design','lab']) $(id+'Page').hidden=id!==page;
  document.querySelectorAll('.tab').forEach(tab=>{
    if(tab.dataset.page===page) tab.setAttribute('aria-current','page');
    else tab.removeAttribute('aria-current');
  });
  $(page==='plan'?'pageTitle':`${page}Title`).setAttribute('tabindex','-1');
  $(page==='plan'?'pageTitle':`${page}Title`).focus();
}
function loadSample(announce=false){
  $('origin').value='ankara';
  $('destination').value='istanbul';
  $('vehicle').value='togg';
  $('battery').value='64';
  filters.fast=false;
  filters.available=false;
  filters.expanded=false;
  zoom=1;
  center=[50,50];
  setBatteryInfo();
  planRoute(announce);
}

