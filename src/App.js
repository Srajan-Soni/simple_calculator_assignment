import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import './App.css';

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const getNegativeNums = (str) => {
  return (str.match(/-\d+/g) || []).join('');
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
 
      const negativeStr = getNegativeNums(num);
      if (negativeStr) {
        negativeNumbers.push(negativeStr);
      }

      const x = parseInt(num, 10);
      if (!isNaN(x)) {
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
    <div className="App min-h-screen bg-gray-100 flex flex-col">
  
        <h1 className="text-blue-500 text-2xl mt-5 font-bold text-center">Simple Calculator</h1>

      <div className=" flex flex-col  items-center mt-20">
        <div className="w-full md:w-1/3 flex flex-col justify-center items-center">
          <h2 className="font-bold text-lg text-center mb-4">Add the String Values</h2>
          <div className="flex flex-col gap-4 w-full shadow-lg p-6 md:p-10 bg-white rounded-lg">
            <Input
              placeholder="Enter Values"
              className="border w-full md:w-1/2 m-auto border-blue-300 rounded-md my-2"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button className="bg-blue-500 w-1/2 md:w-1/4 m-auto hover:bg-blue-600 rounded-md" onClick={calculate}>
              <p className="font-bold text-white">Calculate</p>
            </Button>
            {result !== null && (
              <div className="mt-4">
                <h2 className="text-lg md:text-xl font-bold text-center">Result: {result}</h2>
              </div>
            )}
            {error && (
              <div className="mt-4 text-red-600">
                <h2 className="text-md md:text-lg font-bold text-center">Error: {error}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
