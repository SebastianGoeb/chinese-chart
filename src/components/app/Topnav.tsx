import { A } from "@solidjs/router";

function Topnav() {
  return (
    <nav class="sticky top-0 z-10 flex items-center justify-between border-b border-b-stone-500 bg-lime-50 px-4 text-xs md:px-16 md:text-base lg:px-32 xl:px-64 2xl:px-96">
      <h1 class="font-kaiti text-4xl font-semibold text-stone-700">中文</h1>
      <div class="flex gap-4">
        <A
          href="/chinese-chart/levels"
          class="p-3 hover:border-b-[7px] hover:border-b-rose-200 md:px-8"
          style={{ "margin-bottom": "-4px" }}
          activeClass="border-b-rose-500 border-b-[7px] hover:border-b-rose-500"
        >
          HSK Levels
        </A>
        <A
          href="/chinese-chart/compare"
          class="p-3 hover:border-b-[7px] hover:border-b-rose-200 md:px-8"
          style={{ "margin-bottom": "-4px" }}
          activeClass="border-b-rose-500 border-b-[7px] hover:border-b-rose-500"
        >
          Compare
        </A>
      </div>
    </nav>
  );
}

export default Topnav;
