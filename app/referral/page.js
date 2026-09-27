import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req){
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get('user_id');
  if(!user_id) return Response.json({error:'no user'},{status:400});
  
  try {
    const { data: profile } = await supabase.from('profiles').select('id,referral_code').eq('id',user_id).single();
    const code = profile?.referral_code || user_id.slice(0,8);
    
    const { data: refs } = await supabase.from('profiles').select('id').eq('referred_by',user_id);
    const { data: earnings } = await supabase.from('referral_earnings').select('amount').eq('user_id',user_id);
    const total = earnings?.reduce((s,e)=>s+parseFloat(e.amount),0)||0;

    const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://026.onrender.com';
    return Response.json({
      link: `${base}/auth?ref=${code}`,
      my_code: code,
      count: refs?.length||0,
      earnings: total
    });
  } catch(e){
    // لو الجداول ما موجودة لسه
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://026.onrender.com';
    return Response.json({
      link: `${base}/auth?ref=${user_id.slice(0,8)}`,
      my_code: user_id.slice(0,8),
      count: 0,
      earnings: 0
    });
  }
}
