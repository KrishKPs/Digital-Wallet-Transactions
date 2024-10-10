import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter, Route, Routes } from 'react-router-dom'   
import './App.css'
import { SignupPage } from './Pages/Signup'
import { LoginPage } from './Pages/Login'
import { DashBoard } from './Pages/DashBord'
import { AccountCreate } from './Pages/Accountpage'
import { Transfer } from './Pages/Transfer'
import { TransfertoUser } from './Pages/TransfertoUser'
import { UserTransactions } from './Pages/UserTransactions'
import { CreateBankAccount } from './Components/Createaccount'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <BrowserRouter> 

   <Routes> 

    <Route path="/" element={<h1> Hello Krish </h1>} />  
    <Route path='/signup' element={<SignupPage/> }/> 
    <Route path='/login' element={<LoginPage/> }/> 
    <Route path='/dashboard' element={<DashBoard/> } />   

    <Route path='/deposite' element={<AccountCreate/> } />  
    <Route path='/transfermoney' element={<Transfer/> } />  
    <Route path='/sendmoney/:id' element={<TransfertoUser/> } />  
    <Route path='usertransactions' element={<UserTransactions/> }/> 
    <Route path='createaccount' element={<CreateBankAccount/> }/>  



   </Routes>
    
    </BrowserRouter>
     
    </>
  )
}

export default App
