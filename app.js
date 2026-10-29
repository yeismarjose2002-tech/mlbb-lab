const lanes = Object.keys(TIER_DATA);
const laneTabs = document.getElementById('laneTabs');
const board = document.getElementById('tierBoard');
const search = document.getElementById('search');
const count = document.getElementById('heroCount');
const empty = document.getElementById('empty');
let activeLane = 'Jungle';
function renderTabs(){laneTabs.innerHTML='';lanes.forEach(lane=>{const b=document.createElement('button');b.className='lane-btn'+(lane===activeLane?' active':'');b.textContent=lane==='EXP Lane'?'EXP':lane==='Mid Lane'?'MID':lane.toUpperCase();b.onclick=()=>{activeLane=lane;renderTabs();renderBoard()};laneTabs.appendChild(b)})}
function renderBoard(){const q=search.value.trim().toLocaleLowerCase('es');board.innerHTML='';let total=0,visible=0;['SS','S','A','B','C','D'].forEach(tier=>{const heroes=TIER_DATA[activeLane][tier]||[];total+=heroes.length;const filtered=heroes.filter(h=>h.toLocaleLowerCase('es').includes(q));if(!filtered.length)return;visible+=filtered.length;const row=document.createElement('div');row.className='tier-row';const label=document.createElement('div');label.className='tier-label '+tier.toLowerCase();label.textContent=tier;const list=document.createElement('div');list.className='heroes';filtered.forEach(name=>{const chip=document.createElement('span');chip.className='hero-chip';chip.textContent=name;list.appendChild(chip)});row.append(label,list);board.appendChild(row)});count.textContent=`${visible} / ${total} HÉROES`;empty.hidden=visible!==0}
search.addEventListener('input',renderBoard);renderTabs();renderBoard();
