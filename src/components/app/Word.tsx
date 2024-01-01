import { Show, createMemo } from "solid-js";
import { HskWord } from "../../services/hsk";
import { openWord, setOpenWord } from "../../state/levels";

function Word(props: { word: HskWord; intervals: Map<string, number> }) {
  const chars = createMemo(() => props.word.chinese.length);
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

  const fontSize = () => {
    if (chars() <= 2) {
      return "1.5rem";
    }
    if (chars() <= 4) {
      return "1rem";
    }
    return "0.75rem";
  };

  return (
    // container
    <div class="relative h-full w-full p-2">
      {/* pill */}
      <div
        style={{
          "font-size": fontSize(),
        }}
        class="flex h-16 w-full shrink-0 cursor-pointer items-center justify-center truncate rounded border p-2 font-kaiti 2xl:py-4"
        classList={{
          "border-slate-200": !seen(),
          "bg-slate-100": !seen(),
          "bg-slate-200": seen(),
          "border-slate-500": seen(),
          "hover:bg-slate-200": !seen() && !isOpen(),
          "hover:bg-slate-300": seen() && !isOpen(),
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
  );
}

export default Word;
