"use client";

import { useState } from "react";

export default function WithdrawPage() {
  const [amount, setAmount] = useState("1");
  const [wallet, setWallet] = useState("");

  function cgCopyWallet() {
    if (!wallet.trim()) {
      alert("أدخل عنوان المحفظة أولاً");
      return;
    }

    navigator.clipboard
      .writeText(wallet.trim())
      .then(() => {
        alert("تم نسخ العنوان");
      })
      .catch(() => {
        alert("تعذر نسخ العنوان");
      });
  }

  function cgWithdraw() {
    if (!amount) {
      alert("أدخل المبلغ");
      return;
    }

    if (Number(amount) < 1) {
      alert("الحد الأدنى هو $1");
      return;
    }

    if (!wallet.trim()) {
      alert("أدخل عنوان المحفظة");
      return;
    }

    alert(
      "تم إرسال الطلب بقيمة $" +
        Number(amount).toFixed(2)
    );
  }

  return (
    <>
      <section className="cg-withdraw">
        <div className="cg-withdraw-card">

          {/* Amount */}
          <div className="cg-field">
            <div className="cg-input">
              <input
                type="number"
                id="cgAmount"
                value={amount}
                min="1"
                step="0.01"
                placeholder="1"
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="cg-currency">
                <span className="cg-usdt">₮</span>
                <span>USDT</span>
                <span className="cg-arrow">⌄</span>
              </div>
            </div>

            <div className="cg-min">
              الحد الأدنى $1
            </div>
          </div>

          {/* Wallet */}
          <div className="cg-field">
            <div className="cg-input">
              <input
                type="text"
                id="cgWallet"
                value={wallet}
                placeholder="عنوان المحفظة"
                autoComplete="off"
                onChange={(e) => setWallet(e.target.value)}
              />

              <button
                type="button"
                className="cg-copy"
                onClick={cgCopyWallet}
              >
                نسخ
              </button>
            </div>
          </div>

          {/* Network */}
          <div className="cg-network">
            <span>الشبكة</span>

            <strong>USDT - BEP20</strong>

            <span className="cg-arrow">⌄</span>
          </div>

          {/* Button */}
          <button
            type="button"
            className="cg-confirm"
            onClick={cgWithdraw}
          >
            تأكيد الآن
          </button>

        </div>
      </section>

      <style jsx>{`

        .cg-withdraw {
          width: 100%;
          padding: 25px 15px 45px;
          direction: rtl;
          box-sizing: border-box;
        }

        .cg-withdraw-card {
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
          padding: 28px;
          box-sizing: border-box;

          background:
            linear-gradient(
              145deg,
              #141414,
              #080808
            );

          border: 1px solid rgba(255,210,70,.55);
          border-radius: 24px;

          box-shadow:
            0 20px 60px rgba(0,0,0,.65),
            0 0 35px rgba(255,200,40,.07),
            inset 0 1px 0 rgba(255,255,255,.04);

          position: relative;
          overflow: hidden;
        }

        .cg-withdraw-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 2px;

          background:
            linear-gradient(
              90deg,
              transparent,
              #ffd84d,
              #fff0a0,
              #ffd84d,
              transparent
            );

          box-shadow:
            0 0 14px rgba(255,216,77,.8);
        }

        .cg-field {
          margin-bottom: 20px;
        }

        .cg-input {
          width: 100%;
          min-height: 68px;

          display: flex;
          align-items: center;

          box-sizing: border-box;
          padding: 6px 10px;

          background:
            linear-gradient(
              145deg,
              #111111,
              #070707
            );

          border: 1px solid rgba(255,210,70,.55);
          border-radius: 15px;
          transition: .25s;
        }

        .cg-input:focus-within {
          border-color: #ffd84d;

          box-shadow:
            0 0 0 2px rgba(255,216,77,.05),
            0 0 22px rgba(255,216,77,.08);
        }

        .cg-input input {
          width: 100%;
          height: 54px;

          padding: 0 10px;
          box-sizing: border-box;

          border: 0;
          outline: 0;

          background: transparent;
          color: #ffffff;

          font-size: 18px;
          font-weight: 600;
          text-align: right;
        }

        .cg-input input::placeholder {
          color: #707070;
        }

        .cg-input input::-webkit-outer-spin-button,
        .cg-input input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .cg-currency {
          height: 52px;

          display: flex;
          align-items: center;
          gap: 8px;

          padding: 0 12px;

          border-right: 1px solid rgba(255,255,255,.10);

          color: #ffffff;
          font-size: 15px;
          font-weight: 800;

          direction: ltr;
          white-space: nowrap;
        }

        .cg-usdt {
          width: 31px;
          height: 31px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;
          background: #16a085;

          color: #ffffff;
          font-size: 18px;
          font-weight: 900;

          box-shadow:
            0 0 12px rgba(22,160,133,.25);
        }

        .cg-arrow {
          color: #ffd84d;
          font-size: 21px;
          line-height: 1;
        }

        .cg-min {
          margin-top: 7px;
          color: #777777;
          font-size: 12px;
          text-align: right;
        }

        .cg-copy {
          height: 45px;

          padding: 0 15px;

          border: 1px solid rgba(255,210,70,.35);
          border-radius: 10px;

          background: #101010;
          color: #ffd84d;

          font-size: 13px;
          font-weight: 800;

          cursor: pointer;
          transition: .2s;
        }

        .cg-copy:hover {
          border-color: #ffd84d;
          background: #18140a;
        }

        .cg-network {
          min-height: 66px;

          margin-bottom: 22px;
          padding: 0 18px;

          box-sizing: border-box;

          display: flex;
          align-items: center;
          gap: 15px;

          background:
            linear-gradient(
              145deg,
              #111111,
              #080808
            );

          border: 1px solid rgba(255,255,255,.18);
          border-radius: 15px;

          color: #9a9a9a;
          font-size: 15px;
        }

        .cg-network strong {
          margin-right: auto;
          color: #ffd84d;
          font-size: 15px;
          direction: ltr;
        }

        .cg-confirm {
          width: 100%;
          height: 68px;

          border: 1px solid #ffe78b;
          border-radius: 16px;

          background:
            linear-gradient(
              135deg,
              #a7770c 0%,
              #dcae25 25%,
              #ffe16b 50%,
              #d9a51d 75%,
              #9b6d0b 100%
            );

          color: #090909;

          font-size: 19px;
          font-weight: 900;

          cursor: pointer;

          box-shadow:
            0 10px 30px rgba(255,190,30,.18),
            inset 0 1px 0 rgba(255,255,255,.65);

          transition: .25s;
        }

        .cg-confirm:hover {
          transform: translateY(-2px);

          box-shadow:
            0 14px 38px rgba(255,190,30,.30);
        }

        .cg-confirm:active {
          transform: scale(.985);
        }

        @media (max-width: 600px) {

          .cg-withdraw {
            padding: 15px 8px 30px;
          }

          .cg-withdraw-card {
            padding: 18px;
            border-radius: 20px;
          }

          .cg-input {
            min-height: 62px;
            padding: 5px 8px;
          }

          .cg-input input {
            height: 48px;
            font-size: 15px;
          }

          .cg-currency {
            padding: 0 7px;
            gap: 5px;
            font-size: 13px;
          }

          .cg-usdt {
            width: 28px;
            height: 28px;
            font-size: 16px;
          }

          .cg-copy {
            height: 40px;
            padding: 0 11px;
            font-size: 12px;
          }

          .cg-network {
            min-height: 59px;
            padding: 0 13px;
            font-size: 13px;
            gap: 8px;
          }

          .cg-network strong {
            font-size: 12px;
          }

          .cg-confirm {
            height: 61px;
            font-size: 17px;
          }
        }

      `}</style>
    </>
  );
}
