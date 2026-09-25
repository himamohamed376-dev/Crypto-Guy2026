'use client';
import { useState } from 'react';

export default function AdminPage(){
  const [email,setEmail]=useState('');
  const [amount,setAmount]=useState('');
  const [msg,setMsg]=useState('');
  const [users,setUsers]=useState([]);

  const loadUsers=async()=>{
    const res=await fetch('/api/admin/users');
    const data=await res.json();
    if(data.success) setUsers(data.users);
  };

  const addBalance=async(e)=>{
    e.preventDefault();
    setMsg('جاري الاضافة...');
    const res=await fetch('/api/admin/add-balance',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,amount:parseFloat(amount)})});
    const data=await res.json();
    if(data.success){ setMsg(`✅ تم اضافة $${amount} للمستخدم ${email}`); loadUsers(); }
    else setMsg(data.error);
  };

  return(
    <div style={{background:'#05070A',minHeight:'100vh',color:'white',padding:'20px'}}>
      <div style={{maxWidth:'500px',margin:'0 auto'}}>
        <h1 style={{color:'#F0B90B',textAlign:'center'}}>لوحة الأدمن - اضافة رصيد</h1>

        <div style={{background:'#11131A',borderRadius:'16px',padding:'20px',marginBottom:'20px'}}>
          <form onSubmit={addBalance}>
            <input type="email" placeholder="ايميل المستخدم" value={email} onChange={e=>setEmail(e.target.value)} required style={{width:'100%',padding:'14px',borderRadius:'10px',border:'1px solid #2A2E3F',background:'#080A0F',color:'white',boxSizing:'border-box',marginBottom:'12px'}}/>
            <input type="number" placeholder="المبلغ مثلا 1000" value={amount} onChange={e=>setAmount(e.target.value)} required style={{width:'100%',padding:'14px',borderRadius:'10px',border:'1px solid #2A2E3F',background:'#080A0F',color:'white',boxSizing:'border-box',marginBottom:'12px'}}/>
            <button style={{width:'100%',padding:'14px',borderRadius:'10px',border:'none',background:'#F0B90B',fontWeight:'900',cursor:'pointer'}}>اضافة رصيد الآن</button>
          </form>
          {msg && <p style={{textAlign:'center',marginTop:'12px',color:'#F0B90B'}}>{msg}</p>}
        </div>

        <button onClick={loadUsers} style={{width:'100%',padding:'12px',borderRadius:'10px',border:'1px solid #2A2E3F',background:'#1E212E',color:'white',cursor:'pointer',marginBottom:'20px'}}>عرض كل المستخدمين</button>

        {users.map(u=>(
          <div key={u.id} style={{background:'#11131A',border:'1px solid #1E212E',borderRadius:'10px',padding:'12px',marginBottom:'8px',display:'flex',justifyContent:'space-between'}}>
            <span>{u.email} - {u.name}</span>
            <span style={{color:'#0ECB81',fontWeight:'bold'}}>${Number(u.balance).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
  }
