import { Show, createMemo } from "solid-js";
import { HskWord } from "../../services/hsk";
import { zoom } from "../../state/config";
import { openWord, setOpenWord } from "../../state/levels";

function Word(props: { word: HskWord; intervals: Map<string, number> }) {
  const chars = createMemo(() => props.word.chinese.length);
  const zoomFrac = () => zoom() / 100;
  const pillBaseSizeRem = () => 4 * zoomFrac();
  const seen = createMemo(() => {
    const ivl = props.intervals.get(props.word.chinese);
    return ivl !== undefined && ivl > 0;
  });

  function isOpen() {
    const { level, no } = props.word;
    return level === openWord()?.level && no === openWord()?.no;
  }

  function togglePopup() {
    if (isOpen()) {
      setOpenWord(undefined);
    } else {
      const { level, no } = props.word;
      setOpenWord({ level, no });
    }
  }

  return (
    <div
      style={{
        height: pillBaseSizeRem() + "rem",
        padding: pillBaseSizeRem() / 8 + "rem",
        width:
          pillBaseSizeRem() + ((chars() - 1) * pillBaseSizeRem()) / 2 + "rem",
      }}
    >
      {/* container */}
      <div class="relative h-full w-full">
        {/* pill */}
        <div
          style={{
            "font-size": 1.5 * zoomFrac() + "rem",
            "border-width": pillBaseSizeRem() / 2 + "px",
          }}
          class="flex h-full w-full shrink-0 cursor-pointer items-center justify-center rounded-full font-kaiti"
          classList={{
            "border-slate-400": !seen(),
            "bg-slate-300": !seen(),
            "hover:bg-slate-200": !seen() && !isOpen(),
            "border-lime-700": seen(),
            "bg-lime-500": seen(),
            "hover:bg-lime-400": seen() && !isOpen(),
            "z-20": isOpen(),
          }}
          onClick={togglePopup}
        >
          {props.word.chinese}
        </div>

        {/* popup */}
        <Show when={isOpen()}>
          <div class="fixed bottom-0 left-0 right-0 z-20 mt-2 h-48 items-stretch border border-stone-300 bg-white shadow-lg shadow-stone-500 lg:absolute lg:inset-auto lg:top-full">
            <svg
              viewBox="-40 0 40 10"
              xmlns="http://www.w3.org/2000/svg"
              class="absolute bottom-full left-0 hidden h-[10px] w-[90px] fill-white stroke-stone-300 lg:block"
            >
              <path d="M -40 10 C -10 10 -4 4 0 0 C 4 4 10 10 40 10" />
            </svg>

            <div class="w-full border-b border-stone-300 p-2 font-semibold lg:w-[20ch]">
              {props.word.pinyin}
            </div>
            <div class="p-2">{props.word.english}</div>
          </div>
        </Show>
      </div>
    </div>
  );
}

export default Word;
