import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import './App.css';

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const getNegativeNums = (str) => {
  return (str.match(/-\d+/g) || []).map(Number);
};

function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const add = (numbers) => {
    if (numbers === "") {
      return 0; 
    }
  
    let delimiter = /,/; 

    if (numbers.startsWith("//")) {
      delimiter = new RegExp(escapeRegExp(numbers[2]), 'g'); 
      numbers = numbers.slice(4); 
    }

    numbers = numbers.replace(/n/g, ''); 
    numbers = numbers.replace(/\\/g, delimiter.source);
  
    const numsArr = numbers.split(delimiter);
  
    let sum = 0;
    let negativeNumbers = [];

    for (let num of numsArr) {
      if (num.trim() === "") continue; 
 
      if(num.includes('-')){
   
        negativeNumbers.push(getNegativeNums(num))

      }

      const x = parseInt(num, 10);
      if (isNaN(x)) {
        continue; 
      }
      else{
        sum += x;
      }
    }
    
    
    if (negativeNumbers.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(", ")}`);
    }
  
    return sum;
  }
  

  const calculate = () => {
    try {
      setError(null); 
      const sum = add(value);
      setResult(sum);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  }

  return (
    <div className="App min-h-screen ">
      <div className='flex justify-center'>
        <h1 className='text-blue-500 text-2xl font-bold mt-10'>Simple Calculator</h1>
      </div>

      <div className="mt-10 flex justify-center item-center">
        <div className='flex flex-col gap-4 shadow-md p-10'>
          <Input
            placeholder="Enter Values"
            className='border border-blue-200 rounded-sm my-2'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button className='bg-blue-400 hover:bg-blue-500 rounded-sm' onClick={calculate}>
            <p className='font-bold text-white'>Calculate</p>
          </Button>
          {result !== null && (
            <div className='mt-4'>
              <h2 className='text-xl font-bold'>Result: {result}</h2>
            </div>
          )}
          {error && (
            <div className='mt-4 text-red-600'>
              <h2 className='text-md font-bold'>Error: {error}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
