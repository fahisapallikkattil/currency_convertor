import { useState } from 'react'


import './App.css'
import useCurrencyinfo from './hooks/useCurrencyinfo'
import { InputBox } from './components/index.js'


function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] =useState('usd')
  const [to , setTo] = useState('inr')
  const [convertedAmount , setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyinfo(from)  

  // useCurrencyInfo is customized hook
  const option = Object.keys(currencyInfo)
//  to extract all the keys from currencyInfo

const swap = ()=>{
  setFrom(to)
  setTo(from)
  setConvertedAmount(amount)
  setAmount(convertedAmount)
}

const convert = ()=>{
  setConvertedAmount(amount * currencyInfo[to])
}


  return (<div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
  style={{backgroundImage: `url(https://media.istockphoto.com/id/1335295270/photo/global-connection.jpg?s=612x612&w=0&k=20&c=pVIatR8XcihqKTDnISYXNWvSkpZkdeJJa3YNfk9zC6g=)`}}
  >
    <div className='w-full'>
      <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
        <form onSubmit={(e) => {
          e.preventDefault()
          convert()
        }}>
          <div className='w-full mb-1'>
            <InputBox
            label="from"
            amount={amount}
            currencyOptions={option}
            onCurrencyChange={(currency) => setFrom(currency)}
            onAmountChange={(amount) => setAmount(amount)}
            selectedCurrency={from}
            />
          </div>
          <div className='relative w-full h-0.5'>
            <button
            className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
            onClick={swap}
            >Swap</button>
          </div>
          <div className='w-full mb-1'>
            <InputBox
            label="to"
            currencyOptions={option}
            amount={convertedAmount}
            onCurrencyChange={(currency) => setTo(currency)}
            selectedCurrency={to}
            amountDisabled
            />
          </div>
          <button
          type='submit'
          className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'
          >Convert {from.toUpperCase()} to {to.toUpperCase()}</button>
        </form>
      </div>
    </div>

  </div>
    )
}

export default App
