"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);

  const plans = [
    {
      name: "VIP 1",
      price: "$10",
      minimum: "$10",
      daily: "$1",
      duration: "30 يوم",
      total: "$30",
    },
    {
      name: "VIP 2",
      price: "$20",
      minimum: "$20",
      daily: "$2.50",
      duration: "30 يوم",
      total: "$75",
      popular: true,
    },
    {
      name: "VIP 3",
      price: "$50",
      minimum: "$50",
      daily: "$5",
      duration: "30 يوم",
      total: "$150",
    },
    {
      name: "VIP 4",
      price: "$100",
      minimum: "$100",
      daily: "$12",
      duration: "30 يوم",
      total: "$360",
    },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <main className="page" dir="rtl">

      {/* ================= HEADER ================= */}

      <header className="header">

        <button
          className="menuButton"
          onClick={() => setMenuOpen(true)}
          aria-label="فتح القائمة"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="logo">
          Crypto Guys
        </div>

      </header>


      {/* ================= CONTENT ================= */}

      <section className="content">

        <div className="plans">

          {plans.map((plan, index) => (

            <article
              className={`plan ${plan.popular ? "popular" : ""}`}
              key={plan.name}
            >

              {plan.popular && (
                <div className="popularBadge">
                  MOST POPULAR
                </div>
              )}


              {/* البطاقة الرئيسية */}

              <div className="planBody">

                {/* جهة VIP والسعر */}

                <div className="planIdentity">

                  <div className="vipName">
                    {plan.name}
                  </div>

                  <div className="bigPrice">
                    {plan.price}
                  </div>

                </div>


                {/* جهة التفاصيل */}

                <div className="details">

                  <div className="detailRow">
                    <span>الحد الأدنى</span>
                    <strong>{plan.minimum}</strong>
                  </div>

                  <div className="detailRow">
                    <span>الربح اليومي</span>
                    <strong>{plan.daily}</strong>
                  </div>

                  <div className="detailRow">
                    <span>المدى</span>
                    <strong>{plan.duration}</strong>
                  </div>

                  <div className="detailRow totalRow">
                    <span>إجمالي الربح</span>
                    <strong>{plan.total}</strong>
                  </div>

                </div>

              </div>


              {/* زر الاستثمار */}

              <button className="investButton">
                استثمار
              </button>

            </article>

          ))}

        </div>

      </section>


      {/* ================= OVERLAY ================= */}

      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>


      {/* ================= SIDEBAR ================= */}

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>

        <div className="sidebarHeader">

          <div className="sidebarLogo">
            Crypto Guys
          </div>

          <button
            className="closeButton"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>

        </div>


        <nav className="navigation">

          <a href="/referral">
            الإحالة
          </a>

          <a href="/deposit">
            الإيداع والشحن
          </a>

          <a href="/withdraw">
            السحب
          </a>


          {/* المحفظة */}

          <button
            className={`walletButton ${
              walletOpen ? "active" : ""
            }`}
            onClick={() => setWalletOpen(!walletOpen)}
          >
            <span>المحفظة</span>

            <span className="arrow">
              {walletOpen ? "⌃" : "⌄"}
            </span>
          </button>


          <div
            className={`walletMenu ${
              walletOpen ? "walletShow" : ""
            }`}
          >

            <a href="/wallet">
              المحفظة الأساسية
            </a>

            <a href="/wallet">
              محفظة الوساطة
            </a>

          </div>


          <a href="/about">
            معلومات عنا
          </a>

        </nav>

      </aside>


      {/* ================= STYLE ================= */}

      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #050505;
          color: white;
          font-family:
            Arial,
            Tahoma,
            sans-serif;
        }

        button,
        a {
          -webkit-tap-highlight-color: transparent;
        }


        /* ================= PAGE ================= */

        .page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(240, 200, 77, 0.045),
              transparent 32%
            ),
            #050505;

          overflow-x: hidden;
        }


        /* ================= HEADER ================= */

        .header {
          height: 96px;

          width: 100%;

          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #070707;

          border-bottom:
            1px solid #292929;

          z-index: 100;
        }


        .header::after {
          content: "";

          position: absolute;

          bottom: -1px;
          left: 0;

          width: 55%;
          height: 2px;

          background:
            linear-gradient(
              90deg,
              transparent,
              #f0c84d,
              transparent
            );

          opacity: .65;
        }


        .logo {
          color: #f0c84d;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 43px;

          font-weight: 800;

          letter-spacing: -1px;

          direction: ltr;

          text-shadow:
            0 0 12px
            rgba(240, 200, 77, .08);
        }


        /* ================= MENU BUTTON ================= */

        .menuButton {
          position: absolute;

          left: 24px;

          top: 19px;

          width: 62px;
          height: 58px;

          border-radius: 12px;

          background: #101010;

          border:
            1px solid #444;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 7px;

          cursor: pointer;
        }


        .menuButton span {
          display: block;

          width: 31px;
          height: 4px;

          border-radius: 5px;

          background: #f0c84d;

          box-shadow:
            0 0 5px
            rgba(240, 200, 77, .15);
        }


        /* ================= CONTENT ================= */

        .content {
          width: 100%;

          max-width: 1080px;

          margin: 0 auto;

          padding:
            38px 28px 80px;
        }


        .plans {
          width: 100%;

          display: flex;

          flex-direction: column;

          gap: 26px;
        }


        /* ================= CARD ================= */

        .plan {
          position: relative;

          width: 100%;

          min-height: 300px;

          background:
            linear-gradient(
              145deg,
              #171717,
              #0d0d0d
            );

          border:
            1px solid #383838;

          border-radius: 22px;

          padding:
            26px 28px 23px;

          overflow: hidden;

          box-shadow:
            0 15px 40px
            rgba(0,0,0,.40);

          transition:
            transform .2s ease,
            border-color .2s ease;
        }


        .plan:hover {
          border-color: #555;

          transform:
            translateY(-2px);
        }


        /* لمعة خفيفة */

        .plan::before {
          content: "";

          position: absolute;

          top: -100px;
          left: -120px;

          width: 230px;
          height: 320px;

          background:
            linear-gradient(
              120deg,
              transparent,
              rgba(240,200,77,.12),
              transparent
            );

          transform: rotate(18deg);

          pointer-events: none;
        }


        /* ================= POPULAR ================= */

        .plan.popular {
          border:
            4px solid #f0c84d;

          box-shadow:
            0 0 22px
            rgba(240,200,77,.14);
        }


        .popularBadge {
          position: absolute;

          top: -1px;
          left: 30px;

          background: #f0c84d;

          color: #080808;

          padding:
            10px 24px;

          border-radius:
            0 0 13px 13px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 16px;

          font-weight: 800;

          direction: ltr;

          z-index: 5;
        }


        /* ================= CARD BODY ================= */

        .planBody {

          width: 100%;

          min-height: 210px;

          display: grid;

          grid-template-columns:
            38% 62%;

          direction: ltr;

          align-items: stretch;
        }


        /* ================= VIP SIDE ================= */

        .planIdentity {

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          border-right:
            1px solid #343434;

          padding:
            15px 20px;

          direction: ltr;
        }


        .vipName {

          color: #f0c84d;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 40px;

          font-weight: bold;

          line-height: 1.1;

          margin-bottom: 15px;
        }


        .bigPrice {

          color: #fff;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 68px;

          font-weight: bold;

          line-height: 1;

          white-space: nowrap;
        }


        /* ================= DETAILS ================= */

        .details {

          padding:
            8px 0 8px 30px;

          direction: rtl;

          display: flex;

          flex-direction: column;

          justify-content: center;
        }


        .detailRow {

          width: 100%;

          min-height: 48px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 20px;

          border-bottom:
            1px solid #292929;

          direction: rtl;
        }


        .detailRow:last-child {
          border-bottom: none;
        }


        .detailRow span {

          color: #d1d1d1;

          font-size: 19px;

          white-space: nowrap;
        }


        .detailRow strong {

          color: #f0c84d;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 22px;

          font-weight: bold;

          direction: ltr;

          white-space: nowrap;
        }


        .totalRow {
          border-top:
            1px solid #444;

          margin-top: 5px;

          padding-top: 5px;
        }


        /* ================= BUTTON ================= */

        .investButton {

          width: 100%;

          height: 61px;

          margin-top: 20px;

          border: none;

          border-radius: 13px;

          background:
            linear-gradient(
              180deg,
              #f5cf4c,
              #dcae2e
            );

          color: #080808;

          font-size: 22px;

          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 8px 18px
            rgba(240,200,77,.10);

          transition:
            transform .15s ease,
            filter .15s ease;
        }


        .investButton:hover {
          filter: brightness(1.05);
        }


        .investButton:active {
          transform:
            scale(.985);
        }


        /* ================= OVERLAY ================= */

        .overlay {

          position: fixed;

          inset: 0;

          background:
            rgba(0,0,0,.72);

          backdrop-filter:
            blur(3px);

          opacity: 0;

          visibility: hidden;

          transition:
            opacity .25s ease,
            visibility .25s ease;

          z-index: 900;
        }


        .overlay.show {
          opacity: 1;

          visibility: visible;
        }


        /* ================= SIDEBAR ================= */

        .sidebar {

          position: fixed;

          top: 0;
          right: 0;

          width: 360px;

          max-width: 88vw;

          height: 100vh;

          background:
            linear-gradient(
              180deg,
              #111,
              #080808
            );

          border-left:
            1px solid #343434;

          box-shadow:
            -15px 0 50px
            rgba(0,0,0,.65);

          transform:
            translateX(105%);

          transition:
            transform .3s ease;

          z-index: 1000;

          padding:
            28px 25px;

          overflow-y: auto;
        }


        .sidebar.open {
          transform:
            translateX(0);
        }


        /* ================= SIDEBAR HEADER ================= */

        .sidebarHeader {

          min-height: 72px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;

          border-bottom:
            1px solid #343434;

          padding-bottom: 20px;

          margin-bottom: 12px;
        }


        .sidebarLogo {

          color: #f0c84d;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 31px;

          font-weight: bold;

          direction: ltr;

          white-space: nowrap;
        }


        .closeButton {

          width: 52px;
          height: 52px;

          border:
            1px solid #555;

          border-radius: 12px;

          background: #111;

          color: #f0c84d;

          font-size: 34px;

          line-height: 1;

          cursor: pointer;
        }


        /* ================= NAV ================= */

        .navigation {

          display: flex;

          flex-direction: column;

          direction: rtl;
        }


        .navigation > a,
        .walletButton {

          width: 100%;

          min-height: 64px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          padding:
            0 10px;

          color: #ededed;

          background: transparent;

          border: none;

          border-bottom:
            1px solid #303030;

          text-decoration: none;

          font-size: 20px;

          font-family:
            Arial,
            Tahoma,
            sans-serif;

          text-align: right;

          cursor: pointer;
        }


        .navigation > a:hover,
        .walletButton:hover,
        .walletButton.active {

          color: #f0c84d;
        }


        .arrow {
          color: #f0c84d;

          font-size: 24px;
        }


        /* ================= WALLET ================= */

        .walletMenu {

          max-height: 0;

          overflow: hidden;

          background: #0b0b0b;

          transition:
            max-height .3s ease;
        }


        .walletMenu.walletShow {
          max-height: 160px;
        }


        .walletMenu a {

          display: block;

          padding:
            18px 25px;

          color: #bdbdbd;

          text-decoration: none;

          border-bottom:
            1px solid #242424;

          font-size: 17px;

          text-align: right;
        }


        .walletMenu a:hover {
          color: #f0c84d;
        }


        /* ================= TABLET ================= */

        @media (max-width: 800px) {

          .content {
            max-width: 700px;

            padding:
              32px 22px 70px;
          }

          .planBody {
            grid-template-columns:
              40% 60%;
          }

          .vipName {
            font-size: 34px;
          }

          .bigPrice {
            font-size: 58px;
          }

        }


        /* ================= MOBILE ================= */

        @media (max-width: 600px) {

          .header {
            height: 92px;
          }


          .logo {
            font-size: 34px;
          }


          .menuButton {
            left: 18px;

            top: 18px;

            width: 58px;
            height: 55px;
          }


          .content {

            width: 100%;

            padding:
              38px 20px 70px;
          }


          .plans {

            gap: 34px;
          }


          .plan {

            min-height: 0;

            padding:
              24px 22px 22px;

            border-radius: 21px;
          }


          .plan.popular {

            border-width: 4px;
          }


          .planBody {

            grid-template-columns:
              39% 61%;

            min-height: 250px;
          }


          .planIdentity {

            padding:
              12px 8px;
          }


          .vipName {

            font-size: 30px;

            text-align: center;
          }


          .bigPrice {

            font-size: 49px;
          }


          .details {

            padding:
              5px 0 5px 17px;
          }


          .detailRow {

            min-height: 57px;

            gap: 10px;
          }


          .detailRow span {

            font-size: 16px;
          }


          .detailRow strong {

            font-size: 19px;
          }


          .investButton {

            height: 61px;

            margin-top: 20px;

            font-size: 21px;
          }


          .popularBadge {

            left: 25px;

            padding:
              9px 19px;

            font-size: 14px;
          }


          .sidebar {

            width: 84vw;

            max-width: 360px;

            padding:
              25px 20px;
          }


          .sidebarLogo {

            font-size: 27px;
          }

        }


        /* ================= SMALL PHONES ================= */

        @media (max-width: 380px) {

          .logo {
            font-size: 29px;
          }


          .content {
            padding:
              30px 15px 60px;
          }


          .plan {
            padding:
              22px 17px 20px;
          }


          .planBody {

            grid-template-columns:
              38% 62%;

            min-height: 235px;
          }


          .vipName {
            font-size: 27px;
          }


          .bigPrice {
            font-size: 43px;
          }


          .details {
            padding-left: 12px;
          }


          .detailRow span {
    font-size: 14px;
}

}


        
