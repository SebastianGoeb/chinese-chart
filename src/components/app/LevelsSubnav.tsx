import magnifyingGlass from "heroicons/24/outline/magnifying-glass.svg";
import { Show, createSignal } from "solid-js";
import { Revision } from "../../services/hsk";
import { revision, setRevision } from "../../state/config";
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

enum Menu {
  FILTER,
  SETTINGS,
}

function LevelsSubnav() {
  const [openMenu, setOpenMenu] = createSignal<Menu | undefined>(undefined);
  return (
    <div class="fixed bottom-0 left-0 right-0 z-20">
      <Show when={openMenu() === Menu.FILTER}>
        <div class="border-t border-stone-500 bg-white">
          <div class="flex flex-col items-stretch gap-4 px-4 py-4 md:px-16 lg:px-32 xl:px-64 2xl:px-64">
            <h2 class="text-lg font-semibold">Filter</h2>
            <div class="relative grow">
              <div class="pointer-events-none absolute inset-y-0 left-0 ml-3 flex items-center">
                <img
                  src={magnifyingGlass}
                  alt="magnifying glass"
                  class="h-5 w-5"
                ></img>
              </div>
              <input
                class="block w-full pl-10"
                onInput={(e) => setQuery(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
      </Show>

      <Show when={openMenu() === Menu.SETTINGS}>
        <div class="border-t border-stone-500 bg-white">
          <div class="flex flex-col items-start gap-2 px-4 py-4 md:px-16 lg:px-32 xl:px-64 2xl:px-64">
            <h2 class="text-lg font-semibold">Settings</h2>
            <div class="grid grid-cols-3 justify-items-start gap-4">
              Zoom
              <div class="col-span-2">
                <Zoomer></Zoomer>
              </div>
              HSK
              <div class="col-span-2">
                <Multibutton
                  options={revisionOptions}
                  value={revision()}
                  onChange={(value) => setRevision(value)}
                ></Multibutton>
              </div>
            </div>
          </div>
        </div>
      </Show>

      <nav class="flex border-t border-stone-500 bg-lime-100 px-4 md:px-16 lg:px-32 xl:px-64 2xl:px-64">
        {/* filter */}

        <div class="flex w-full items-center justify-around">
          <button
            class="px-8 py-2"
            onClick={() =>
              setOpenMenu(openMenu() !== Menu.FILTER ? Menu.FILTER : undefined)
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>

          <button
            class="px-8 py-2"
            onClick={() =>
              setOpenMenu(
                openMenu() !== Menu.SETTINGS ? Menu.SETTINGS : undefined,
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default LevelsSubnav;
