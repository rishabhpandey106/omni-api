'use client'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import OuterLayoutRouter from "next/dist/client/components/layout-router";
import { useEffect, useState } from "react";


export default function Home() {
  const [input, setinput] = useState<string>('');

  const [output, setoutput] = useState<{
    data: string[],
    time: number
  }>()

  useEffect(() => {
    const fetchData = async () => {

      if(!input) 
        return setoutput(undefined)

      const res = await fetch(`https://omniapi.herokanon39.workers.dev/api/search?t=${input}`)

      const data = (await res.json()) as {data: string[] , time: number}

      setoutput(data);
    }

    fetchData();
  },[input])

  return (
    <main className="h-screen w-screen example">
      <div className="flex flex-col items-center gap-4 pt-40">
          <h1 className="text-zinc-300 font-bold text-4xl">Omni-Api</h1>
          <h2 className="text-zinc-400 font-semibold text-center text-sm max-w-prose">Ultra Fast API <br/> Search to get results in millisecond(S) </h2>
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
      </div> 
    </main>
  );
}
