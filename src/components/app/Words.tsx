import { A } from "@solidjs/router";
import { For } from "solid-js";

function Words() {
  return (
    <div class="min-h-screen">
      <h1 class="w-full py-6 text-center text-6xl font-light">New HSK</h1>
      <div class="grid grid-cols-2 gap-4 p-2 md:grid-cols-6 lg:grid-cols-8">
        <For each={[1, 2, 3, 4, 5, 6]}>
          {(level) => (
            <A
              class="flex h-48 w-full cursor-pointer items-center justify-center rounded-xl border border-slate-500 bg-slate-200 text-[8rem] font-extrabold text-slate-700 hover:bg-slate-300"
              href={`/chinese-chart/levels/${level}`}
            >
              {level}
            </A>
          )}
        </For>
      </div>
    </div>
  );
}

export default Words;
