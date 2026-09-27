'use client';
import { useState, useEffect } from 'react';

export default function Home(){
  const [user,setUser]=useState(null);
  useEffect(()=>{ try{setUser(JSON.parse(localStorage.getItem('user')||'null'))}catch{} },[]);

  return(
    <div dir="rtl" style={{background:'#1e1408',minHeight:'100vh',color:'#fff',fontFamily:'system-ui',paddingBottom:80}}>
      
      {/* هيدر */}
      <div style={{background:'#2a1e0f',height:56,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 14px'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:36,height:36,background:'#ffcc00',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,color:'#000',fontSize:20}}>1M</div>
          <div style={{fontWeight:800}}>OneMiners</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <div style={{background:'#3a2a14',padding:'6px 12px',borderRadius:20,fontSize:12}}>🌐 عربي</div>
        </div>
      </div>

      <div style={{padding:12}}>
        {/* بانر */}
        <div style={{background:'linear-gradient(90deg,#ffcc00,#ff9a00)',borderRadius:16,height:120,display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden'}}>
          <div style={{fontSize:60,fontWeight:900,color:'#000',opacity:0.2,position:'absolute'}}>1M 1M 1M</div>
          <div style={{width:90,height:90,background:'#000',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:50,fontWeight:900,zIndex:2,border:'4px solid #fff'}}>
            <span style={{color:'#ffcc00'}}>1</span><span style={{color:'#fff'}}>M</span>
          </div>
          <div style={{position:'absolute',bottom:10,zIndex:2,fontSize:28,fontWeight:900,color:'#000'}}>one<span style={{color:'#fff'}}>miners</span></div>
        </div>

        {/* كرت الرصيد */}
        <div style={{background:'#2f2412',borderRadius:16,padding:14,marginTop:12}}>
          <div style={{background:'#3d2f1a',borderRadius:12,padding:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{color:'#c9a86a',fontSize:13}}>إجمالي الأصول</span>
            <span style={{color:'#ffcc00',fontSize:20,fontWeight:900}}>$1.00</span>
          </div>
          <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:8,fontSize:13}}>
            <div style={{display:'flex',justifyContent:'space-between'}}><span>محفظة الاستثمار</span><span>$ 0.00</span></div>
            <div style={{display:'flex',justifyContent:'space-between'}}><span>محفظة الوساطة</span><span>$ 0.00</span></div>
          </div>
        </div>

        {/* شبكة الايقونات */}
        <div style={{background:'#2f2412',borderRadius:16,padding:14,marginTop:12}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:12}}>
            <Item icon="$" text="إعادة الشحن" href="/deposit" />
            <Item icon="💰" text="ينسحب" href="/withdraw" />
            <Item icon="♛" text="كبار الشخصيات" href="/vip" />
            <Item icon="★" text="نشاط" href="/activity" />
            <Item icon="?" text="التعليمات" href="/help" />
            <Item icon="✉" text="يدعو" href="/referral" />
            <Item icon="i" text="معلومات عنا" href="/about" />
            <Item icon="⬇" text="برنامج" href="/app" />
          </div>
        </div>

        {/* الباقات */}
        <div style={{marginTop:16}}>
          <div style={{fontWeight:800,marginBottom:10,fontSize:14}}>باقات الاستثمار</div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {[
              {p:10,per:'10%',d:10},
              {p:100,per:'12%',d:12,best:true},
              {p:200,per:'13%',d:12},
              {p:500,per:'15%',d:15},
            ].map(pl=>(
              <div key={pl.id||pl.p} style={{background:'#2f2412',border:pl.best?'1px solid #ffcc00':'1px solid #3d2f1a',borderRadius:12,padding:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div><div style={{fontWeight:900}}>${pl.p}</div><div style={{fontSize:11,color:'#c9a86a'}}>{pl.per} يومي • {pl.d} يوم</div></div>
                <a href={user?'/dashboard':'/auth'} style={{background:'#ffcc00',color:'#000',padding:'8px 16px',borderRadius:8,textDecoration:'none',fontWeight:800,fontSize:12}}>استثمار</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* قائمة سفلية */}
      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#2a1e0f',borderTop:'1px solid #3d2f1a',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        <Nav icon="⌂" text="بيت" active />
        <Nav icon="♛" text="كبار الشخصيات" />
        <Nav icon="⛏" text="تجمع التعدين" />
        <Nav icon="👥" text="فريق" />
        <Nav icon="👤" text="أنا" />
      </div>
    </div>
  );
}

function Item({icon,text,href}){
  return(
    <a href={href} style={{textDecoration:'none',color:'#fff',textAlign:'center'}}>
      <div style={{width:42,height:42,background:'#4a3a22',borderRadius:'50%',margin:'0 auto 6px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>{icon}</div>
      <div style={{fontSize:10,color:'#d6c19a',lineHeight:1.2}}>{text}</div>
    </a>
  );
}
function Nav({icon,text,active}){
  return <div style={{textAlign:'center',color:active?'#ffcc00':'#8a7560'}}><div style={{fontSize:18}}>{icon}</div><div style={{fontSize:9,marginTop:2}}>{text}</div></div>;
                      }
