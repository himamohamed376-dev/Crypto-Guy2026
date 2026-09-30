'use client';

import { useState } from 'react';

const plans = [
  { id: 1, name: 'VIP 1', price: 10, daily: 1, days: 30, total: 30 },
  { id: 2, name: 'VIP 2', price: 20, daily: 2.5, days: 30, total: 75, popular: true },
  { id: 3, name: 'VIP 3', price: 50, daily: 5, days: 30, total: 150 },
  { id: 4, name: 'VIP 4', price: 100, daily: 12, days: 30, total: 360 },
];

function MenuIcon() {
  return (
    <span className="menuIcon">
      <span />
      <span />
      <span />
    </span>
  );
}

function CloseIcon() {
  return <span className="closeIcon">×</span>;
}

function PlanCard({ plan, onInvest }) {
  return (
    <article className={`plan ${plan.popular ? 'popular' : ''}`}>
      {plan.popular && (
        <div className="popularBadge">
          MOST POPULAR
        </div>
      )}

      <div className="planTop">

        <div className="planNameBox">
          <div className="vipName">
            {plan.name}
          </div>

          <div className="planPrice">
            ${plan.price}
          </div>
        </div>

        <div className="planDetails" dir="rtl">

          <div className="detailRow">
            <span>الحد الأدنى</span>
            <strong>${plan.price}</strong>
          </div>

          <div className="detailRow">
            <span>الربح اليومي</span>
            <strong>${plan.daily}</strong>
          </div>

          <div className="detailRow">
            <span>المدى</span>
            <strong>{plan.days} يوم</strong>
          </div>

          <div className="detailRow totalRow">
            <span>إجمالي الربح</span>
            <strong>${plan.total}</strong>
          </div>

        </div>
      </div>

      <button
        className="investButton"
        onClick={() => onInvest(plan)}
        type="button"
      >
        استثمار
      </button>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (path) => {
    window.location.href = path;
  };

  const handleInvest = (plan) => {
    window.location.href =
      `/deposit?plan=${plan.id}&amount=${plan.price}`;
  };

  return (
    <main className="site" dir="rtl">

      {/* HEADER */}
      <header className="header">

        <button
          className="menuButton"
          onClick={() => setMenuOpen(true)}
          aria-label="فتح القائمة"
          type="button"
        >
          <MenuIcon />
        </button>

        <div className="logo">
          Crypto Guys
        </div>

        <div className="headerSpace" />

      </header>


      {/* SIDEBAR */}
      {menuOpen && (
        <div
          className="overlay"
          onClick={() => setMenuOpen(false)}
        >

          <aside
            className="sidebar"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="sidebarHeader">

              <button
                className="closeButton"
                onClick={() => setMenuOpen(false)}
                aria-label="إغلاق القائمة"
                type="button"
              >
                <CloseIcon />
              </button>

              <div className="sidebarLogo">
                Crypto Guys
              </div>

            </div>


            <nav className="nav">

              <button
                className="navItem active"
                onClick={() => goTo('/')}
                type="button"
              >
                الرئيسية
              </button>

              <button
                className="navItem"
                onClick={() => goTo('/deposit')}
                type="button"
              >
                الإيداع والشحن
              </button>

              <button
                className="navItem"
                onClick={() => goTo('/withdraw')}
                type="button"
              >
                السحب
              </button>


              <div className="navGroup">

                <div className="navItem navTitle">
                  <span>المحفظة</span>
                  <span>⌃</span>
                </div>

                <button
                  className="subItem"
                  onClick={() => goTo('/wallet')}
                  type="button"
                >
                  المحفظة الأساسية
                </button>

                <button
                  className="subItem"
                  onClick={() => goTo('/wallet')}
                  type="button"
                >
                  محفظة الوساطة
                </button>

              </div>


              <button
                className="navItem"
                onClick={() => goTo('/about')}
                type="button"
              >
                معلومات عنا
              </button>

            </nav>

          </aside>

        </div>
      )}


      {/* HERO */}
      <section className="hero">

        <p className="eyebrow">
          خطط الاستثمار
        </p>

        <h1>
          اختر الباقة المناسبة لك
        </h1>

        <p className="subtitle">
          جميع الباقات متاحة أمامك — اختر الباقة التي تريدها
          للانتقال إلى صفحة الإيداع.
        </p>

      </section>


      {/* PLANS */}
      <section
        className="plans"
        aria-label="باقات الاستثمار"
      >

        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onInvest={handleInvest}
          />
        ))}

      </section>


      {/* FOOTER */}
      <footer className="footer">

        <div>
          © 2026 Crypto Guys
        </div>

        <div>
          يرجى مراجعة تفاصيل الباقة قبل الإيداع.
        </div>

      </footer>


      {/* CSS */}
      <style jsx>{`

        * {
          box-sizing: border-box;
        }


        .site {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(242, 190, 43, 0.08),
              transparent 30%
            ),
            linear-gradient(
              180deg,
              #070809 0%,
              #0b0c0e 50%,
              #050607 100%
            );

          color: #f5f5f5;

          font-family:
            Georgia,
            'Times New Roman',
            serif;

          overflow-x: hidden;
        }


        /* HEADER */

        .header {
          height: 96px;

          display: flex;
          align-items: center;

          gap: 22px;

          padding: 0 28px;

          position: sticky;
          top: 0;

          z-index: 20;

          background: rgba(5, 6, 7, 0.94);

          border-bottom:
            1px solid rgba(255, 255, 255, 0.14);

          backdrop-filter: blur(14px);
        }


        .menuButton,
        .closeButton {

          width: 64px;
          height: 64px;

          flex: 0 0 64px;

          border:
            1px solid rgba(255, 255, 255, 0.22);

          border-radius: 15px;

          background:
            linear-gradient(
              145deg,
              #111417,
              #090a0b
            );

          color: #f4c843;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;

          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.35);
        }


        .menuButton:hover,
        .closeButton:hover {

          border-color: #f4c843;
        }


        .menuIcon {

          width: 31px;

          display: grid;

          gap: 6px;
        }


        .menuIcon span {

          height: 4px;
          width: 100%;

          border-radius: 4px;

          background: #f4c843;
        }


        .closeIcon {

          font-family: Arial, sans-serif;

          font-size: 38px;

          line-height: 1;

          font-weight: 300;
        }


        .logo,
        .sidebarLogo {

          color: #f4c843;

          font-weight: 800;

          letter-spacing: -1.5px;

          text-shadow:
            0 0 22px rgba(244, 200, 67, 0.18);
        }


        .logo {

          font-size:
            clamp(32px, 5vw, 54px);

          white-space: nowrap;
        }


        .headerSpace {
          flex: 1;
        }


        /* HERO */

        .hero {

          width:
            min(1100px, calc(100% - 32px));

          margin: 0 auto;

          padding:
            54px 10px 30px;

          text-align: center;
        }


        .eyebrow {

          margin:
            0 0 10px;

          color: #f4c843;

          font-size: 18px;

          font-weight: 700;
        }


        .hero h1 {

          margin: 0;

          font-size:
            clamp(30px, 5vw, 48px);

          color: #ffffff;
        }


        .subtitle {

          max-width: 680px;

          margin:
            14px auto 0;

          color: #aeb2b8;

          font-family: Arial, sans-serif;

          font-size: 16px;

          line-height: 1.8;
        }


        /* PLANS */

        .plans {

          width:
            min(1100px, calc(100% - 32px));

          margin: 0 auto;

          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 24px;

          padding:
            10px 0 50px;
        }


        .plan {

          position: relative;

          min-width: 0;

          padding: 28px;

          border:
            1px solid rgba(255, 255, 255, 0.18);

          border-radius: 24px;

          background:

            radial-gradient(
              circle at 0% 0%,
              rgba(244, 200, 67, 0.09),
              transparent 35%
            ),

            linear-gradient(
              145deg,
              #141619,
              #090a0b 70%
            );

          box-shadow:

            inset
            0 0 0 1px
            rgba(255, 255, 255, 0.02),

            0 18px 45px
            rgba(0, 0, 0, 0.3);

          overflow: hidden;
        }


        .plan::before {

          content: '';

          position: absolute;

          top: 0;
          left: 0;

          width: 130px;
          height: 130px;

          background:
            linear-gradient(
              135deg,
              rgba(244, 200, 67, 0.34),
              transparent 58%
            );

          pointer-events: none;
        }


        .plan.popular {

          border:
            2px solid #f4c843;

          box-shadow:

            0 0 30px
            rgba(244, 200, 67, 0.12),

            0 18px 45px
            rgba(0, 0, 0, 0.35);
        }


        .popularBadge {

          position: absolute;

          top: 0;
          left: 25px;

          padding:
            10px 24px;

          border-radius:
            0 0 18px 18px;

          background: #f4c843;

          color: #111;

          font-family:
            Arial, sans-serif;

          font-size: 14px;

          font-weight: 900;

          letter-spacing: 0.4px;
        }


        .planTop {

          display: grid;

          grid-template-columns:
            minmax(130px, 0.85fr)
            minmax(0, 1.35fr);

          gap: 24px;

          align-items: stretch;
        }


        .planNameBox {

          display: flex;

          flex-direction: column;

          justify-content: center;

          align-items: center;

          padding: 28px 10px;

          border-left:
            1px solid
            rgba(255, 255, 255, 0.12);
        }


        .vipName {

          color: #f4c843;

          font-size:
            clamp(27px, 4vw, 42px);

          font-weight: 900;

          white-space: nowrap;
        }


        .planPrice {

          margin-top: 8px;

          color: #fff;

          font-size:
            clamp(42px, 6vw, 62px);

          line-height: 1;
        }


        .planDetails {

          padding: 8px 0;
        }


        .detailRow {

          min-height: 54px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 16px;

          border-bottom:
            1px solid
            rgba(255, 255, 255, 0.11);

          font-family:
            Arial, sans-serif;
        }


        .detailRow span {

          color: #d9d9dc;

          font-size: 16px;
        }


        .detailRow strong {

          color: #f4c843;

          font-family:
            Georgia,
            'Times New Roman',
            serif;

          font-size: 20px;

          white-space: nowrap;
        }


        .totalRow {

          border-bottom: 0;

          margin-top: 4px;
        }


        .investButton {

          width: 100%;

          height: 56px;

          margin-top: 22px;

          border: 0;

          border-radius: 14px;

          background:
            linear-gradient(
              180deg,
              #ffd957 0%,
              #e6ae24 100%
            );

          color: #111;

          font-family:
            Arial, sans-serif;

          font-size: 20px;

          font-weight: 900;

          cursor: pointer;

          box-shadow:
            0 8px 20px
            rgba(244, 200, 67, 0.16);
        }


        .investButton:hover {

          filter: brightness(1.07);

          transform:
            translateY(-1px);
        }


        .investButton:active {

          transform:
            translateY(0);
        }


        /* FOOTER */

        .footer {

          width:
            min(1100px, calc(100% - 32px));

          margin: 0 auto;

          padding:
            25px 0 45px;

          border-top:
            1px solid
            rgba(255, 255, 255, 0.1);

          display: flex;

          justify-content: space-between;

          gap: 20px;

          color: #777b82;

          font-family:
            Arial, sans-serif;

          font-size: 13px;
        }


        /* SIDEBAR */

        .overlay {

          position: fixed;

          inset: 0;

          z-index: 100;

          background:
            rgba(0, 0, 0, 0.7);

          backdrop-filter:
            blur(3px);
        }


        .sidebar {

          width:
            min(390px, 86vw);

          height: 100%;

          margin-left: auto;

          padding:
            28px 24px;

          background:
            linear-gradient(
              180deg,
              #101214,
              #070809
            );

          border-left:
            1px solid
            rgba(255, 255, 255, 0.14);

          box-shadow:
            -20px 0 60px
            rgba(0, 0, 0, 0.45);

          overflow-y: auto;
        }


        .sidebarHeader {

          display: flex;

          align-items: center;

          gap: 18px;

          padding-bottom: 26px;

          border-bottom:
            1px solid
            rgba(255, 255, 255, 0.14);
        }


        .closeButton {

          width: 58px;
          height: 58px;

          flex-basis: 58px;
        }


        .sidebarLogo {

          font-size: 34px;

          white-space: nowrap;
        }


        .nav {

          padding-top: 24px;
        }


        .navItem,
        .subItem {

          width: 100%;

          min-height: 58px;

          padding:
            13px 16px;

          border: 0;

          border-bottom:
            1px solid
            rgba(255, 255, 255, 0.12);

          background: transparent;

          color: #eee;

          text-align: right;

          font-family:
            Arial, sans-serif;

          font-size: 18px;

          cursor: pointer;
        }


        .navItem:hover,
        .subItem:hover,
        .navItem.active {

          color: #111;

          background:
            rgba(244, 200, 67, 0.95);
        }


        .navTitle {

          display: flex;

          align-items: center;

          justify-content: space-between;

          cursor: default;

          color: #eee;
        }


        .navTitle:hover {

          color: #eee;

          background: transparent;
        }


        .subItem {

          padding-right: 35px;

          color: #b9bdc3;

          font-size: 16px;
        }


        /* TABLET / MOBILE */

        @media (max-width: 760px) {

          .header {

            height: 86px;

            padding: 0 18px;
          }


          .menuButton {

            width: 58px;
            height: 58px;

            flex-basis: 58px;
          }


          .plans {

            grid-template-columns: 1fr;

            width:
              min(620px, calc(100% - 24px));

            gap: 18px;
          }


          .hero {

            width:
              calc(100% - 24px);

            padding-top: 38px;
          }


          .plan {

            padding: 22px;
          }


          .footer {

            width:
              calc(100% - 24px);

            flex-direction: column;
          }

        }


        @media (max-width: 480px) {

          .logo {

            font-size: 31px;
          }


          .planTop {

            grid-template-columns: 1fr;

            gap: 8px;
          }


          .planNameBox {

            border-left: 0;

            border-bottom:
              1px solid
              rgba(255, 255, 255, 0.12);

            padding: 20px 10px;
          }


          .planDetails {

            padding-top: 5px;
          }


          .detailRow span {

            font-size: 15px;
          }


          .detailRow strong {

            font-size: 19px;
          }


          .popularBadge {

            left: 18px;

            padding:
              8px 15px;

            font-size: 11px;
          }


          .sidebar {

            width: 88vw;

            padding:
              20px 16px;
          }


          .sidebarLogo {

            font-size: 28px;
          }

        }

      `}</style>

    </main>
  );
}
