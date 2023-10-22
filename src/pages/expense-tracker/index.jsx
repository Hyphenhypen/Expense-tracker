import { useState } from "react";
import {useAddTransaction} from "../../hooks/useAddTransaction"
import {useGetTransactions} from "../../hooks/useGetTransactions"
import {useGetUserInfo} from "../../hooks/useGetUserInfo"

import "./styles.css"
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

export const ExpenseTracker = () =>{
    const {addTransaction} = useAddTransaction();
    const navigate= useNavigate()
    const {transactions} = useGetTransactions();
    const {name, profilePhoto} = useGetUserInfo()
    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");
    const onSubmit = (e) =>{
        e.preventDefault()
        addTransaction({
            description,
            transactionAmount,
            transactionType,
        })
    }   

    const signUserOut=async ()=>{
        try{
            await signOut(auth)
            localStorage.clear()
            navigate("/")
        }
        catch(err){
            console.log(err)
        }
    }

    return ( 
        <>
        <div className="expense-tracker">
            <div className="container">
                <h1> {name}'s Expense Tracker</h1>
                <div className="balance">
                    <h1>Your Balance</h1>
                    <h2>0</h2>
                </div>
                <div className="summary">
                    <div className="income">
                        <h4>Income</h4>
                        <p>0</p>
                    </div>
                    <div className="expenses">
                        <h4>Expenses</h4>
                        <p>0</p>
                    </div>
                </div>
                <form className="add-transaction" onSubmit={onSubmit}>
                    <input type="text" placeholder="Description" required onChange={(e)=>{setDescription(e.target.value)}} />
                    <input type="number" placeholder="Amount" required onChange={(e)=>{setTransactionAmount(e.target.value)}} />
                    <input type="radio" id="expense" value="expense" 
                    checked={transactionType==="expense"}
                    onChange={(e)=>{setTransactionType(e.target.value)}}/>
                    <label htmlFor="expense">Expense</label>
                    <input type="radio" id="income" value="income"
                    checked={transactionType==="income"}
                    onChange={(e)=>{setTransactionType(e.target.value)}}/>
                    <label htmlFor="income">Income</label>
                    <button type="submit">Add Transaction</button>
                </form>
                </div>
                {profilePhoto && (
                <div className="profile">
                    <img className="profile-photo"  src={profilePhoto}/>
                    <button className="sign-out-button" onClick={signUserOut}>
                        Sign Out
                    </button>
                    </div>
                    )}
            </div>
            <div className="transactions">
                <h2>Transactions</h2>
                <ul>
                    {transactions.map((transaction)=>{
                        const {description, transactionAmount, transactionType} = transaction;
                        return (
                            <li>
                                <h4>{description}</h4>
                                <p>{transactionAmount} * <label style={{color: transactionType === "expense"?"red": "green"}}>{transactionType}</label> </p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
};