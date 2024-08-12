
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  
  const getNegativeNums = (str) => {
    return (str.match(/-\d+/g) || []).join("");
  };

   function add(numbers){
    if (numbers === "") {
      return 0;
    }

    let delimiter = /,/;

    if (numbers.startsWith("//")) {
      delimiter = new RegExp(escapeRegExp(numbers[2]), "g");
      numbers = numbers.slice(4);
    }

    numbers = numbers.replace(/n/g, "");
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
      throw new Error(
        `Negative numbers not allowed: ${negativeNumbers.join(", ")}`
      );
    }

    return sum;
  };

module.exports = {add}  
