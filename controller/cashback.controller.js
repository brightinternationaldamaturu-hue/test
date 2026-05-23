exports.withdrawCashback = async (req, res) => {
  try {
    const { userId, transactionPin } = req.body;

    if (!userId || !transactionPin) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    const userRef = db.collection("users").doc(userId);

    await db.runTransaction(async (t) => {
      const snap = await t.get(userRef);

      if (!snap.exists) {
        throw new Error("User not found");
      }

      const user = snap.data();

      // =========================
      // PIN VALIDATION (NEW)
      // =========================
      if (!user.transactionPin) {
        throw new Error("Transaction PIN not set");
      }

      if (user.transactionPin !== transactionPin) {
        throw new Error("Invalid transaction PIN");
      }

      const cashback = Number(user.cashbackBalance || 0);

      if (cashback <= 0) {
        throw new Error("No cashback available");
      }

      // =========================
      // UPDATE WALLET
      // =========================
      t.update(userRef, {
        wallet: admin.firestore.FieldValue.increment(cashback),
        cashbackBalance: 0
      });

      // =========================
      // TRANSACTION LOG
      // =========================
      const txRef = db.collection("transactions").doc();

      t.set(txRef, {
        userId,
        email: user.email || "",
        fullName: user.fullName || "",
        phone: user.phone || "",
        type: "cashback_withdrawal",
        category: "cashback",
        title: "Cashback Withdrawal",
        amount: cashback,
        status: "success",
        description: "Cashback moved to wallet",
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });

    return res.json({
      success: true,
      message: "Cashback withdrawn successfully"
    });

  } catch (err) {
    console.log(err);

    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
};