import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export default function Dashboard() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser);
  const [receiverAccount, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  const transfer = async () => {
    if (!receiverAccount || !amount) return alert("Enter account and amount");
    try {
      const res = await axios.post(`${API_BASE_URL}/api/bank/transfer`, {
        senderId: user._id,
        receiverAccount,
        amount: Number(amount),
      });
      alert(res.data.message);

      const newBalance = user.balance - Number(amount);
      setUser({ ...user, balance: newBalance });
      localStorage.setItem("user", JSON.stringify({ ...user, balance: newBalance }));

      setReceiver("");
      setAmount("");
    } catch (err) {
      console.error(err);
      alert("Transfer failed");
    }
  };

  const deposit = async () => {
    if (!depositAmount || depositAmount <= 0) return alert("Enter valid amount");
    try {
      const res = await axios.post(`${API_BASE_URL}/api/bank/deposit`, {
        userId: user._id,
        amount: Number(depositAmount),
      });
      alert(res.data.message);

      const newBalance = user.balance + Number(depositAmount);
      setUser({ ...user, balance: newBalance });
      localStorage.setItem("user", JSON.stringify({ ...user, balance: newBalance }));

      setDepositAmount("");
    } catch (err) {
      console.error(err);
      alert("Deposit failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Welcome, {user.name}</h2>

      <div className="card">
        <p><strong>Account Number:</strong> {user.accountNumber}</p>
        <p><strong>Balance:</strong> ₹{user.balance}</p>
      </div>

      {/* Transfer Card */}
      <div className="card">
        <h3>Transfer Money</h3>
        <input placeholder="Receiver Account Number" value={receiverAccount} onChange={e => setReceiver(e.target.value)} />
        <input placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <button onClick={transfer} className="btn-primary">Transfer</button>
      </div>

      {/* Deposit Card */}
      <div className="card">
        <h3>Deposit Money</h3>
        <input placeholder="Amount" type="number" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} />
        <button onClick={deposit} className="btn-primary">Deposit</button>
      </div>

      {/* Action Buttons */}
      <div className="card flex-between">
        <button onClick={logout} className="btn-red">Logout</button>
      </div>
    </div>
  );
}
