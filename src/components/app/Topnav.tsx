import magnifyingGlass from "heroicons/24/outline/magnifying-glass.svg";
import { Revision } from "../../hsk/hsk";
import { revision, setRevision, setZoom, zoom } from "../../state/config";
import { setQuery } from "../../state/search";
import Multibutton, { MultibuttonOption } from "../library/Multibutton";
import Zoomer from "./Zoomer";

const revisionOptions: MultibuttonOption<Revision>[] = [
  {
    displayName: "Old",
    value: Revision.OLD,
  },
  {
    displayName: "New",
    value: Revision.NEW,
  },
];

function Topnav() {
  return (
    <>
      <nav class="sticky top-0 flex items-center justify-between  bg-[#223F05] px-32 py-4">
        <h1 class="font-nunito text-4xl font-extralight  text-white">HSK</h1>
        <div class="flex items-center gap-4">
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 right-0 mr-3 flex items-center">
              <img
                src={magnifyingGlass}
                alt="magnifying glass"
                class="h-5 w-5"
              ></img>
            </div>
            <input
              class="block w-full"
              onInput={(e) => setQuery(e.target.value)}
            ></input>
          </div>
          {/* <div>
            <button class="bg-stone-50 p-2.5">
              <img src={bars3BottomRight} alt="sort" class="h-5 w-5"></img>
            </button>
            <div class="relative">
              <ul class="absolute right-0 top-2 z-10 w-fit divide-y border border-[1px] border-stone-200 bg-stone-50 shadow-lg">
                <li class="flex items-center justify-end px-8 py-2">
                  <span>alphabetical</span>
                  <img src={magnifyingGlass} class="ml-2 h-4 w-4"></img>
                </li>
                <li class="flex items-center justify-end px-8 py-2">
                  <span>shuffled</span>
                  <img src={magnifyingGlass} class="ml-2 h-4 w-4"></img>
                </li>
              </ul>
            </div>
          </div> */}
          <Zoomer></Zoomer>
          <input
            type="number"
            onchange={(e) => setZoom(Number(e.target.value))}
            value={zoom()}
          ></input>
          <Multibutton
            options={revisionOptions}
            value={revision()}
            onChange={(value) => setRevision(value)}
          ></Multibutton>
        </div>
      </nav>
    </>
  );
}

export default Topnav;
