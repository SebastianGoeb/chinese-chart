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
      <div
        style={{
          "font-size": 1.5 * zoomFrac() + "rem",
          "border-width": pillBaseSizeRem() / 2 + "px",
        }}
        class="le relative flex h-full w-full shrink-0 items-center justify-center rounded-full font-kaiti"
        classList={{
          "border-slate-400": !seen(),
          "bg-slate-300": !seen(),
          "hover:bg-slate-200": !seen() && !isOpen(),
          "border-lime-700": seen(),
          "bg-lime-500": seen(),
          "hover:bg-lime-400": seen() && !isOpen(),
          "z-10": isOpen(),
        }}
      >
        <span class="cursor-pointer" onClick={togglePopup}>
          {props.word.chinese}
        </span>
        <Show when={isOpen()}>
          {/* <div class="absolute top"></div> */}
          <div class="absolute top-full z-20 mt-2 border border-stone-300 bg-white shadow-lg shadow-stone-500">
            <div class="w-[20ch] border-b border-stone-300 p-2 font-semibold">
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
