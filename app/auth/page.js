'use client';
import { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('جاري المعالجة...');
    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await fetch(url, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email, password }) 
      });
      const data = await res.json();
      if (data.success) {
        setMsg('تم بنجاح!');
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(()=> window.location.href='/', 800);
      } else {
        setMsg(data.error);
      }
    } catch (err) {
      setMsg('حدث خطأ');
    }
    setLoading(false);
  };

  return (
    <div style={{ background: '#05070A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#11131A', border: '1px solid rgba(240,185,11,0.2)', borderRadius: '24px', padding: '40px 32px', width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: '900', margin: 0 }}>
            <span style={{ color: '#F0B90B' }}>CRYPTO</span>
            <span style={{ color: 'white' }}> GUY</span>
          </h1>
          <p style={{ color: '#8B8FA3', fontSize: '14px', marginTop: '8px' }}>
            {isLogin ? 'مرحبا بعودتك' : 'ابدأ رحلة الثراء'}
          </p>
        </div>

        <div style={{ display: 'flex', background: '#05070A', borderRadius: '12px', padding: '4px', marginBottom: '28px', border: '1px solid #1E212E' }}>
          <button onClick={()=>setIsLogin(true)} style={{ flex: 1, padding: '11px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: isLogin? '#F0B90B' : 'transparent', color: isLogin? 'black' : '#8B8FA3', fontWeight: 'bold' }}>دخول</button>
          <button onClick={()=>setIsLogin(false)} style={{ flex: 1, padding: '11px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: !isLogin? '#F0B90B' : 'transparent', color: !isLogin? 'black' : '#8B8FA3', fontWeight: 'bold' }}>تسجيل</button>
        </div>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="البريد الالكتروني" value={email} onChange={e=>setEmail(e.target.value)} required style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #2A2E3F', background: '#080A0F', color: 'white', marginBottom: '16px', boxSizing: 'border-box' }} />
          <input type="password" placeholder="كلمة المرور" value={password} onChange={e=>setPassword(e.target.value)} required style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #2A2E3F', background: '#080A0F', color: 'white', marginBottom: '24px', boxSizing: 'border-box' }} />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '15px', borderRadius: '12px', border: 'none', background: '#F0B90B', color: 'black', fontWeight: '900', cursor: 'pointer' }}>
            {loading ? 'انتظر...' : (isLogin ? 'دخول' : 'انشاء حساب')}
          </button>
        </form>

        {msg && <p style={{ textAlign: 'center', marginTop: '18px', color: '#F0B90B', fontSize: '13px' }}>{msg}</p>}
        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <a href="/" style={{ color: '#8B8FA3', textDecoration: 'none', fontSize: '13px' }}>الرجوع للرئيسية</a>
        </div>
      </div>
    </div>
  );
            }
