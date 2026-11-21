/* Public demonstration only. No live data or authentication. */
const jobs = [
  {wo:'DEMO-1001',part:'Sample turned housing',customer:'Example Customer A',due:'24-11-2026',progress:75,status:'In progress',op:'OP20 · Turning'},
  {wo:'DEMO-1002',part:'Sample mounting bracket',customer:'Example Customer B',due:'20-11-2026',progress:40,status:'Overdue',op:'OP10 · Milling'},
  {wo:'DEMO-1003',part:'Sample inspection fixture',customer:'Example Customer A',due:'26-11-2026',progress:100,status:'Ready',op:'OP30 · Inspection'}
];
let role='office',page='home',query='',selectedWo=null,returnPage='orders';
const $=s=>document.querySelector(s), screen=$('#screen');
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const card=j=>`<article class="job job-click" role="button" tabindex="0" data-wo="${e(j.wo)}" aria-label="View details for ${e(j.wo)}"><div class="jobtop"><b>${e(j.wo)}</b><span class="tag ${j.status==='Overdue'?'late':j.status==='In progress'?'work':''}">${e(j.status)}</span></div><p><strong>${e(j.part)}</strong><br>${e(j.customer)}</p><div class="bar"><i style="width:${j.progress}%"></i></div><div class="jobfoot"><span>${e(j.op)}</span><span>Due ${e(j.due)}</span></div></article>`;
function render(){
  const office=role==='office';
  const stats=office?[['3','Open jobs',''],['1','Overdue','warn'],['1','Ready to book out','ok'],['1','NCR for review','']]:[['3','Visible jobs',''],['1','In progress',''],['1','Ready for inspection','ok'],['0','Open NCRs','']];
  $('#roleLabel').textContent=office?'OFFICE VIEW':'FACTORY VIEW';
  $('#profile').textContent=office?'O':'F';
  $('#heading').textContent=({home:office?'Good morning':'Production overview',orders:'Open Orders',detail:'Job details',ncr:'Non-conformances',more:'More tools'})[page];
  $('#subtitle').textContent=({home:office?'Your production snapshot':'Jobs and operations at a glance',orders:'Demonstration records — not live Smartsheet data',detail:'Fictional job — read-only demonstration',ncr:'Prototype access and permissions',more:'Features planned for future releases'})[page];
  document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
  if(page==='home'){
    screen.innerHTML=`<div class="cards">${stats.map(s=>`<div class="stat ${s[2]}"><div class="num">${s[0]}</div><div class="label">${s[1]}</div></div>`).join('')}</div><div class="sectionhead"><h2>${office?'Jobs needing attention':'Current operations'}</h2><button class="link" data-go="orders">View all →</button></div>${jobs.slice(0,2).map(card).join('')}<div class="sectionhead"><h2>Quick actions</h2></div><div class="actions"><button class="action" data-go="orders"><span>▤</span>Open Orders</button><button class="action" data-go="ncr"><span>⚑</span>${office?'Review NCRs':'Raise an NCR'}</button><button class="action" data-go="more"><span>▣</span>Drawings</button><button class="action" data-go="more"><span>◷</span>Part History</button></div>`;
  }
  if(page==='orders'){
    screen.innerHTML=`<input class="search" id="search" placeholder="Search WO, customer or part" value="${e(query)}" aria-label="Search sample jobs"><div id="joblist"></div>`;
    $('#search').addEventListener('input',ev=>{query=ev.target.value;renderJobs()});renderJobs();
  }
  if(page==='detail'){
    const j=jobs.find(x=>x.wo===selectedWo);
    if(!j){page='orders';render();return;}
    screen.innerHTML=`<button type="button" class="back-link" data-back="1">← Back to ${returnPage==='home'?'Home':'Jobs'}</button><div class="job-detail"><div class="jobtop"><h2>${e(j.wo)}</h2><span class="tag ${j.status==='Overdue'?'late':j.status==='In progress'?'work':''}">${e(j.status)}</span></div><p class="muted">${e(j.part)}</p><div class="detail-grid"><div><span>Customer</span><strong>${e(j.customer)}</strong></div><div><span>Due date</span><strong>${e(j.due)}</strong></div><div><span>Current operation</span><strong>${e(j.op)}</strong></div><div><span>Progress</span><strong>${j.progress}%</strong></div></div><div class="bar"><i style="width:${j.progress}%"></i></div><p class="detail-note">Demonstration only. Editing, documents, and live production data are not connected.</p></div>`;
  }
  if(page==='ncr'){
    const message=office?'The live version will let authorised reviewers review submissions. Only Julie’s authorised account may approve, sign and issue an SDNR.':'The live version will let operators report a defect and record corrective/preventative actions for each defect.';
    screen.innerHTML=`<div class="empty"><h2>${office?'Office NCR review':'Factory NCR submission'}</h2><p>${message}</p><p>Creation, approvals, numbering and notifications are disabled in this prototype.</p><button class="btn" disabled>${office?'Approve SDNR — not connected':'Submit NCR — not connected'}</button></div>`;
  }
  if(page==='more'){
    screen.innerHTML=`<div class="listrow"><div><b>Job documents</b><br><span>Drawings, job cards, attachments</span></div>○</div><div class="listrow"><div><b>Part History</b><br><span>Role-limited lookup</span></div>○</div>${office?'<div class="listrow"><div><b>Financial overview</b><br><span>Restricted to authorised Office users</span></div>○</div>':''}<div class="listrow"><div><b>Account and security</b><br><span>Microsoft work sign-in required before launch</span></div>○</div><div class="empty" style="margin-top:18px">These are feature placeholders. This package does not access Smartsheet, QuickBooks, Microsoft 365 or production data.</div>`;
  }
}
function renderJobs(){
 const filtered=jobs.filter(j=>[j.wo,j.part,j.customer].some(x=>x.toLowerCase().includes(query.toLowerCase())));
 $('#joblist').innerHTML=filtered.length?filtered.map(card).join(''):'<div class="empty">No matching sample jobs.</div>';
}
document.addEventListener('click',ev=>{
 const g=ev.target.closest('[data-go]');if(g){page=g.dataset.go;render()}
 const nav=ev.target.closest('[data-page]');if(nav){page=nav.dataset.page;render()}
 const job=ev.target.closest('[data-wo]');if(job){selectedWo=job.dataset.wo;returnPage=page;page='detail';render()}
 const back=ev.target.closest('[data-back]');if(back){page=returnPage;render()}
});
document.addEventListener('keydown',ev=>{const job=ev.target.closest('[data-wo]');if(job&&(ev.key==='Enter'||ev.key===' ')){ev.preventDefault();job.click()}});
$('#profile').addEventListener('click',()=>$('#roles').showModal());
$('#roles').addEventListener('close',()=>{const v=$('#roles').returnValue;if(v==='office'||v==='factory'){role=v;page='home';render()}});
render();
