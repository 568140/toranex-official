(async()=>{
 try{
  const response=await fetch("/api/config");
  if(!response.ok)throw new Error("Site config unavailable");
  const config=await response.json();
  const s=config.settings||{};
  document.querySelectorAll(".brand span").forEach(el=>{
   const small=el.querySelector("small");
   el.childNodes[0].textContent=s.siteName||"TORANEX";
   if(small)small.textContent="SOFTWARE & DESIGN";
  });
  if(s.logoUrl)document.querySelectorAll(".brand-symbol").forEach(img=>{img.src=s.logoUrl;});
  if(s.phone)document.querySelectorAll('a[href^="tel:"]').forEach(a=>{
   a.textContent=s.phone;
   a.href="tel:"+s.phone.replaceAll(" ","").replaceAll("-","");
  });
  if(s.location)document.querySelectorAll(".about-grid aside span,.contact-grid>div p:first-of-type,.hero-founder .founder-location,.footer-contact span").forEach(el=>el.textContent=s.location);
  if(s.tagline)document.querySelectorAll(".foot-top p,.brand small").forEach(el=>el.textContent=s.tagline);
  if(s.whatsapp)document.querySelectorAll('a[href*="wa.me"]').forEach(a=>a.href=s.whatsapp);
  if(s.about){
   document.querySelectorAll(".about-band .about-grid>div:nth-child(2) p:not(.eyebrow),.about-copy>p:not(.eyebrow)").forEach(el=>el.textContent=s.about);
   if(document.querySelector(".about-cards")&&!document.querySelector("#services-cards")){
    const lead=document.querySelector("main .section .lead");
    if(lead)lead.textContent=s.about;
   }
  }
  if(s.email)document.querySelectorAll(".contact-grid>div").forEach(box=>{
   if(!box.querySelector('a[href^="mailto:"]')){
    const a=document.createElement("a");a.href="mailto:"+s.email;a.textContent=s.email;box.append(a);
   }
  });
  const socials=[["instagram",s.instagram,"Instagram"],["telegram",s.telegram,"Telegram"],["facebook",s.facebook,"Facebook"]].filter(x=>x[1]);
  if(socials.length)document.querySelectorAll("footer").forEach(footer=>{
   let box=footer.querySelector(".footer-social");
   if(!box){box=document.createElement("div");box.className="footer-social";footer.append(box);}
   socials.forEach(([key,url,label])=>{
    let a=box.querySelector('[data-social="'+key+'"]');
    if(!a){a=document.createElement("a");a.dataset.social=key;box.append(a);}
    a.href=url;a.target="_blank";a.rel="noopener";a.textContent=label;
   });
  });
  if(config.seo&&config.seo.title)document.title=config.seo.title;
  if(config.seo&&config.seo.description){
   let meta=document.querySelector('meta[name="description"]');
   if(!meta){meta=document.createElement("meta");meta.name="description";document.head.append(meta);}
   meta.content=config.seo.description;
  }
  if(s.faviconUrl){
   let icon=document.querySelector('link[rel="icon"]');
   if(!icon){icon=document.createElement("link");icon.rel="icon";document.head.append(icon);}
   icon.href=s.faviconUrl;
  }
  const serviceCards=document.querySelector("#services-cards");
  const serviceList=document.querySelector(".service-list");
  if(serviceCards||serviceList){
   const {initializeApp,getApps}=await import("https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js");
   const {getFirestore,collection,getDocs,query,where}=await import("https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js");
   const app=getApps().length?getApps()[0]:initializeApp(config.firebase);
   const db=getFirestore(app);
   const snapshot=await getDocs(query(collection(db,"services"),where("active","==",true)));
   const records=snapshot.docs.sort((a,b)=>(a.data().order||0)-(b.data().order||0)).slice(0,5);
   if(serviceCards&&records.length){
    serviceCards.replaceChildren();
    records.forEach((doc,index)=>{
     const item=doc.data(),card=document.createElement("article"),small=document.createElement("small"),title=document.createElement("h3"),description=document.createElement("p");
     small.textContent=String(index+1).padStart(2,"0")+" / "+(item.subtitle||"TORANEX");
     title.textContent=item.name||"";description.textContent=item.description||"";
     card.append(small,title,description);serviceCards.append(card);
    });
   }
   if(serviceList&&records.length){
    serviceList.replaceChildren();
    records.forEach((doc,index)=>{
     const item=doc.data(),link=document.createElement("a"),number=document.createElement("span"),title=document.createElement("b"),subtitle=document.createElement("small"),arrow=document.createElement("i");
     number.textContent=String(index+1).padStart(2,"0");title.textContent=item.name||"";
     subtitle.textContent=item.subtitle||"TORANEX SERVICES";arrow.textContent="↗";
     link.href="contact.html";link.append(number,title,subtitle,arrow);serviceList.append(link);
    });
   }
  }
 }catch(error){console.info("TORANEX dynamic content not configured",error);}
})();