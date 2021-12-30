import React from "react";
import Image from "next/image";
import apiClient from "lib/api_client";
import useAsync from "lib/hooks/useAsync";

const LIMIT = 20;

export default function IntersectionObserverPage() {
  const [offset, setOffset] = React.useState(0);
  const { data: pokemon, run, status } = useAsync({ data: [] });

  const [element, setElement] = React.useState(null);

  React.useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setOffset((offset) => offset + 20);
        }
      },
      {
        threshold: 1,
      }
    );

    if (element) {
      intersectionObserver.observe(element);
    }

    return () => {
      if (element) {
        intersectionObserver.unobserve(element);
      }
    };
  }, [element]);

  React.useEffect(() => {
    run(apiClient(offset, LIMIT));
  }, [offset, run]);

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="pb-4" />
      <h1 className="text-2xl font-bold">
        Infinite Scroll using Intersection Observer Api
      </h1>
      <div className="pb-4" />
      <ul className="grid grid-cols-2 gap-4 w-full max-w-2xl py-4">
        {pokemon.map((p: any, i: number) => {
          return (
            <li
              // @ts-ignore
              ref={setElement}
              key={i}
              className="flex justify-center items-center border-2 border-yellow-500 p-12 rounded-md"
            >
              {p.name}
            </li>
          );
        })}
      </ul>
      {status === "pending" && (
        <div className="w-full text-center">
          <Image width={64} height={64} src="/puff.svg" alt="puff" />
        </div>
      )}
    </main>
  );
}
