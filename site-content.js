(async()=>{
 try{
  const c=await fetch("/api/config").then(r=>r.ok?r.json():Promise.reject()),s=c.settings||{};
  document.querySelectorAll(".brand span").forEach(e=>{const sm=e.querySelector("small");e.childNodes[0].textContent=s.siteName||"TORANEX";if(sm)sm.textContent="SOFTWARE & DESIGN";});
  if(s.phone)document.querySelectorAll('a[href^="tel:"]').forEach(a=>a.textContent=s.phone);
  if(s.location)document.querySelectorAll(".about-grid aside span,.contact-grid>div p:first-of-type").forEach(e=>e.textContent=s.location);
  if(s.tagline)document.querySelectorAll(".foot-top p").forEach(e=>e.textContent=s.tagline);
  if(s.logoUrl)document.querySelectorAll(".brand>b").forEach(e=>{const i=document.createElement("img");i.src=s.logoUrl;i.alt="TORANEX";i.style.cssText="width:54px;height:54px;object-fit:contain";e.replaceWith(i);});
  if(c.seo&&c.seo.title)document.title=c.seo.title;
  if(c.seo&&c.seo.description){let m=document.querySelector('meta[name="description"]');if(!m){m=document.createElement("meta");m.name="description";document.head.append(m);}m.content=c.seo.description;}
  if(s.faviconUrl){let f=document.querySelector('link[rel="icon"]');if(!f){f=document.createElement("link");f.rel="icon";document.head.append(f);}f.href=s.faviconUrl;}
  const cards=document.querySelector("#services-cards");
  if(cards){const{initializeApp,getApps}=await import("https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js"),{getFirestore,collection,getDocs,query,where,orderBy}=await import("https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"),app=getApps().length?getApps()[0]:initializeApp(c.firebase),db=getFirestore(app),q=await getDocs(query(collection(db,"services"),where("active","==",true),orderBy("order","asc")));if(!q.empty){cards.replaceChildren();q.docs.forEach((d,i)=>{const x=d.data(),a=document.createElement("article"),sm=document.createElement("small"),h=document.createElement("h3"),p=document.createElement("p");sm.textContent=String(i+1).padStart(2,"0")+" / "+(x.subtitle||"TORANEX");h.textContent=x.name||"";p.textContent=x.description||"";a.append(sm,h,p);cards.append(a);});}}
  const list=document.querySelector(".service-list");
  if(list){const{initializeApp,getApps}=await import("https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js"),{getFirestore,collection,getDocs,query,where,orderBy}=await import("https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"),app=getApps().length?getApps()[0]:initializeApp(c.firebase),db=getFirestore(app),q=await getDocs(query(collection(db,"services"),where("active","==",true),orderBy("order","asc")));if(!q.empty){list.replaceChildren();q.docs.forEach((d,i)=>{const x=d.data(),a=document.createElement("a"),n=document.createElement("span"),b=document.createElement("b"),sm=document.createElement("small"),ic=document.createElement("i");n.textContent=String(i+1).padStart(2,"0");b.textContent=x.name||"";sm.textContent=x.subtitle||"TORANEX SERVICES";ic.textContent="↗";a.href="contact.html";a.append(n,b,sm,ic);list.append(a);});}}
 }catch(e){console.info("TORANEX dynamic content not configured",e);}
})();