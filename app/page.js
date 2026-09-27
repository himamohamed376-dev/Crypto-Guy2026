'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const packages = [
    {
      amount: 10,
      daily: 10,
      days: 10,
      total: 100,
      badge: null,
    },
    {
      amount: 100,
      daily: 12,
      days: 12,
      total: 144,
      badge: 'الأكثر طلباً',
    },
    {
      amount: 200,
      daily: 13,
      days: 13,
      total: 338,
      badge: null,
    },
    {
      amount: 500,
      daily: 15,
      days: 15,
      total: 1125,
      badge: 'VIP',
    },
  ];

  const menuItems = [
    { label: 'لوحتي', href: '/dashboard', highlight: false },
    { label: 'الإيداع', href: '/deposit', highlight: false },
    { label: 'السحب', href: '/withdraw', highlight: false },
    { label: 'الإحالة 10%', href: '/referral', highlight: true },
  ];

  return (
    <div className="min-h-screen bg-[#08080a] text-white font-inter overflow-x-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#08080a]/70 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffcc00] to-[#b38f00] flex items-center justify-center font-bold text-black text-lg shadow-lg shadow-[#ffcc00]/20">
              C
            </div>
            <span className="text-xl font-bold tracking-tight">
              CRYPTO <span className="text-[#ffcc00]">GUY</span>
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden sm:block px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#ffcc00]/40 hover:bg-[#ffcc00]/5 transition-all text-sm font-medium"
            >
              لوحتي
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:border-[#ffcc00]/40 hover:bg-[#ffcc00]/5 transition-all flex items-center justify-center"
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Side Menu */}
      <aside
        className={`fixed top-0 right-0 h-full w-[300px] z-[70] bg-[#131318]/95 backdrop-blur-2xl border-l border-white/10 transform transition-transform duration-500 ease-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Close Button */}
          <div className="flex items-center justify-between mb-10">
            <span className="text-sm font-medium text-white/40 tracking-widest uppercase">القائمة</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
              aria-label="Close menu"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`px-5 py-4 rounded-xl text-base font-medium transition-all border ${
                  item.highlight
                    ? 'bg-gradient-to-r from-[#ffcc00]/20 to-[#ffcc00]/5 border-[#ffcc00]/40 text-[#ffcc00] hover:from-[#ffcc00]/30'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-white/5">
            <p className="text-xs text-white/30 text-center">© 2025 CRYPTO GUY</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-5 py-14 md:py-20">
        {/* Title */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            باقات الاستثمار <span className="text-[#ffcc00]">المميزة</span>
          </h1>
          <p className="mt-5 text-white/50 text-base md:text-lg max-w-xl mx-auto">
            اختر الباقة المناسبة وابدأ رحلة الأرباح اليومية فوراً
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="relative group"
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute -top-3 right-6 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider bg-gradient-to-r from-[#ffcc00] to-[#e6b800] text-black shadow-lg shadow-[#ffcc00]/30">
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="relative rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-7 hover:border-[#ffcc00]/40 hover:bg-white/[0.05] transition-all duration-300 h-full">
                {/* Gold accent line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#ffcc00]/60 to-transparent" />

                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-xs text-white/40 tracking-widest uppercase mb-2">الباقة</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl md:text-5xl font-bold text-[#ffcc00]">${pkg.amount}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#ffcc00]/10 border border-[#ffcc00]/20 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffcc00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="rounded-xl bg-[#131318] border border-white/5 p-3.5">
                    <p className="text-[11px] text-white/40 mb-1">الربح اليومي</p>
                    <p className="text-lg font-bold text-white">
                      {pkg.daily}% <span className="text-xs text-[#ffcc00] font-normal">يومياً</span>
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#131318] border border-white/5 p-3.5">
                    <p className="text-[11px] text-white/40 mb-1">المدة</p>
                    <p className="text-lg font-bold text-white">
                      {pkg.days} <span className="text-xs text-white/50 font-normal">يوم</span>
                    </p>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mb-5">
                  <span className="text-sm text-white/50">إجمالي العائد</span>
                  <span className="text-xl font-bold text-[#ffcc00]">${pkg.total}</span>
                </div>

                {/* CTA */}
                <Link
                  href="/deposit"
                  className="block w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-[#ffcc00] to-[#e6b800] text-black font-bold text-sm hover:from-[#ffd633] hover:to-[#ffcc00] transition-all shadow-lg shadow-[#ffcc00]/20"
                >
                  ابدأ الاستثمار
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-10">
        <div className="max-w-6xl mx-auto px-5 py-8 text-center">
          <p className="text-sm text-white/30">
            © 2025 <span className="text-[#ffcc00]">CRYPTO GUY</span> — جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
                }
