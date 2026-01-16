// src/pages/TransactionHistory.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TransactionHistory() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storedUser || !storedUser.accountNumber) {
      alert("User not logged in or missing account number");
      navigate("/login");
      return;
    }

    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bank/transactions/${storedUser.accountNumber}`
        );
        console.log("Transactions fetched:", res.data); // debug
        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching transactions:", error.response || error);
        alert("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [storedUser, navigate]);

  return (
    <div className="container">
      <h2>Transaction History</h2>

      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Type</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className={tx.type === "deposit" ? "deposit-row" : "transfer-row"}
                >
                  <td>{new Date(tx.date).toLocaleString()}</td>
                  <td>{tx.type}</td>
                  <td>{tx.senderAccount || "-"}</td>
                  <td>{tx.receiverAccount}</td>
                  <td>₹{tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
