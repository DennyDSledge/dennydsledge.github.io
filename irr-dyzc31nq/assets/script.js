// Inspection Resolutions & Repair: site script (static, no backend).
(function(){
  var t=document.querySelector('.menu-toggle'),l=document.querySelector('.links');
  if(t&&l){t.addEventListener('click',function(){var o=l.classList.toggle('open');t.setAttribute('aria-expanded',o)});
    l.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){l.classList.remove('open');t.setAttribute('aria-expanded',false)})});}
  var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();

  // Rotating hero headline: Inspection -> Resolution -> Remodel
  var w=document.getElementById('rotWord');
  if(w){
    var words=['Inspection','Resolution','Remodel'],i=0,dots=document.querySelectorAll('.rotator-dots li');
    var still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setInterval(function(){
      i=(i+1)%words.length;
      var swap=function(){w.textContent=words[i];w.classList.remove('out');dots.forEach(function(d,k){d.classList.toggle('on',k===i)})};
      if(still){swap();return;}
      w.classList.add('out'); setTimeout(swap,450);
    },2600);
  }

  // Referral form: builds a pre-filled email (mailto). Nothing is transmitted by the site.
  var TO='dsledge369@gmail.com';
  var f=document.getElementById('intake'); if(!f) return;
  var err=document.getElementById('formError'),box=document.getElementById('confirm'),mail=document.getElementById('mailtoLink');
  f.addEventListener('submit',function(e){
    e.preventDefault(); var ok=true;
    f.querySelectorAll('[required]').forEach(function(x){var v=x.type==='checkbox'?x.checked:(x.checkValidity()&&x.value.trim()!=='');x.classList.toggle('invalid',!v);if(!v)ok=false});
    err.hidden=ok; if(!ok){err.scrollIntoView({block:'center'});return;}
    var d=new FormData(f),lines=[],labels={role:'I am',name:'Name',email:'Email',phone:'Phone',address:'Property address',closing:'Scheduled closing',binsr:'BINSR deadline',summary:'What needs to be resolved'};
    Object.keys(labels).forEach(function(k){var v=d.get(k);if(v)lines.push(labels[k]+': '+v)});
    lines.push('Referrer confirms the seller has been told about this referral and agreed to be contacted: '+(d.get('consent')?'Yes':'No'));
    lines.push('','(Please attach the inspection report to this email.)');
    mail.href='mailto:'+TO+'?subject='+encodeURIComponent('IRR deal referral: '+(d.get('address')||''))+'&body='+encodeURIComponent(lines.join('\n'));
    f.hidden=true; box.hidden=false; box.scrollIntoView({block:'center'});
  });
  document.getElementById('again').addEventListener('click',function(){f.reset();f.hidden=false;box.hidden=true});
})();
