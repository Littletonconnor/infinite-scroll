import React from "react";
import Image from "next/image";
import apiClient from "lib/api_client";
import useAsync from "lib/hooks/useAsync";

const LIMIT = 20;

export default function EventApiPage() {
  const [offset, setOffset] = React.useState(0);
  const { data: pokemon, status, run } = useAsync({ data: [] });

  React.useEffect(() => {
    run(apiClient(offset, LIMIT));
  }, [offset, run]);

  function handleScroll(e: any) {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );

    if (currentHeight + 1 >= scrollHeight) {
      setOffset((offset) => offset + 20);
    }
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="pb-4" />
      <h1 className="text-2xl font-bold">
        Infinite Scroll using Scroll height Api
      </h1>
      <div className="pb-4" />
      <ul className="grid grid-cols-2 gap-4 w-full max-w-2xl py-4">
        {pokemon.map((p: any, i: number) => {
          return (
            <li
              className="p-12 flex justify-center items-center border-2 rounded-md border-yellow-500"
              key={i}
            >
              {p.name}
            </li>
          );
        })}
      </ul>
      {status === "pending" && (
        <Image width={64} height={64} src="/puff.svg" alt="puff" />
      )}
    </main>
  );
}
