import magnifyingGlass from "heroicons/24/outline/magnifying-glass.svg";
import { Revision } from "../../services/hsk";
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

function LevelsSubnav() {
  return (
    <nav class="mt-4 flex items-stretch justify-stretch gap-4 px-4 md:px-16 lg:px-32 xl:px-64 2xl:px-64">
      {/* filter */}
      <div class="relative grow">
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

      <div class="flex items-stretch justify-stretch">
        {/* zoom */}
        <Zoomer></Zoomer>

        {/* exact zoom */}
        <input
          type="number"
          class="w-20 border-l-0"
          onchange={(e) => setZoom(Number(e.target.value))}
          value={zoom()}
        ></input>
      </div>
      {/* hsk old/new */}
      <Multibutton
        options={revisionOptions}
        value={revision()}
        onChange={(value) => setRevision(value)}
      ></Multibutton>
    </nav>
  );
}

export default LevelsSubnav;
