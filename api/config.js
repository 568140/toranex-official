const {get,send}=require("../lib/firebase-admin");
module.exports=async(req,res)=>{
 if(req.method!=="GET")return send(res,405,{error:"Method not allowed"});
 try{
  const firebase={apiKey:process.env.FIREBASE_API_KEY||"",authDomain:process.env.FIREBASE_AUTH_DOMAIN||"",projectId:process.env.FIREBASE_PROJECT_ID||"",appId:process.env.FIREBASE_APP_ID||""};
  if(!firebase.apiKey||!firebase.projectId||!firebase.appId)return send(res,503,{error:"Firebase web config is incomplete"});
  let s={},seo={};
  try{const x=await get(),r=await Promise.all([x.db.collection("siteSettings").doc("main").get(),x.db.collection("siteSettings").doc("seo").get()]);if(r[0].exists)s=r[0].data();if(r[1].exists)seo=r[1].data();}catch{}
  res.setHeader("Cache-Control","public,max-age=60");
  return send(res,200,{firebase,settings:{siteName:s.siteName||"TORANEX",phone:s.phone||"+967 774 919 194",location:s.location||"صنعاء — الجراف، اليمن",tagline:s.tagline||"CONNECTED BY INNOVATION. DRIVEN BY THE FUTURE.",logoUrl:s.logoUrl||"",faviconUrl:s.faviconUrl||""},seo});
 }catch{return send(res,500,{error:"تعذر تحميل الإعدادات"});}
};