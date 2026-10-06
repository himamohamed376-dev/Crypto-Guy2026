'use client';

import { useState, useEffect } from 'react';

export default function DepositPage() {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const walletAddress =
    '0xc25f40ac368e83f96027dd1d4c719e81c0009bd8';

  useEffect(() => {
    try {
      const savedUser = JSON.parse(
        localStorage.getItem('user') || 'null'
      );

      if (!savedUser) {
        window.location.href = '/auth';
        return;
      }

      setUser(savedUser);
    } catch {
      window.location.href = '/auth';
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
      setMsg('تعذر نسخ العنوان، حاول مرة أخرى');
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();

    const depositAmount = Number(amount);

    if (!depositAmount || depositAmount < 10) {
      setMsg('⚠️ الحد الأدنى للإيداع هو 10 USDT');
      return;
    }

    if (!user) {
      setMsg('يرجى تسجيل الدخول أولاً');
      return;
    }

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
          '✅ تم إرسال طلب الإيداع بنجاح. سيتم التحقق من العملية وإضافة الرصيد.'
        );

        setAmount('');
      } else {
        setMsg(
          data.error || 'حدث خطأ أثناء إرسال طلب الإيداع'
        );
      }
    } catch {
      setMsg(
        '❌ تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="deposit-page" dir="rtl">

      {/* Header */}
      <header className="deposit-header">

        <div className="brand">

          <div className="brand-icon">
            ◆
          </div>

          <div>
            <div className="brand-name">
              CRYPTO GUYS
            </div>

            <div className="brand-sub">
              SECURE • FAST • SIMPLE
            </div>
          </div>

        </div>

        <div className="header-title">
          إيداع
        </div>

      </header>


      <main className="deposit-container">

        {/* Page title */}
        <section className="page-title">

          <div className="title-icon">
            ₮
          </div>

          <h1>
            إعادة شحن
          </h1>

          <p>
            أودع USDT بأمان إلى حسابك
          </p>

        </section>


        {/* Main card */}
        <section className="deposit-card">

          {/* Network */}
          <div className="info-grid">

            <div className="info-box">

              <span className="info-label">
                الشبكة
              </span>

              <div className="info-value">
                <span className="network-dot"></span>
                BEP20 (BSC)
              </div>

            </div>


            <div className="info-box">

              <span className="info-label">
                العملة
              </span>

              <div className="info-value">

                <span className="usdt-icon">
                  ₮
                </span>

                USDT

              </div>

            </div>

          </div>


          {/* Wallet address */}
          <div className="section-box">

            <div className="section-heading">

              <span>
                عنوان محفظة الإيداع
              </span>

              <span className="secure-label">
                آمن
              </span>

            </div>


            <div className="address-box">

              <div className="address-text">
                {walletAddress}
              </div>

              <button
                type="button"
                className="copy-button"
                onClick={copyWallet}
              >
                {copied ? '✓ تم النسخ' : 'نسخ'}
              </button>

            </div>


            <div className="address-note">
              اضغط على زر النسخ لاستخدام العنوان بسهولة
            </div>

          </div>


          {/* Important warning */}
          <div className="warning-box">

            <div className="warning-icon">
              !
            </div>

            <div>

              <div className="warning-title">
                تأكد قبل التحويل
              </div>

              <div className="warning-text">
                استخدم شبكة BEP20 (BSC) فقط عند إرسال USDT.
                إرسال الأموال عبر شبكة أخرى قد يؤدي إلى فقدانها.
              </div>

            </div>

          </div>


          {/* Deposit form */}
          <form onSubmit={handleDeposit}>

            <div className="section-box amount-box">

              <div className="section-heading">
                <span>
                  مبلغ الإيداع
                </span>

                <span className="optional">
                  الحد الأدنى 10 USDT
                </span>
              </div>


              <div className="amount-input-wrapper">

                <input
                  type="number"
                  min="10"
                  step="0.01"
                  inputMode="decimal"
                  placeholder="أدخل المبلغ المراد إيداعه"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />

                <div className="currency-badge">

                  <span className="currency-icon">
                    ₮
                  </span>

                  USDT

                </div>

              </div>


              <div className="minimum-text">
                الحد الأدنى للإيداع:
                <strong> 10 USDT</strong>
              </div>

            </div>


            {/* Submit */}
            <button
              type="submit"
              className="deposit-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="spinner"></span>
                  جاري إرسال الطلب...
                </>
              ) : (
                <>
                  تأكيد الإيداع
                  <span className="button-arrow">
                    ←
                  </span>
                </>
              )}

            </button>

          </form>


          {/* Message */}
          {msg && (
            <div
              className={
                msg.startsWith('✅')
                  ? 'message success'
                  : 'message'
              }
            >
              {msg}
            </div>
          )}


          {/* Warm reminder */}
          <div className="reminder">

            <div className="reminder-header">

              <div className="reminder-icon">
                ♥
              </div>

              <div>

                <div className="reminder-title">
                  تذكير مهم
                </div>

                <div className="reminder-subtitle">
                  نحن نهتم بأمان أموالك
                </div>

              </div>

            </div>


            <div className="reminder-list">

              <div className="reminder-item">
                <span>✓</span>
                تأكد من أن الشبكة المختارة هي
                <strong> BEP20 (BSC)</strong>.
              </div>

              <div className="reminder-item">
                <span>✓</span>
                أرسل <strong>USDT</strong> فقط إلى عنوان الإيداع.
              </div>

              <div className="reminder-item">
                <span>✓</span>
                راجع عنوان المحفظة جيداً قبل تأكيد التحويل.
              </div>

              <div className="reminder-item">
                <span>✓</span>
                بعد التحويل، أدخل المبلغ الذي قمت بإرساله.
              </div>

            </div>

          </div>


          {/* Security */}
          <div className="security">

            <span className="lock">
              🔒
            </span>

            جميع عمليات الإيداع تتم بطريقة آمنة
            ويتم التحقق منها قبل إضافة الرصيد.

          </div>

        </section>


        {/* Back */}
        <a
          href="/dashboard"
          className="back-button"
        >
          ← العودة إلى لوحة التحكم
        </a>

      </main>


      <style jsx>{`

        * {
          box-sizing: border-box;
        }


        .deposit-page {
          min-height: 100vh;

          background:
            radial-gradient(
              circle at 50% -10%,
              rgba(240, 185, 11, 0.12),
              transparent 35%
            ),
            #050505;

          color: #ffffff;

          padding-bottom: 50px;

          font-family:
            Arial,
            Tahoma,
            sans-serif;
        }


        /* HEADER */

        .deposit-header {
          height: 70px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          padding: 0 18px;

          background: rgba(8, 8, 8, .96);

          border-bottom:
            1px solid rgba(240, 185, 11, .22);
        }


        .brand {
          display: flex;

          align-items: center;

          gap: 10px;
        }


        .brand-icon {
          width: 42px;
          height: 42px;

          display: flex;

          align-items: center;

          justify-content: center;

          border:
            1px solid #d7a928;

          border-radius: 12px;

          color: #f0b90b;

          font-size: 19px;

          box-shadow:
            0 0 20px rgba(240, 185, 11, .08);
        }


        .brand-name {
          color: #f0b90b;

          font-size: 16px;

          font-weight: 900;

          letter-spacing: .5px;
        }


        .brand-sub {
          color: #777;

          font-size: 7px;

          letter-spacing: 2px;

          margin-top: 2px;
        }


        .header-title {
          color: #aaa;

          font-size: 13px;
        }


        /* CONTAINER */

        .deposit-container {
          width: 100%;

          max-width: 560px;

          margin: auto;

          padding: 25px 14px;
        }


        /* TITLE */

        .page-title {
          text-align: center;

          margin-bottom: 24px;
        }


        .title-icon {
          width: 58px;
          height: 58px;

          margin: auto;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 18px;

          color: #f0b90b;

          font-size: 27px;

          border:
            1px solid rgba(240, 185, 11, .7);

          background:
            rgba(240, 185, 11, .05);

          box-shadow:
            0 0 30px rgba(240, 185, 11, .08);
        }


        .page-title h1 {
          margin: 12px 0 6px;

          color: #f0b90b;

          font-size: 36px;

          font-weight: 900;
        }


        .page-title p {
          margin: 0;

          color: #858585;

          font-size: 13px;
        }


        /* CARD */

        .deposit-card {
          padding: 15px;

          border-radius: 24px;

          background:
            linear-gradient(
              145deg,
              #151515,
              #090909
            );

          border:
            1px solid rgba(240, 185, 11, .38);

          box-shadow:
            0 25px 70px rgba(0,0,0,.55);
        }


        /* INFO GRID */

        .info-grid {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 10px;

          margin-bottom: 12px;
        }


        .info-box {
          padding: 14px;

          border-radius: 15px;

          background: #0b0b0b;

          border:
            1px solid #29230f;
        }


        .info-label {
          display: block;

          color: #707070;

          font-size: 11px;

          margin-bottom: 7px;
        }


        .info-value {
          display: flex;

          align-items: center;

          gap: 7px;

          color: #eee;

          font-size: 14px;

          font-weight: 800;
        }


        .network-dot {
          width: 8px;
          height: 8px;

          border-radius: 50%;

          background: #f0b90b;

          box-shadow:
            0 0 8px rgba(240,185,11,.5);
        }


        .usdt-icon {
          width: 25px;
          height: 25px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          background: #18a878;

          color: #fff;

          font-size: 13px;

          font-weight: 900;
        }


        /* SECTION */

        .section-box {
          padding: 16px;

          border-radius: 17px;

          background: #0a0a0a;

          border:
            1px solid rgba(240, 185, 11, .28);

          margin-top: 12px;
        }


        .section-heading {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 10px;

          margin-bottom: 10px;

          color: #d5d5d5;

          font-size: 13px;

          font-weight: 800;
        }


        .secure-label {
          color: #c49b28;

          font-size: 10px;

          font-weight: normal;
        }


        .optional {
          color: #777;

          font-size: 10px;

          font-weight: normal;
        }


        /* ADDRESS */

        .address-box {
          display: flex;

          align-items: stretch;

          gap: 8px;
        }


        .address-text {
          flex: 1;

          min-width: 0;

          display: flex;

          align-items: center;

          padding: 13px 10px;

          background: #050505;

          border:
            1px solid #443611;

          border-radius: 12px;

          color: #ddd;

          direction: ltr;

          text-align: left;

          font-size: 10px;

          line-height: 1.4;

          overflow: hidden;

          white-space: nowrap;

          text-overflow: ellipsis;
        }


        .copy-button {
          flex-shrink: 0;

          min-width: 65px;

          border: none;

          border-radius: 12px;

          background:
            linear-gradient(
              135deg,
              #f5ce50,
              #bc8918
            );

          color: #090909;

          font-size: 12px;

          font-weight: 900;

          cursor: pointer;
        }


        .address-note {
          color: #666;

          font-size: 10px;

          margin-top: 8px;
        }


        /* WARNING */

        .warning-box {
          display: flex;

          gap: 11px;

          margin-top: 12px;

          padding: 14px;

          border-radius: 15px;

          background:
            rgba(240, 185, 11, .055);

          border:
            1px solid rgba(240, 185, 11, .20);
        }


        .warning-icon {
          flex-shrink: 0;

          width: 29px;
          height: 29px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          border:
            1px solid #c99c25;

          color: #f0b90b;

          font-weight: 900;
        }


        .warning-title {
          color: #e3b938;

          font-size: 12px;

          font-weight: 900;

          margin-bottom: 4px;
        }


        .warning-text {
          color: #888;

          font-size: 10px;

          line-height: 1.8;
        }


        /* AMOUNT */

        .amount-box {
          margin-top: 12px;
        }


        .amount-input-wrapper {
          position: relative;
        }


        .amount-input-wrapper input {
          width: 100%;

          height: 58px;

          padding:
            0 88px 0 14px;

          border-radius: 13px;

          border:
            1px solid #443611;

          background: #050505;

          color: #fff;

          outline: none;

          font-size: 14px;

          direction: rtl;
        }


        .amount-input-wrapper input::placeholder {
          color: #555;
        }


        .amount-input-wrapper input:focus {
          border-color: #d6a72b;

          box-shadow:
            0 0 18px rgba(240,185,11,.08);
        }


        .currency-badge {
          position: absolute;

          right: 7px;

          top: 7px;

          height: 44px;

          padding: 0 10px;

          display: flex;

          align-items: center;

          gap: 5px;

          border-radius: 10px;

          background: #171207;

          border:
            1px solid #4d3b13;

          color: #e7ba3d;

          font-size: 12px;

          font-weight: 900;
        }


        .currency-icon {
          width: 23px;
          height: 23px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          background: #18a878;

          color: white;
        }


        .minimum-text {
          margin-top: 8px;

          color: #666;

          font-size: 10px;
        }


        .minimum-text strong {
          color: #cda633;
        }


        /* BUTTON */

        .deposit-button {
          width: 100%;

          height: 59px;

          margin-top: 14px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          border: none;

          border-radius: 16px;

          background:
            linear-gradient(
              135deg,
              #f6d15a,
              #bf8e1d
            );

          color: #080808;

          font-size: 16px;

          font-weight: 900;

          cursor: pointer;

          box-shadow:
            0 10px 30px rgba(240,185,11,.12);

          transition: .2s;
        }


        .deposit-button:hover {
          transform: translateY(-2px);

          box-shadow:
            0 14px 35px rgba(240,185,11,.2);
        }


        .deposit-button:disabled {
          opacity: .6;

          cursor: not-allowed;

          transform: none;
        }


        .button-arrow {
          font-size: 20px;
        }


        .spinner {
          width: 17px;
          height: 17px;

          border:
            2px solid rgba(0,0,0,.3);

          border-top-color: #080808;

          border-radius: 50%;

          animation: spin .7s linear infinite;
        }


        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }


        /* MESSAGE */

        .message {
          margin-top: 12px;

          padding: 12px;

          border-radius: 12px;

          text-align: center;

          color: #f0c64c;

          background:
            rgba(240,185,11,.06);

          border:
            1px solid rgba(240,185,11,.20);

          font-size: 11px;

          line-height: 1.7;
        }


        .message.success {
          color: #58d39b;

          border-color:
            rgba(88,211,155,.2);

          background:
            rgba(88,211,155,.05);
        }


        /* REMINDER */

        .reminder {
          margin-top: 14px;

          padding: 16px;

          border-radius: 17px;

          background:
            linear-gradient(
              135deg,
              rgba(240,185,11,.08),
              rgba(10,10,10,.9)
            );

          border:
            1px solid rgba(240,185,11,.28);
        }


        .reminder-header {
          display: flex;

          align-items: center;

          gap: 10px;

          margin-bo
