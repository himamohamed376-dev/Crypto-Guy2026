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
        setMsg('تم بنجاح! ✅');
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
      <div style={{ background: 'linear-gradient(145deg, #11131A, #1A1D26)', border: '1px solid rgba(240,185,11,0.2)', borderRadius: '24px', padding: '40px 32px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(240,185,11,0.05)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: '900', margin: 0, letterSpacing: '1px' }}>
            <span style={{ color: '#F0B90B' }}>CRYPTO</span>
            <span style={{ color: 'white' }}> GUY</span>
          </h1>
          <p style={{ color: '#8B8FA3', fontSize: '14px', marginTop: '8px' }}>{isLogin ? 'مرحباً بعودتك يا أسطورة' : 'ابد
