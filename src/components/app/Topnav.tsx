import { A } from "@solidjs/router";

function Topnav() {
  return (
    <>
      <nav class="sticky top-0 flex items-center justify-between bg-[#223F05] px-4 py-4 lg:px-32">
        <h1 class="font-nunito text-4xl font-extralight text-white">HSK</h1>
        <A
          href="/chinese-chart/levels"
          class="rounded-full bg-lime-100 px-8 py-3 text-black hover:bg-lime-200 hover:shadow-lg hover:shadow-rose-500/25"
          activeClass="shadow-lg shadow-rose-500/50"
        >
          Levels
        </A>
        <A
          href="/chinese-chart/compare"
          class="rounded-full bg-lime-100 px-8 py-3 text-black hover:bg-lime-200 hover:shadow-lg hover:shadow-rose-500/25"
          activeClass="shadow-lg shadow-rose-500/50"
        >
          Compare
        </A>
      </nav>
    </>
  );
}

export default Topnav;
