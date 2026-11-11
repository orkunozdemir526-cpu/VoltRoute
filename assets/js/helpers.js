const localNum=(value,digits=0)=>value.toLocaleString('tr-TR',{minimumFractionDigits:digits,maximumFractionDigits:digits});
const currentVehicle=()=>vehicles.find(vehicle=>vehicle.id===$('vehicle').value);
const stationById=id=>stations.find(station=>station.id===id);
const holdKey=(station,index)=>`${station.id}/${index}`;
const socketStatus=(station,index)=>reports.get(station.id)?.status??station.sockets[index];
const isHeld=(station,index)=>(holds.get(holdKey(station,index))??0)>Date.now();
const canCharge=station=>station.sockets.some((_,index)=>station.acSocket!==index&&socketStatus(station,index)==='ok');
const stationStatus=station=>station.sockets.some((_,index)=>socketStatus(station,index)==='ok'&&!isHeld(station,index))?'ok':station.sockets.every((_,index)=>socketStatus(station,index)==='fault')?'fault':'busy';
const visibleStations=()=>stations.filter(station=>(!filters.fast||station.kw>120)&&(!filters.available||station.sockets.some((_,index)=>(!filters.fast||station.acSocket!==index)&&socketStatus(station,index)==='ok'&&!isHeld(station,index))));

