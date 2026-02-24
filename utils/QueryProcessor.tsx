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
  
  const additionMatch = query.match(/What is (\d+) plus (\d+)/i);
  if (additionMatch) {
    return String(Number(additionMatch[1]) + Number(additionMatch[2]));
  }

  const largestMatch = query.match(/Which of the following numbers is the largest[:\s]+([\d,\s]+)\??/i);
  if (largestMatch) {
    const numbers = largestMatch[1].split(",").map((n) => Number(n.trim()));
    return String(Math.max(...numbers));
  }

  return "";
}
