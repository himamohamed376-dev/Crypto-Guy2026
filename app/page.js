export default function Home(){
  return(
    <main style={{background:'#050505',color:'white',minHeight:'100vh',padding:'24px',fontFamily:'sans-serif',textAlign:'center'}}>
      <h1 style={{color:'#00ff88',fontSize:'30px',fontWeight:'bold'}}>Crypto Guys 2026</h1>
      <h2 style={{fontSize:'26px',marginTop:'40px',fontWeight:'bold'}}>استثمر بذكاء واربح يوميا 💰</h2>
      <p style={{color:'#aaa',marginTop:'10px'}}>منصة الاستثمار الأولى في السودان</p>
      
      <div style={{display:'grid',gap:'16px',maxWidth:'500px',margin:'40px auto'}}>
        <div style={{background:'#18181b',border:'2px solid #00ff88',padding:'20px',borderRadius:'16px'}}>
          <h3>الباقة البسيطة - 10% يوميا</h3>
          <p>من 100$</p>
          <button style={{width:'100%',background:'#00ff88',color:'black',padding:'12px',borderRadius:'10px',marginTop:'12px',fontWeight:'bold'}}>استثمر الآن</button>
        </div>
        <div style={{background:'#18181b',border:'2px solid gold',padding:'20px',borderRadius:'16px'}}>
          <h3>الباقة الذهبية - 25% يوميا</h3>
          <p>من 500$</p>
          <button style={{width:'100%',background:'gold',color:'black',padding:'12px',borderRadius:'10px',marginTop:'12px',fontWeight:'bold'}}>استثمر الآن</button>
        </div>
        <div style={{background:'#18181b',border:'2px solid #a855f7',padding:'20px',borderRadius:'16px'}}>
          <h3>الباقة الماسية - 60% يوميا</h3>
          <p>من 1000$</p>
          <button style={{width:'100%',background:'white',color:'black',padding:'12px',borderRadius:'10px',marginTop:'12px',fontWeight:'bold'}}>استثمر الآن</button>
        </div>
      </div>
    </main>
  )
  }
