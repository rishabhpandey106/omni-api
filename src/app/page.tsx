'use client'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import OuterLayoutRouter from "next/dist/client/components/layout-router";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {
  const [input, setinput] = useState<string>('');

  const [active, setactive] = useState("redis");

  const [output, setoutput] = useState<{
    data: string[],
    time: number
  }>()

  const handleIconClick = (type: string) => {
    setactive(type);
  };

  useEffect(() => {

    const fetchData = async () => {

      if(!input) 
        return setoutput(undefined)

      let endpoint = `https://omniapi.herokanon39.workers.dev/api/search?t=${input}`;
      if (active === "psql") {
        endpoint = `https://omniapi.herokanon39.workers.dev/api/search/psql?t=${input}`;
      }

      const res = await fetch(endpoint)

      const data = (await res.json()) as {data: string[] , time: number}

      setoutput(data);
    }

    fetchData();
  },[input , active])

  return (
    <main className="h-screen w-screen example">
      <div className="flex flex-col items-center gap-4 pt-40">
          <h1 className="text-zinc-300 font-bold text-4xl">⚡ Omni-Api ⚡</h1>
          <h2 className="text-zinc-400 font-semibold text-center text-sm max-w-prose">Speeding Up Your Development Workflow<br/> Speed in millisecond(S) </h2>
          <div className="max-w-md w-full">
            <Command>
              <CommandInput
              value={input}
              onValueChange={setinput}
              placeholder="Search any animal" />
              <CommandList>
                {output?.data.length === 0 ? (
                  <CommandEmpty>No data found</CommandEmpty>
                ) : null}
                {output?.data ? (
                  <CommandGroup heading="Results">
                    {output?.data.map((animal) => (
                      <CommandItem value={animal} key={animal} onSelect={setinput}>{animal}</CommandItem>
                    ))}
                  </CommandGroup>
                ) : null}
                {output?.data ? (
                  <>
                  <div className="h-px w-full bg-zinc-200">
                    <p className="p-2 text-xs text-zinc-500">Found {output.data.length} in {output.time.toFixed(0)} ms</p>
                  </div>
                  </>
                ) : null}
              </CommandList>
            </Command>
          </div>
          <div className="flex">
          <div
            className={`flex flex-col items-center mr-4 border-2 cursor-pointer ${
              active === "redis" ? "border-red-600" : "border-transparent"
            }`}
            onClick={() => handleIconClick("redis")}
          >
            <img
              className="h-10 w-10 m-1"
              src="https://cdn4.iconfinder.com/data/icons/redis-2/1451/Untitled-2-512.png"
              alt="redis"
            />
          </div>
          <div
            className={`flex flex-col items-center border-2 cursor-pointer ${
              active === "psql" ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => handleIconClick("psql")}
          >
            <img
              className="h-10 w-10 m-1"
              src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/postgresql-icon.png"
              alt="psql"
            />
          </div>
        </div>
        {active === 'psql' ? <div className="items-center"><p className="text-zinc-500 border-b bg-gray-blue-100">*In PostgreSQl, first index should be Capital. Ex- Ant , Lion</p></div> : ""}
      </div> 
    </main>
  );
}
