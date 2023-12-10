import { createMemo } from "solid-js";
import { HskWord } from "../../hsk/hsk";
import { zoom } from "../../state/config";

function Word(props: { word: HskWord; intervals: Map<string, number> }) {
  const chars = createMemo(() => props.word.chinese.length);
  const zoomFrac = () => zoom() / 100;
  const pillBaseSizeRem = () => 4 * zoomFrac();
  const seen = createMemo(() => {
    const ivl = props.intervals.get(props.word.chinese);
    return ivl !== undefined && ivl > 0;
  });
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
        classList={{
          "font-kaiti": true,
          "h-full": true,
          "w-full": true,
          flex: true,
          "justify-center": true,
          "items-center": true,
          "shrink-0": true,
          "rounded-full": true,
          "border-slate-400": !seen(),
          "bg-slate-300": !seen(),
          "border-lime-700": seen(),
          "bg-lime-500": seen(),
        }}
      >
        {props.word.chinese}
      </div>
    </div>
  );
}

export default Word;
