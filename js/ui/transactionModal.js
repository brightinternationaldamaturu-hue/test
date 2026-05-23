// ===============================
// SHOW TRANSACTION DETAILS
// ===============================

export function showTransactionDetails(tx){

  // REMOVE OLD
  const old =
  document.getElementById(
    "txModalOverlay"
  );

  if(old){

    old.remove();

  }

  // ===============================
  // STATUS UI
  // ===============================

// STATUS ICON
const status = (
  tx.status || ""
).toLowerCase();

let icon = "⏳";
let statusClass = "pending";

if(

  status === "success" ||
  status === "successful" ||
  status === "completed"

){

  icon = "✔️";
  statusClass = "success";

}

else if(

  status === "failed" ||
  status === "error"

){

  icon = "❌";
  statusClass = "failed";

}

  // ===============================
  // TRANSACTION TYPE
  // ===============================

  const txType = (

    tx.type ||

    tx.category ||

    ""

  ).toLowerCase();

  // ===============================
  // SERVICE TITLE
  // ===============================

  let serviceTitle =

    tx.plan ||

    tx.title ||

    "Transaction";

  if(txType === "cashback"){

    serviceTitle =
    "Cashback Reward";

  }

  if(txType === "cashback_withdrawal"){

    serviceTitle =
    "Cashback Withdrawal";

  }

  // ===============================
  // DATE
  // ===============================

  const txDate =

    tx.createdAt?.toDate
    ? tx.createdAt.toDate().toLocaleString()
    : "Now";

  // ===============================
  // AMOUNT SIGN
  // ===============================

  const isCredit =

    txType === "cashback" ||

    txType === "cashback_withdrawal" ||

    tx.type === "credit";

  const amountPrefix =
  isCredit ? "+" : "-";

  // ===============================
  // MODAL
  // ===============================

  const overlay =
  document.createElement("div");

  overlay.id =
  "txModalOverlay";

  overlay.className =
  "modal-overlay";

  overlay.innerHTML = `

    <div class="tx-modal-box">

      <!-- HEADER -->
      <div class="tx-modal-header">

        <div class="tx-status-icon ${statusClass}">

          ${icon}

        </div>

        <h2>

${
  status === "success" ||
  status === "successful" ||
  status === "completed"

  ? "Transaction Successful"

  : status === "failed" ||
    status === "error"

  ? "Transaction Failed"

  : "Transaction Pending"
}

        </h2>

      </div>

      <!-- AMOUNT -->
      <div class="tx-modal-amount">

        ${amountPrefix}

        ₦${Number(

          tx.amount || 0

        ).toLocaleString("en-NG")}

      </div>

      <!-- DETAILS -->
      <div class="tx-modal-details">

        <div>

          <span>Service</span>

          <strong>

            ${serviceTitle}

          </strong>

        </div>

        <div>

          <span>Network</span>

          <strong>

            ${tx.network || "N/A"}

          </strong>

        </div>

        <div>

          <span>Phone</span>

          <strong>

            ${tx.phone || "N/A"}

          </strong>

        </div>


        

        ${
  tx.voucher
  ? `

  <div>

    <span>Voucher Code</span>

    <strong style="
      color:#00D492;
      font-size:18px;
      letter-spacing:2px;
      font-weight:900;
    ">

      ${tx.voucher}

    </strong>

  </div>

  `
  : ""
}


        <div>

          <span>Status</span>

          <strong style="text-transform:capitalize;">

            ${tx.status || "pending"}

          </strong>

        </div>

        <div>

          <span>Provider</span>

          <strong>

            ${tx.provider || "BIVA"}

          </strong>

        </div>

        <div>

          <span>Reference</span>

          <strong>

            ${tx.request_id || tx.reference || "N/A"}

          </strong>

        </div>

        <div>

          <span>Date</span>

          <strong>

            ${txDate}

          </strong>

        </div>

        ${
          tx.failureReason
          ? `

          <div>

            <span>Reason</span>

            <strong>

              ${tx.failureReason}

            </strong>

          </div>

          `
          : ""
        }

      </div>

      <!-- BUTTON -->
      <button id="closeTxModal">

        Close

      </button>

    </div>

  `;

  document.body.appendChild(
    overlay
  );

  // CLOSE
  document.getElementById(
    "closeTxModal"
  )

  .onclick = ()=>{

    overlay.remove();

  };

}