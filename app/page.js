"use client";

import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    name: "VIP 1",
    price: "$10",
    min: "$10",
    daily: "$1",
    period: "30 يوم",
    total: "$30",
  },
  {
    name: "VIP 2",
    price: "$20",
    min: "$20",
    daily: "$2.50",
    period: "30 يوم",
    total: "$75",
    popular: true,
  },
  {
    name: "VIP 3",
    price: "$50",
    min: "$50",
    daily: "$5",
    period: "30 يوم",
    total: "$150",
  },
  {
    name: "VIP 4",
    price: "$100",
    min: "$100",
    daily: "$12",
    period: "30 يوم",
    total: "$360",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);

  return (
    <main dir="rtl" className="page">

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


      {/* ================= OVERLAY ================= */}

      {menuOpen && (
        <div
          className="overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}


      {/* ================= SIDEBAR ================= */}

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>

        <div className="sidebarHeader">

          <div className="sideLogo">
            Crypto Guys
          </div>

          <button
            className="closeButton"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>

        </div>


        <nav>

          <Link
            href="/referral"
            className="sideLink active"
            onClick={() => setMenuOpen(false)}
          >
            الإحالة
          </Link>


          <Link
            href="/deposit"
            className="sideLink"
            onClick={() => setMenuOpen(false)}
          >
            الإيداع والشحن
          </Link>


          <Link
            href="/withdraw"
            className="sideLink"
            onClick={() => setMenuOpen(false)}
          >
            السحب
          </Link>


          {/* WALLET */}

          <button
            className={`walletButton ${walletOpen ? "selected" : ""}`}
            onClick={() => setWalletOpen(!walletOpen)}
          >
            <span>المحفظة</span>

            <span className="arrow">
              {walletOpen ? "⌃" : "⌄"}
            </span>
          </button>


          {walletOpen && (
            <div className="walletMenu">

              <Link
                href="/wallet"
                className="walletLink"
                onClick={() => setMenuOpen(false)}
              >
                المحفظة الأساسية
              </Link>

              <Link
                href="/wallet"
                className="walletLink"
                onClick={() => setMenuOpen(false)}
              >
                محفظة الوساطة
              </Link>

            </div>
          )}


          <Link
            href="/about"
            className="sideLink"
            onClick={() => setMenuOpen(false)}
          >
            معلومات عنا
          </Link>

        </nav>

      </aside>


      {/* ================= CONTENT ================= */}

      <section className="content">

        <div className="plans">

          {plans.map((plan) => (

            <article
              className={`plan ${plan.popular ? "popular" : ""}`}
              key={plan.name}
            >

              {plan.popular && (
                <div className="popularBadge">
                  MOST POPULAR
                </div>
              )}


              {/* LEFT / PRICE */}

              <div className="planMain">

                <div className="vipName">
                  {plan.name}
                </div>

                <div className="price">
                  {plan.price}
                </div>

              </div>


              {/* RIGHT / DETAILS */}

              <div className="details">

                <div className="detailRow">

                  <span className="value">
                    {plan.min}
                  </span>

                  <span className="label">
                    الحد الأدنى
                  </span>

                </div>


                <div className="detailRow">

                  <span className="value">
                    {plan.daily}
                  </span>

                  <span className="label">
                    الربح اليومي
                  </span>

                </div>


                <div className="detailRow">

                  <span className="value period">
                    {plan.period}
                  </span>

                  <span className="label">
                    المدى
                  </span>

                </div>


                <div className="detailRow totalRow">

                  <span className="value">
                    {plan.total}
                  </span>

                  <span className="label">
                    إجمالي الربح
                  </span>

                </div>

              </div>


              {/* INVEST */}

              <Link
                href="/deposit"
                className="investButton"
              >
                استثمار
              </Link>

            </article>

          ))}

        </div>

      </section>


      {/* ================= CSS ================= */}

      <style jsx>{`

        * {
          box-sizing: border-box;
        }


        .page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 50% -10%,
              #191919 0%,
              #090909 45%,
              #050505 100%
            );

          color: white;
          overflow-x: hidden;
        }


        /* HEADER */

        .header {
          height: 96px;

          width: 100%;

          position: sticky;
          top: 0;

          z-index: 1000;

          display: flex;
          align-items: center;
          justify-content: center;

          background: rgba(5,5,5,.96);

          border-bottom:
            1px solid #303030;
        }


        .logo {
          color: #f2c94c;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 42px;

          font-weight: 700;

          direction: ltr;

          text-shadow:
            0 0 18px rgba(242,201,76,.12);
        }


        /* MENU */

        .menuButton {
          position: absolute;

          left: 24px;

          top: 17px;

          width: 62px;
          height: 62px;

          border-radius: 13px;

          border:
            1px solid #444;

          background:
            linear-gradient(
              145deg,
              #151515,
              #090909
            );

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap: 7px;

          cursor: pointer;
        }


        .menuButton span {
          width: 32px;
          height: 4px;

          border-radius: 5px;

          background: #f2c94c;
        }


        /* CONTENT */

        .content {
          width: 100%;

          max-width: 1100px;

          margin: 0 auto;

          padding:
            34px 28px 80px;
        }


        .plans {
          display: flex;

          flex-direction: column;

          gap: 38px;
        }


        /* CARD */

        .plan {
          position: relative;

          width: 100%;

          min-height: 305px;

          padding: 34px 34px 24px;

          display: grid;

          grid-template-columns:
            38% 62%;

          grid-template-rows:
            auto auto;

          column-gap: 0;

          background:
            linear-gradient(
              135deg,
              #111,
              #171717 55%,
              #0d0d0d
            );

          border:
            1px solid #3b3b3b;

          border-radius: 21px;

          box-shadow:
            0 12px 35px
            rgba(0,0,0,.45);

          overflow: hidden;
        }


        /* GOLD LINE */

        .plan::before {
          content: "";

          position: absolute;

          top: 0;
          bottom: 0;
          left: 37.8%;

          width: 1px;

          background:
            linear-gradient(
              transparent,
              #484848,
              transparent
            );
        }


        /* POPULAR */

        .plan.popular {
          border:
            4px solid #f2c94c;

          box-shadow:
            0 0 22px
            rgba(242,201,76,.12);
        }


        .popularBadge {
          position: absolute;

          top: -1px;
          left: 28px;

          padding:
            9px 20px;

          min-width: 190px;

          text-align: center;

          background: #f2c94c;

          color: #080808;

          border-radius:
            0 0 13px 13px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 17px;

          font-weight: bold;

          direction: ltr;

          z-index: 5;
        }


        /* PLAN MAIN */

        .planMain {
          grid-column: 1;

          grid-row: 1;

          display: flex;

          flex-direction: column;

          align-items: flex-start;

          justify-content: center;

          padding:
            5px 28px 25px 5px;
        }


        .vipName {
          color: #f2c94c;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 45px;

          font-weight: bold;

          direction: ltr;

          margin-bottom: 10px;
        }


        .price {
          color: #fff;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 68px;

          font-weight: bold;

          line-height: 1;

          direction: ltr;
        }


        /* DETAILS */

        .details {
          grid-column: 2;

          grid-row: 1;

          padding:
            2px 4px 15px 28px;
        }


        .detailRow {
          min-height: 54px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          border-bottom:
            1px solid #292929;

          gap: 15px;
        }


        .detailRow:last-child {
          border-bottom: none;
        }


        .label {
          color: #d0d0d0;

          font-size: 19px;

          white-space: nowrap;

          text-align: right;
        }


        .value {
          color: #f2c94c;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 22px;

          font-weight: bold;

          direction: ltr;

          white-space: nowrap;
        }


        .period {
          direction: rtl;
        }


        .totalRow {
          border-top:
            1px solid #555;

          margin-top: 3px;
        }


        /* BUTTON */

        .investButton {
          grid-column: 1 / 3;

          grid-row: 2;

          width: 100%;

          height: 62px;

          margin-top: 12px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 12px;

          background:
            linear-gradient(
              180deg,
              #f5cf50,
              #dcae29
            );

          color: #080808;

          text-decoration: none;

          font-size: 23px;

          font-weight: bold;

          transition:
            .2s ease;
        }


        .investButton:active {
          transform: scale(.985);
        }


        /* OVERLAY */

        .overlay {
          position: fixed;

          inset: 0;

          background:
            rgba(0,0,0,.72);

          backdrop-filter:
            blur(2px);

          z-index: 1999;
        }


        /* SIDEBAR */

        .sidebar {
          position: fixed;

          top: 0;
          right: 0;

          width: 350px;

          max-width: 88vw;

          height: 100vh;

          background:
            linear-gradient(
              180deg,
              #101010,
              #080808
            );

          border-left:
            1px solid #3a3a3a;

          z-index: 2000;

          transform:
            translateX(105%);

          transition:
            transform .3s ease;

          overflow-y: auto;

          padding: 28px 22px;
        }


        .sidebar.open {
          transform:
            translateX(0);
        }


        .sidebarHeader {
          display: flex;

          align-items: center;

          justify-content: space-between;

          padding-bottom: 25px;

          margin-bottom: 12px;

          border-bottom:
            1px solid #303030;
        }


        .sideLogo {
          color: #f2c94c;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 29px;

          font-weight: bold;

          direction: ltr;
        }


        .closeButton {
          width: 44px;
          height: 44px;

          border-radius: 9px;

          border: 1px solid #444;

          background: #151515;

          color: #f2c94c;

          font-size: 30px;

          cursor: pointer;
        }


        .sideLink,
        .walletButton {
          width: 100%;

          min-height: 64px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          padding: 0 12px;

          border: none;

          border-bottom:
            1px solid #303030;

          background: transparent;

          color: #eee;

          text-decoration: none;

          font-size: 19px;

          text-align: right;

          cursor: pointer;
        }


        .sideLink.active {
          color: #f2c94c;

          background:
            rgba(242,201,76,.12);

          border-right:
            4px solid #f2c94c;

          border-radius:
            5px 0 0 5px;
        }


        .walletButton.selected {
          color: #f2c94c;
        }


        .arrow {
          font-size: 25px;
        }


        .walletMenu {
          background: #111;

          border-bottom:
            1px solid #303030;
        }


        .walletLink {
          display: block;

          padding:
            17px 25px;

          color: #aaa;

          text-decoration: none;

          font-size: 17px;

          border-bottom:
            1px solid #252525;
        }


        .walletLink:last-child {
          border-bottom: none;
        }


        /* TABLET */

        @media (max-width: 800px) {

          .content {
            padding:
              30px 20px 70px;
          }

          .plan {
            min-height: 300px;
          }

          .vipName {
            font-size: 39px;
          }

          .price {
            font-size: 60px;
          }

          .label {
            font-size: 18px;
          }

        }


        /* MOBILE */

        @media (max-width: 600px) {

          .header {
            height: 82px;
          }


          .logo {
            font-size: 31px;
          }


          .menuButton {
            left: 15px;

            top: 14px;

            width: 53px;
            height: 53px;
          }


          .menuButton span {
            width: 27px;
            height: 3px;
          }


          .content {
            padding:
              38px 20px 70px;
          }


          .plans {
            gap: 42px;
          }


          .plan {
            min-height: 0;

            padding:
              27px 28px 25px;

            display: grid;

            grid-template-columns:
              1fr 1.35fr;

            border-radius: 20px;
          }


          .plan::before {
            left: 38%;
          }


          .planMain {
            padding:
              8px 15px 24px 0;
          }


          .vipName {
            font-size: 37px;
          }


          .price {
            font-size: 57px;
          }


          .details {
            padding:
              5px 0 18px 18px;
          }


          .detailRow {
            min-height: 57px;
          }


          .label {
            font-size: 16px;
          }


          .value {
            font-size: 20px;
          }


          .investButton {
            height: 62px;

            margin-top: 10px;

            font-size: 22px;
          }


          .popularBadge {
            left: 26px;

            min-width: 170px;

            font-size: 15px;
          }


          .sidebar {
            width: 320px;

            max-width: 87vw;
          }

        }


        /* SMALL PHONE */

        @media (max-width: 390px) {

          .logo {
            font-size: 27px;
          }


          .content {
            padding:
              34px 15px 65px;
          }


          .plans {
            gap: 38px;
          }


          .plan {
            padding:
              25px 22px 22px;
          }


          .vipName {
            font-size: 32px;
          }


          .price {
            font-size: 51px;
          }


          .label {
            font-size: 14px;
          }


          .value {
            font-size: 18px;
          }


          .detailRow {
            min-height: 54px;
          }


          .investButton {
            height: 58px;

            font-size: 20px;
          }

        }

      `}</style>

    </main>
  );
                                           }
