const reports=new Map();
const holds=new Map();
const filters={fast:false,available:false,cluster:true,heat:false,expanded:false};
let activePlan=null;
let selectedStation=null;
let zoom=1;
let center=[50,50];
let toastTimer;
