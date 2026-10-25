'use client';
import { useState } from 'react';

export default function AuthPage(){
    const [isLogin, setIsLogin]=useState(true);
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [msg, setMsg]=useState('');
    const [loading, setLoading]=useState(false);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setMsg('جاري المعالجة...');
        const url=isLogin?'/api/auth/login/':'/api/auth/register/';
        const body=isLogin?{email,password}:{name,email,password};
        try{
            const res=await fetch(url,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data=await res.json();
            if(data.success){
                setMsg('تم بنجاح');
                // حفظ البيانات كاملة بالإضافة إلى تخزين الـ user_id بشكل منفصل وثابت
                localStorage.setItem('user', JSON.stringify(data.user));
                if(data.user && data.user.id) {
                    localStorage.setItem('user_id', data.user.id);
                }
                setTimeout(()=>(window.location.href='/'),800);
            } else {
                setMsg(data.error);
            }
        }catch(err){
            setMsg('حدث خطأ');
        }
        setLoading(false);
    };

    return(
        <div style={{background:'#05070A',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#11131A',border:'1px solid rgba(240,185,11,0.2)',borderRadius:'12px',padding:'30px',width:'100%',maxWidth:'400px'}}>
                <div style={{textAlign:'center',marginBottom:'30px'}}>
                    <h1 style={{fontSize:'30px',fontWeight:'900',margin:0}}><span>Crypto Guy</span></h1>
                    <p style={{color:'#888FA3',fontSize:'14px',marginTop:'8px'}}>{isLogin?'مرحباً بعودتك':'إنشاء حساب جديد'}</p>
                </div>
                <div style={{display:'flex',background:'#05070A',borderRadius:'12px',padding:'4px',marginBottom:'20px'}}>
                    <button onClick={()=>setIsLogin(true)} style={{flex:1,padding:'11px',background:isLogin?'#F0B90B':'transparent',color:isLogin?'#000':'#888FA3',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer'}}>دخول</button>
                    <button onClick={()=>setIsLogin(false)} style={{flex:1,padding:'11px',background:!isLogin?'#F0B90B':'transparent',color:!isLogin?'#000':'#888FA3',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer'}}>تسجيل</button>
                </div>
                <form onSubmit={handleSubmit}>
                    {!isLogin && <input type="text" placeholder="الاسم الكامل" value={name} onChange={(e)=>setName(e.target.value)} style={{width:'100%',padding:'12px',marginBottom:'15px',background:'#05070A',border:'1px solid rgba(240,185,11,0.2)',borderRadius:'8px',color:'#fff'}} required />}
                    <input type="email" placeholder="البريد الالكتروني" value={email} onChange={(e)=>setEmail(e.target.value)} style={{width:'100%',padding:'12px',marginBottom:'15px',background:'#05070A',border:'1px solid rgba(240,185,11,0.2)',borderRadius:'8px',color:'#fff'}} required />
                    <input type="password" placeholder="كلمة المرور" value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:'100%',padding:'12px',marginBottom:'20px',background:'#05070A',border:'1px solid rgba(240,185,11,0.2)',borderRadius:'8px',color:'#fff'}} required />
                    <button type="submit" disabled={loading} style={{width:'100%',padding:'14px',background:'#F0B90B',color:'#000',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer'}}>{loading ? 'جاري المعالجة...' : (isLogin ? 'دخول' : 'تسجيل')}</button>
                </form>
                {msg && <p style={{textAlign:'center',marginTop:'18px',color:'#F0B90B',fontSize:'14px'}}>{msg}</p>}
                <div style={{marginTop:'28px',textAlign:'center'}}><a href="/" style={{color:'#888FA3',fontSize:'13px',textDecoration:'none'}}>الرجوع للرئيسية</a></div>
            </div>
        </div>
    );
  }
  
