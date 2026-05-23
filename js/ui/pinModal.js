import {
  showError
}
from "./modal.js";


// ===============================
// VERIFY TRANSACTION PIN
// ===============================

export function verifyTransactionPin(

  savedPin,
  details = {}

){

  return new Promise((resolve,reject)=>{

    // REMOVE OLD MODAL

    const oldModal =
    document.getElementById(
      "pinModal"
    );

    if(oldModal){

      oldModal.remove();

    }

    // DEFAULTS

    const {

      title = "Transaction",
      amount = 0,
      network = "",
      phone = ""

    } = details;


    // CREATE MODAL

    const modal =
    document.createElement("div");

    modal.id = "pinModal";

    modal.innerHTML = `

      <div class="pin-overlay">

        <div class="pin-box">

          <!-- ICON -->
          <div class="pin-transaction-icon">

            🔐

          </div>

          <!-- TITLE -->
          <h2>

            Enter Transaction PIN

          </h2>

          <p class="pin-subtitle">

            To continue this transaction

          </p>


          <!-- DETAILS -->
          <div class="pin-transaction-card">

            <div class="pin-row">

              <span>Service</span>

              <strong>${title}</strong>

            </div>

            <div class="pin-row">

              <span>Network</span>

              <strong>${network}</strong>

            </div>

            <div class="pin-row">

              <span>Phone</span>

              <strong>${phone}</strong>

            </div>

            <div class="pin-row">

              <span>Amount</span>

              <strong>

                ₦${amount}

              </strong>

            </div>

          </div>


<!-- INPUT -->
<input

  type="password"

  id="pinInput"

  maxlength="4"

  inputmode="numeric"

  pattern="[0-9]*"

  autocomplete="off"

  placeholder="Enter PIN"

/>

          <!-- BUTTONS -->
          <div class="pin-actions">

            <button id="cancelPinBtn">

              Cancel

            </button>

            <button id="confirmPinBtn">

              Confirm

            </button>

          </div>

        </div>

      </div>

    `;

    document.body.appendChild(
      modal
    );



    // ===============================
    // AUTO OPEN KEYBOARD
    // ===============================

setTimeout(()=>{

  const input =
  document.getElementById(
    "pinInput"
  );

  if(input){

    input.focus();

    input.setSelectionRange(
      0,
      0
    );

    // MOBILE KEYBOARD BOOST
    input.dispatchEvent(
      new Event("touchstart")
    );

  }

},300);



    // BUTTONS

    const confirmBtn =
    document.getElementById(
      "confirmPinBtn"
    );

    const cancelBtn =
    document.getElementById(
      "cancelPinBtn"
    );


    // CONFIRM

    confirmBtn.onclick = ()=>{

      const enteredPin =

      document.getElementById(
        "pinInput"
      ).value.trim();

      if(

        enteredPin === savedPin

      ){

        modal.remove();

        resolve(true);

      }

      else{

        showError(
          "Incorrect transaction PIN"
        );

      }

    };


    // CANCEL

    cancelBtn.onclick = ()=>{

      modal.remove();

      reject(

        new Error(
          "Transaction cancelled"
        )

      );

    };

  });

}