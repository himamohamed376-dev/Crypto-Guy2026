"use client";

import { useState } from "react";

const plans = [
  {
    id: 1,
    name: "VIP 1",
    price: 10,
    daily: 1,
    days: 30,
    total: 30,
  },
  {
    id: 2,
    name: "VIP 2",
    price: 20,
    daily: 2.5,
    days: 30,
    total: 75,
    popular: true,
  },
  {
    id: 3,
    name: "VIP 3",
    price: 50,
    daily: 5,
    days: 30,
    total: 150,
  },
  {
    id: 4,
    name: "VIP 4",
    price: 100,
    daily: 12,
    days: 30,
    total: 360,
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const invest = (plan) => {
    window.location.href = `/deposit?plan=${plan.id}`;
  };

  return (
    <>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html,
        body {
          background: #050607;
          color: #fff;
          font-family: Arial, Helvetica, sans-serif;
        }

        body {
          min-height: 100vh;
        }

        button {
          font-family: inherit;
        }

        .page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 20% 20%,
              rgba(212, 164, 35, 0.06),
              transparent 30%
            ),
            linear-gradient(135deg, #050607 0%, #090a0b 50%, #030404 100%);
        }

        /* HEADER */

        .header {
          height: 96px;
          display: flex;
          align-items: center;
          position: relative;
          padding: 0 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(4, 5, 6, 0.97);
          overflow: hidden;
        }

        .header::after {
          content: "";
          position: absolute;
          right: 7%;
          bottom: 0;
          width: 190px;
          height: 2px;
          background: #f4c83d;
          box-shadow: 0 0 14px rgba(244, 200, 61, 0.5);
          transform: skewX(-45deg);
        }

        .menuButton {
          width: 66px;
          height: 62px;
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: 13px;
          background: linear-gradient(145deg, #111315, #08090a);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 7px;
          cursor: pointer;
          z-index: 5;
        }

        .menuButton span {
          width: 30px;
          height: 3px;
          border-radius: 10px;
          background: #f5c83d;
          box-shadow: 0 0 7px rgba(245, 200, 61, 0.25);
        }

        .logo {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          color: #f4c83d;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 48px;
          font-weight: 700;
          white-space: nowrap;
          text-shadow: 0 0 18px rgba(244, 200, 61, 0.13);
        }

        /* CONTENT */

        .content {
          width: 100%;
          max-width: 690px;
          padding: 34px 26px 70px;
          margin: 0 auto;
        }

        .plans {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* PLAN CARD */

        .plan {
          position: relative;
          width: 100%;
          min-height: 307px;
          border: 1px solid rgba(255, 255, 255, 0.23);
          border-radius: 20px;
          background:
            radial-gradient(
              circle at 0% 0%,
              rgba(245, 198, 54, 0.12),
              transparent 27%
            ),
            linear-gradient(145deg, #111314, #070809);
          overflow: hidden;
          box-shadow:
            inset 0 0 35px rgba(255, 255, 255, 0.015),
            0 8px 30px rgba(0, 0, 0, 0.35);
        }

        .plan::before {
          content: "";
          position: absolute;
          left: -55px;
          top: -40px;
          width: 115px;
          height: 170px;
          background: linear-gradient(
            130deg,
            rgba(255, 220, 80, 0.55),
            rgba(255, 196, 45, 0.05) 55%,
            transparent
          );
          transform: skewX(-18deg);
          pointer-events: none;
        }

        .popularPlan {
          border: 4px solid #f4c83d;
          box-shadow:
            0 0 12px rgba(244, 200, 61, 0.4),
            0 0 35px rgba(244, 200, 61, 0.16),
            inset 0 0 30px rgba(244, 200, 61, 0.04);
        }

        .popularBadge {
          position: absolute;
          top: -1px;
          left: 22px;
          min-width: 205px;
          padding: 11px 20px;
          border-radius: 0 0 18px 18px;
          background: linear-gradient(180deg, #ffe05b, #e9b72c);
          color: #080808;
          font-size: 20px;
          font-weight: 800;
          text-align: center;
          z-index: 3;
        }

        .planBody {
          min-height: 307px;
          display: grid;
          grid-template-columns: 42% 58%;
          position: relative;
        }

        .planMain {
          padding: 45px 22px 72px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-right: 1px solid rgba(255, 255, 255, 0.16);
          position: relative;
        }

        .popularPlan .planMain {
          padding-top: 72px;
        }

        .vipName {
          color: #f4c83d;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 39px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .bigPrice {
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 64px;
          line-height: 1;
          text-shadow: 0 3px 10px rgba(0, 0, 0, 0.6);
        }

        .details {
          padding: 27px 25px 72px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          direction: rtl;
        }

        .detailRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          min-height: 54px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.14);
          font-size: 21px;
        }

        .detailRow:last-child {
          border-bottom: none;
        }

        .detailLabel {
          color: #eeeeee;
          white-space: nowrap;
        }

        .detailValue {
          color: #f4c83d;
          font-weight: 800;
          white-space: nowrap;
        }

        .investButton {
          position: absolute;
          left: 24px;
          right: 24px;
          bottom: 20px;
          height: 57px;
          border: none;
          border-radius: 15px;
          background: linear-gradient(180deg, #ffda55 0%, #eab52d 100%);
          color: #111;
          font-size: 24px;
          font-weight: 800;
          cursor: pointer;
          box-shadow:
            0 5px 14px rgba(0, 0, 0, 0.35),
            inset 0 1px rgba(255, 255, 255, 0.35);
          transition: 0.2s ease;
          z-index: 4;
        }

        .investButton:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
        }

        .investButton:active {
          transform: translateY(0);
        }

        /* SIDE MENU */

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.68);
          z-index: 20;
          opacity: 0;
          visibility: hidden;
          transition: 0.25s ease;
        }

        .overlay.show {
          opacity: 1;
          visibility: visible;
        }

        .sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: min(390px, 88vw);
          height: 100vh;
          background:
            linear-gradient(
              180deg,
              rgba(13, 15, 17, 0.99),
              rgba(5, 6, 7, 0.99)
            );
          border-left: 1px solid rgba(255, 255, 255, 0.18);
          z-index: 30;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          padding: 28px 24px;
          overflow-y: auto;
        }

        .sidebar.open {
          transform: translateX(0);
        }

        .closeButton {
          width: 60px;
          height: 60px;
          border-radius: 13px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: #101213;
          color: #f4c83d;
          font-size: 34px;
          cursor: pointer;
        }

        .sidebarLogo {
          color: #f4c83d;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 39px;
          font-weight: 700;
          text-align: center;
          margin: -55px 0 45px;
        }

        .sideLinks {
          direction: rtl;
          display: flex;
          flex-direction: column;
        }

        .sideLink {
          min-height: 64px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0 20px;
          color: #f1f1f1;
          text-decoration: none;
          font-size: 21px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          transition: 0.2s;
        }

        .sideLink:hover {
          color: #f4c83d;
          background: rgba(244, 200, 61, 0.06);
        }

        .activeLink {
          color: #f4c83d;
          border-right: 5px solid #f4c83d;
          background: linear-gradient(
            90deg,
            rgba(244, 200, 61, 0.04),
            rgba(244, 200, 61, 0.25)
          );
        }

        .submenu {
          background: rgba(255, 255, 255, 0.015);
        }

        .submenu .sideLink {
          padding-right: 42px;
          font-size: 18px;
        }

        /* TABLET */

        @media (max-width: 700px) {
          .header {
            height: 94px;
            padding: 0 22px;
          }

          .logo {
            font-size: 41px;
          }

          .content {
            padding: 34px 26px 60px;
          }

          .plan {
            min-height: 300px;
          }

          .planBody {
            min-height: 300px;
          }

          .vipName {
            font-size: 36px;
          }

          .bigPrice {
            font-size: 58px;
          }

          .detailRow {
            font-size: 19px;
          }
        }

        /* PHONE */

        @media (max-width: 480px) {
          .header {
            height: 92px;
            padding: 0 16px;
          }

          .menuButton {
            width: 64px;
            height: 58px;
          }

          .logo {
            font-size: 32px;
          }

          .header::after {
            width: 110px;
            right: 2%;
          }

          .content {
            padding: 24px 16px 55px;
          }

          .plans {
            gap: 17px;
          }

          .plan {
            min-height: 285px;
            border-radius: 18px;
          }

          .planBody {
            min-height: 285px;
            grid-template-columns: 41% 59%;
          }

          .planMain {
            padding: 38px 10px 70px;
          }

          .popularPlan .planMain {
            padding-top: 65px;
          }

          .vipName {
            font-size: 28px;
          }

          .bigPrice {
            font-size: 47px;
          }

          .details {
            padding: 23px 13px 70px;
          }

          .detailRow {
            min-height: 48px;
            font-size: 15px;
            gap: 5px;
          }

          .detailLabel {
            font-size: 15px;
          }

          .detailValue {
            font-size: 15px;
          }

          .investButton {
            left: 13px;
            right: 13px;
            bottom: 13px;
            height: 52px;
            font-size: 20px;
            border-radius: 13px;
          }

          .popularBadge {
            left: 12px;
            min-width: 155px;
            padding: 8px 12px;
            font-size: 15px;
          }

          .sidebar {
            width: 88vw;
            padding: 22px 18px;
          }

          .sidebarLogo {
            font-size: 32px;
            margin-top: -50px;
          }

          .sideLink {
            font-size: 18px;
          }
        }

        @media (max-width: 360px) {
          .logo {
            font-size: 27px;
          }

          .planBody {
            grid-template-columns: 40% 60%;
          }

          .vipName {
            font-size: 24px;
          }

          .bigPrice {
            font-size: 40px;
          }

          .detailRow,
          .detailLabel,
          .detailValue {
            font-size: 13px;
          }
        }
      `}</style>

      <div className="page">
        {/* HEADER */}
        <header className="header">
          <button
            className="menuButton"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="فتح القائمة"
          >
            <span />
            <span />
            <span />
          </button>

          <div className="logo">Crypto Guys</div>
        </header>

        {/* PLANS */}
        <main className="content">
          <section className="plans">
            {plans.map((plan) => (
              <article
                className={`plan ${plan.popular ? "popularPlan" : ""}`}
                key={plan.id}
              >
                {plan.popular && (
                  <div className="popularBadge">MOST POPULAR</div>
                )}

                <div className="planBody">
                  <div className="planMain">
                    <div className="vipName">{plan.name}</div>
                    <div className="bigPrice">${plan.price}</div>
                  </div>

                  <div className="details">
                    <div className="detailRow">
                      <span className="detailLabel">الحد الأدنى</span>
                      <strong className="detailValue">
                        ${plan.price}
                      </strong>
                    </div>

                    <div className="detailRow">
                      <span className="detailLabel">الربح اليومي</span>
                      <strong className="detailValue">
                        ${plan.daily}
                      </strong>
                    </div>

                    <div className="detailRow">
                      <span className="detailLabel">المدى</span>
                      <strong className="detailValue">
                        {plan.days} يوم
                      </strong>
                    </div>

                    <div className="detailRow">
                      <span className="detailLabel">إجمالي الربح</span>
                      <strong className="detailValue">
                        ${plan.total}
                      </strong>
                    </div>
                  </div>

                  <button
                    className="investButton"
                    type="button"
                    onClick={() => invest(plan)}
                  >
                    استثمار
                  </button>
                </div>
              </article>
            ))}
          </section>
        </main>

        {/* OVERLAY */}
        <div
          className={`overlay ${menuOpen ? "show" : ""}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* SIDEBAR */}
        <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
          <button
            className="closeButton"
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="إغلاق"
          >
            ×
          </button>

          <div className="sidebarLogo">Crypto Guys</div>

          <nav className="sideLinks">
            <a className="sideLink activeLink" href="#">
              الإحالة
            </a>

            <a className="sideLink" href="/deposit">
              الإيداع والشحن
            </a>

            <a className="sideLink" href="/withdraw">
              السحب
            </a>

            <div className="sideLink">المحفظة</div>

            <div className="submenu">
              <a className="sideLink" href="/wallet">
                المحفظة الأساسية
              </a>

              <a className="sideLink" href="/wallet">
                محفظة الوساطة
              </a>
            </div>

            <a className="sideLink" href="#">
              معلومات عنا
            </a>
          </nav>
        </aside>
      </div>
    </>
  );
                  }
