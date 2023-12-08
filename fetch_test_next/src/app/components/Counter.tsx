// Quando vc usa o use client para renderizar do lado do cliente as funcoes nao podem ser asincronas
"use client"

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex flex-col items-center px-24">
      <button
        onClick={() => setCount((state) => state + 1)} 
        className="bg-indigo-500 hover:bg-purple-700 text-white font-bold my-4 py-3 px-8 rounded-2xl ml-5"
      >
        Count: {count}
      </button>
    </main>
  );
}

export default Counter;