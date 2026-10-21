'use strict';
const serviceData={
 redes:{title:'Infraestrutura de redes',description:'Conectividade começa com um projeto bem dimensionado. Organizamos os pontos de rede e a distribuição do Wi-Fi para a rotina de cada ambiente.',items:['Planejamento e instalação de cabeamento estruturado','Organização de racks, identificação e documentação dos pontos','Configuração de switches, roteadores e redes sem fio','Segmentação de redes internas e de visitantes','Testes de conectividade e validação da instalação']},
 manutencao:{title:'Manutenção de computadores',description:'Identificar a causa, corrigir o problema e cuidar da prevenção. Um serviço pensado para manter computadores e notebooks em boas condições de uso.',items:['Diagnóstico de hardware e software','Manutenção preventiva e limpeza técnica','Substituição de componentes e avaliação de upgrades','Configuração de sistemas e aplicativos licenciados','Orientações para conservação e rotina de backup']},
 cftv:{title:'Segurança e CFTV',description:'Um projeto de câmeras precisa considerar o espaço, a iluminação e a forma de consultar as imagens. Cada ponto é escolhido para uma necessidade concreta.',items:['Avaliação dos ambientes e posicionamento das câmeras','Instalação de câmeras IP e infraestrutura de conexão','Configuração de gravadores e armazenamento local','Configuração de acesso remoto com controle de permissões','Testes de imagem, gravação e orientação de uso']},
 workstations:{title:'Estações de trabalho',description:'Do computador de uso administrativo à estação para tarefas exigentes, a configuração deve acompanhar as ferramentas e a rotina de quem trabalha.',items:['Dimensionamento de hardware conforme as aplicações','Montagem e configuração de estações de trabalho','Instalação de sistemas e softwares com licenças fornecidas','Integração com rede, periféricos e políticas de acesso','Testes de funcionamento e orientações de uso']}
};
const scenarioData={
 escritorios:{label:'ESCRITÓRIOS',title:'Uma equipe conectada.\nUm trabalho que flui.',description:'Integre computadores, rede sem fio e pontos de rede em um ambiente organizado, com espaço para novas pessoas e novas ideias.',tags:['Wi-Fi corporativo','Estações de trabalho','Manutenção preventiva']},
 comercio:{label:'COMÉRCIOS',title:'Do atendimento ao estoque.\nTudo na mesma conexão.',description:'Conecte os equipamentos do ponto de venda, separe a rede de visitantes e planeje o monitoramento dos espaços de circulação.',tags:['Rede para pontos de venda','Câmeras e monitoramento','Wi-Fi para visitantes']},
 clinicas:{label:'CLÍNICAS E CONSULTÓRIOS',title:'Mais organização nos bastidores.\nMais foco no atendimento.',description:'Organize as estações da recepção e dos consultórios, com redes separadas para a equipe e os visitantes e manutenção planejada dos equipamentos.',tags:['Redes segmentadas','Computadores configurados','Manutenção programada']}
};
const menuButton=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('#mobile-nav');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');mobileNav.hidden=true;}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));menuButton.setAttribute('aria-label',open?'Abrir menu':'Fechar menu');mobileNav.hidden=open;});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobileNav.hidden){closeMenu();menuButton.focus();}});
window.matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const detailDialog=document.querySelector('#service-dialog');
let chosenService='redes';
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{
 chosenService=button.dataset.service;const service=serviceData[chosenService];
 document.querySelector('#detail-title').textContent=service.title;
 document.querySelector('#detail-description').textContent=service.description;
 const list=document.querySelector('#detail-list');list.replaceChildren();
 service.items.forEach(text=>{const item=document.createElement('li');const mark=document.createElement('span');mark.textContent='✓';mark.setAttribute('aria-hidden','true');mark.style.color='#0b967d';item.append(mark,document.createTextNode(text));list.append(item);});
 detailDialog.showModal();
}));
document.querySelector('#detail-quote').addEventListener('click',()=>{document.querySelector('#service-select').value=chosenService;detailDialog.close();document.querySelector('#contato').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});document.querySelector('[name="nome"]').focus({preventScroll:true});});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});});
document.querySelectorAll('.privacy-trigger').forEach(button=>button.addEventListener('click',()=>document.querySelector('#privacy-dialog').showModal()));
const tabs=[...document.querySelectorAll('[data-scenario]')];
function selectScenario(button){
 const data=scenarioData[button.dataset.scenario];
 tabs.forEach(tab=>{const active=tab===button;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
 const panel=document.querySelector('#scenario-panel');panel.setAttribute('aria-labelledby',button.id);
 panel.querySelector('.tiny-label').textContent='NA PRÁTICA / '+data.label;
 const title=panel.querySelector('h3');title.replaceChildren();data.title.split('\n').forEach((line,i)=>{if(i)title.append(document.createElement('br'));title.append(document.createTextNode(line));});
 panel.querySelector('p').textContent=data.description;
 const tagsContainer=panel.querySelector('.scenario-chips');tagsContainer.replaceChildren();data.tags.forEach(tag=>{const element=document.createElement('span');element.textContent=tag;tagsContainer.append(element);});
}
tabs.forEach((button,index)=>{button.addEventListener('click',()=>selectScenario(button));button.addEventListener('keydown',event=>{let target;if(event.key==='ArrowRight')target=(index+1)%tabs.length;else if(event.key==='ArrowLeft')target=(index+tabs.length-1)%tabs.length;else if(event.key==='Home')target=0;else if(event.key==='End')target=tabs.length-1;else return;event.preventDefault();selectScenario(tabs[target]);tabs[target].focus();});});
const form=document.querySelector('#quote-form');
let quoteText='';
form.addEventListener('submit',event=>{
 event.preventDefault();if(!form.reportValidity())return;
 const values=new FormData(form);const name=values.get('nome').trim();const email=values.get('email').trim();const message=values.get('mensagem').trim();
 if(!name){form.elements.nome.setCustomValidity('Informe seu nome.');form.elements.nome.reportValidity();return;}
 if(message.length<10){form.elements.mensagem.setCustomValidity('Conte um pouco mais: use pelo menos 10 caracteres.');form.elements.mensagem.reportValidity();return;}
 const service=form.elements.servico.selectedOptions[0].text;
 quoteText=`SOLICITAÇÃO DE PROJETO — VÉRTICE TECNOLOGIA\n\nNome: ${name}\nEmpresa: ${values.get('empresa').trim()||'Não informada'}\nE-mail: ${email}\nSolução: ${service}\n\nSobre o projeto:\n${message}\n\nResumo gerado em um site demonstrativo. Nenhuma solicitação foi enviada.`;
 document.querySelector('#quote-summary').textContent=quoteText;
 document.querySelector('#copy-status').textContent='';
 const result=document.querySelector('#quote-result');result.hidden=false;result.querySelector('.quote-result').focus({preventScroll:true});result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});
});
form.querySelectorAll('input,textarea').forEach(field=>field.addEventListener('input',()=>field.setCustomValidity('')));
document.querySelector('#copy-summary').addEventListener('click',async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText(quoteText);status.textContent='Resumo copiado! Você pode colar onde preferir.';}catch{status.textContent='Não foi possível acessar a área de transferência. Selecione o resumo acima ou use “Baixar solicitação”.';}});
document.querySelector('#download-summary').addEventListener('click',()=>{const blob=new Blob(['\uFEFF'+quoteText],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='solicitacao-vertice-tecnologia.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('#copy-status').textContent='Download solicitado. O resumo não foi enviado a terceiros.';});
document.querySelector('#year').textContent=new Date().getFullYear();
const navLinks=[...document.querySelectorAll('.desktop-nav a')];
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle('is-active',link.hash==='#'+entry.target.id));}});},{rootMargin:'-15% 0px -65% 0px'});document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));}
