'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function DepositPage() {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const walletAddress =
    '0xc25f40ac368e83f96027dd1d4c719e81c0009bd8';

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user') || 'null');

    if (!u) {
      window.location.href = '/auth';
    } else {
      setUser(u);
    }
  }, []);

  const copyWallet = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setMsg('تعذر نسخ العنوان');
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();

    const depositAmount = parseFloat(amount);

    if (!depositAmount || depositAmount < 10) {
      setMsg('⚠️ الحد الأدنى للإيداع هو 10 USDT');
      return;
    }

    if (!user) return;

    try {
      setLoading(true);
      setMsg('جاري إرسال طلب الإيداع...');

      const res = await fetch('/api/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          amount: depositAmount,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMsg(
          '✅ تم إرسال طلب الإيداع - سيتم إضافة الرصيد بعد التحقق'
        );

        setAmount('');
      } else {
        setMsg(data.error || 'حدث خطأ أثناء إرسال الطلب');
      }

    } catch {
      setMsg('❌ تعذر الاتصال بالخادم');

    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="cg-page">

      {/* HEADER */}
      <header className="cg-header">

        <div className="cg-brand">

          <div className="cg-logo">
            ◆
          </div>

          <div>
            <div className="cg-brand-name">
              CRYPTO GUYS
            </div>

            <div className="cg-brand-sub">
              SAFE • FAST • RELIABLE
            </div>
          </div>

        </div>

        <div className="cg-menu">
          ☰
        </div>

      </header>


      <main className="cg-container">

        {/* TITLE */}
        <div className="cg-title">

          <div className="cg-wallet-icon">
            ₮
          </div>

          <h1>إعادة شحن</h1>

          <p>
            قم بإيداع عملاتك الرقمية لبدء التداول والاستثمار
          </p>

        </div>


        {/* MAIN CARD */}
        <div className="cg-card">

          {/* NETWORK + COIN */}
          <div className="cg-options">

            <div className="cg-option">

              <span>
                الشبكة
              </span>

              <strong>
                BEP20 (BSC)
              </strong>

            </div>


            <div className="cg-option">

              <span>
                العملة
              </span>

              <strong>
                USDT
              </strong>

            </div>

          </div>


          {/* WALLET ADDRESS */}
          <div className="cg-address-card">

            <div className="cg-label">
              عنوان المحفظة
            </div>

            <div className="cg-address-row">

              <div className="cg-address">
                {walletAddress}
              </div>

              <button
                type="button"
                onClick={copyWallet}
                className="cg-copy"
              >
                {copied ? '✓' : 'نسخ'}
              </button>

            </div>


            {/* QR CODE */}
            <div className="cg-qr">

              <QRCodeSVG
                value={walletAddress}
                size={175}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
              />

              <p>
                امسح رمز QR لإرسال USDT
                <br />
                إلى عنوان المحفظة
              </p>

            </div>

          </div>


          {/* AMOUNT */}
          <form onSubmit={handleDeposit}>

            <div className="cg-amount">

              <div className="cg-label">
                المبلغ <small>(اختياري)</small>
              </div>

              <div className="cg-input-box">

                <input
                  type="number"
                  min="10"
                  step="0.01"
                  placeholder="أدخل المبلغ المراد إيداعه"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />

                <div className="cg-usdt">
                  ₮ USDT
                </div>

              </div>

              <div className="cg-min">
                الحد الأدنى: <b>10 USDT</b>
              </div>

            </div>


            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="cg-confirm"
            >
              {loading
                ? 'جاري الإرسال...'
                : 'تأكيد الإيداع →'
              }
            </button>

          </form>


          {/* MESSAGE */}
          {msg && (
            <div className="cg-message">
              {msg}
            </div>
          )}


          {/* REMINDER */}
          <div className="cg-reminder">

            <div className="cg-reminder-title">
              <span>!</span>
              تذكير مهم
            </div>

            <ul>

              <li>
                تأكد من اختيار شبكة
                <b> BEP20 (BSC) </b>
                عند الإيداع.
              </li>

              <li>
                أرسل <b>USDT</b> فقط إلى هذا العنوان.
              </li>

              <li>
                تأكد من صحة عنوان المحفظة قبل الإرسال.
              </li>

              <li>
                إرسال عملة أو شبكة خاطئة قد يؤدي إلى فقدان أموالك.
              </li>

            </ul>

          </div>

        </div>


        <div className="cg-security">
          🔒 أمان أموالك هو أولويتنا
        </div>


        <a
          href="/dashboard"
          className="cg-back"
        >
          الرجوع للوحة التحكم
        </a>

      </main>


      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        .cg-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 80% 10%,
              rgba(212,164,45,.12),
              transparent 30%
            ),
            #050505;

          color: white;
          padding-bottom: 40px;
        }


        /* HEADER */

        .cg-header {
          height: 70px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 18px;

          border-bottom:
            1px solid rgba(212,164,45,.25);
        }


        .cg-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }


        .cg-logo {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          border:
            2px solid #d9aa32;

          border-radius: 12px;

          color: #f4c84d;

          font-size: 20px;
        }


        .cg-brand-name {
          color: #f3c84d;

          font-size: 17px;

          font-weight: 900;
        }


        .cg-brand-sub {
          color: #777;

          font-size: 8px;

          letter-spacing: 2px;
        }


        .cg-menu {
          color: #dcb548;

          font-size: 23px;
        }


        /* CONTAINER */

        .cg-container {
          max-width: 620px;

          margin: auto;

          padding: 25px 15px;
        }


        /* TITLE */

        .cg-title {
          text-align: center;

          margin-bottom: 25px;
        }


        .cg-wallet-icon {
          width: 58px;
          height: 58px;

          margin: auto;

          display: flex;
          align-items: center;
          justify-content: center;

          border:
            1px solid #d9aa32;

          border-radius: 18px;

          color: #f5ca4d;

          font-size: 27px;

          box-shadow:
            0 0 30px rgba(212,164,45,.12);
        }


        .cg-title h1 {
          margin: 12px 0 7px;

          color: #f4c84d;

          font-size: 40px;

          font-weight: 900;
        }


        .cg-title p {
          color: #999;

          font-size: 13px;

          margin: 0;
        }


        /* CARD */

        .cg-card {
          background:
            linear-gradient(
              145deg,
              #181818,
              #090909
            );

          border:
            1px solid rgba(212,164,45,.55);

          border-radius: 24px;

          padding: 17px;

          box-shadow:
            0 20px 55px rgba(0,0,0,.55);
        }


        /* OPTIONS */

        .cg-options {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 10px;

          margin-bottom: 15px;
        }


        .cg-option {
          position: relative;

          padding: 15px;

          background: #0b0b0b;

          border:
            1px solid rgba(212,164,45,.35);

          border-radius: 16px;
        }


        .cg-option span {
          display: block;

          color: #777;

          font-size: 12px;

          margin-bottom: 7px;
        }


        .cg-option strong {
          color: #eee;

          font-size: 14px;
        }


        /* ADDRESS */

        .cg-address-card {
          padding: 17px;

          background: #090909;

          border:
            1px solid rgba(212,164,45,.4);

          border-radius: 18px;
        }


        .cg-label {
          color: #ccc;

          font-size: 14px;

          font-weight: 800;

          margin-bottom: 10px;
        }


        .cg-label small {
          color: #777;

          font-weight: normal;
        }


        .cg-address-row {
          display: flex;

          gap: 8px;
        }


        .cg-address {
          flex: 1;

          min-width: 0;

          padding: 14px 10px;

          background: #050505;

          border:
            1px solid #594616;

          border-radius: 13px;

          color: #eee;

          font-size: 10px;

          direction: ltr;

          text-align: left;

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;
        }


        .cg-copy {
          border: none;

          border-radius: 13px;

          padding: 0 15px;

          background:
            linear-gradient(
              135deg,
              #f7d15b,
              #c69320
            );

          color: #080808;

          font-weight: 900;

          cursor: pointer;
        }


        /* QR */

        .cg-qr {
          text-align: center;

          margin-top: 20px;
        }


        .cg-qr svg {
          padding: 9px;

          background: white;

          border-radius: 15px;
        }


        .cg-qr p {
          color: #888;

          font-size: 12px;

          line-height: 1.8;

          margin: 10px 0 0;
        }


        /* AMOUNT */

        .cg-amount {
          margin-top: 15px;

          padding: 17px;

          background: #090909;

          border:
            1px solid rgba(212,164,45,.4);

          border-radius: 18px;
        }


        .cg-input-box {
          position: relative;
        }


        .cg-input-box input {
          width: 100%;

          height: 58px;

          padding:
            0 90px 0 14px;

          background: #050505;

          border:
            1px solid #594616;

          border-radius: 14px;

          outline: none;

          color: white;

          font-size: 14px;

          direction: rtl;
        }


        .cg-input-box input:focus {
          border-color: #d9aa32;

          box-shadow:
            0 0 15px rgba(212,164,45,.1);
        }


        .cg-usdt {
          position: absolute;

          right: 7px;
          top: 7px;

          height: 44px;

          display: flex;
          align-items: center;

          padding: 0 12px;

          gap: 5px;

          border-radius: 11px;

          background: #171207;

          border:
            1px solid #604a17;

          color: #f3c84d;

          font-weight: 900;
        }


        .cg-min {
          margin-top: 8px;

          color: #888;

          font-size: 11px;
        }


        .cg-min b {
          color: #dcb548;
        }


        /* BUTTON */

        .cg-confirm {
          width: 100%;

          height: 60px;

          margin-top: 18px;

          border: none;

          border-radius: 17px;

          background:
            linear-gradient(
              135deg,
              #f5d05b,
              #bd8b1b
            );

          color: #080808;

          font-size: 17px;

          font-weight: 900;

          cursor: pointer;

          transition: .2s;
        }


        .cg-confirm:hover {
          transform: translateY(-2px);

          box-shadow:
            0 10px 30px rgba(212,164,45,.25);
        }


        .cg-confirm:disabled {
          opacity: .6;

          cursor: not-allowed;
        }


        /* MESSAGE */

        .cg-message {
          margin-top: 15px;

          padding: 13px;

          text-align: center;

          border-radius: 12px;

          color: #f1c84b;

          background:
            rgba(212,164,45,.07);

          border:
            1px solid rgba(212,164,45,.25);

          font-size: 13px;
        }


        /* REMINDER */

        .cg-reminder {
          margin-top: 18px;

          padding: 17px;

          border-radius: 18px;

          background:
            linear-gradient(
              135deg,
              rgba(212,164,45,.09),
              rgba(10,10,10,.8)
            );

          border:
            1px solid rgba(212,164,45,.4);
        }


        .cg-reminder-title {
          display: flex;

          align-items: center;

          gap: 9px;

          color: #f2c84b;

          font-size: 16px;

          margin-bottom: 10px;
        }


        .cg-reminder-title span {
          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          border:
            1px solid #d9aa32;

          border-radius: 50%;

          font-weight: 900;
        }


        .cg-reminder ul {
          margin: 0;

          padding-right: 20px;

          color: #999;

          font-size: 12px;

          line-height: 2;
        }


        .cg-reminder li::marker {
          color: #d9aa32;
        }


        .cg-reminder b {
          color: #ddd;
        }


        /* FOOTER */

        .cg-security {
          text-align: center;

          margin-top: 22px;

          color: #999;

          font-size: 13px;
        }


        .cg-back {
          display: block;

          text-align: center;

          margin-top: 17px;

          color: #777;

          text-decoration: none;

          font-size: 13px;
        }


        .cg-back:hover {
          color: #dcb548;
        }


        /* MOBILE */

        @media (max-width: 480px) {

          .cg-container {
            padding: 18px 12px 35px;
          }

          .cg-title h1 {
            font-size: 34px;
          }

          .cg-title p {
            font-size: 12px;
          }

          .cg-card {
            padding: 13px;
          }

          .cg-option {
            padding: 13px 10px;
          }

          .cg-option strong {
            font-size: 12px;
          }

          .cg-address {
            font-size: 9px;
          }

          .cg-copy {
            padding: 0 12px;
          }

        }

      `}</style>

    </div>
  );
    }
