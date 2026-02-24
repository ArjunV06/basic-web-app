export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "arjunvas";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "arjunvas";
  }
  
  const arithmeticMatch = query.match(/What is (.+?)\??$/i);
  if (arithmeticMatch) {
    const tokens = arithmeticMatch[1].trim().split(/\s+/);
    const nums: number[] = [];
    const ops: string[] = [];
    let i = 0;
    while (i < tokens.length) {
      if (!isNaN(Number(tokens[i])) && tokens[i] !== "") {
        nums.push(Number(tokens[i++]));
      } else if (tokens[i] === "plus") {
        ops.push("+"); i++;
      } else if (tokens[i] === "minus") {
        ops.push("-"); i++;
      } else if (tokens[i] === "multiplied" && tokens[i + 1] === "by") {
        ops.push("*"); i += 2;
      } else if (tokens[i] === "to" && tokens[i + 1] === "the" && tokens[i + 2] === "power" && tokens[i + 3] === "of") {
        ops.push("**"); i += 4;
      } else {
        i++;
      }
    }
    if (nums.length > 0 && nums.length === ops.length + 1) {
      // first pass: exponentiation
      let j = 0;
      while (j < ops.length) {
        if (ops[j] === "**") {
          nums.splice(j, 2, Math.pow(nums[j], nums[j + 1]));
          ops.splice(j, 1);
        } else {
          j++;
        }
      }
      // second pass: multiplication
      j = 0;
      while (j < ops.length) {
        if (ops[j] === "*") {
          nums.splice(j, 2, nums[j] * nums[j + 1]);
          ops.splice(j, 1);
        } else {
          j++;
        }
      }
      // second pass: addition and subtraction
      let result = nums[0];
      for (let k = 0; k < ops.length; k++) {
        if (ops[k] === "+") result += nums[k + 1];
        else if (ops[k] === "-") result -= nums[k + 1];
      }
      return String(result);
    }
  }

  const largestMatch = query.match(/Which of the following numbers is the largest[:\s]+([\d,\s]+)\??/i);
  if (largestMatch) {
    const numbers = largestMatch[1].split(",").map((n) => Number(n.trim()));
    return String(Math.max(...numbers));
  }

  const primesMatch = query.match(/Which of the following numbers are primes[:\s]+([\d,\s]+)\??/i);
  if (primesMatch) {
    const numbers = primesMatch[1].split(",").map((n) => Number(n.trim()));
    const isPrime = (n: number) => {
      if (n < 2) return false;
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
      }
      return true;
    };
    return numbers.filter(isPrime).join(", ");
  }

  const squareAndCubeMatch = query.match(/Which of the following numbers is both a square and a cube[:\s]+([\d,\s]+)\??/i);
  if (squareAndCubeMatch) {
    const numbers = squareAndCubeMatch[1].split(",").map((n) => Number(n.trim()));
    const results = numbers.filter((n) => {
      const sixth = Math.round(Math.pow(n, 1 / 6));
      return Math.pow(sixth, 6) === n;
    });
    return results.join(", ");
  }

  return "";
}
