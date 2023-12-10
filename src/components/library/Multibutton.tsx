import { For } from "solid-js";

export interface MultibuttonOption<T> {
  displayName: string;
  value: T;
}

function Multibutton<T>(props: {
  options: MultibuttonOption<T>[];
  value: T;
  onChange: (t: T) => void;
}) {
  // const [value, setValue] = props.signal;
  return (
    <div class="rounded-md border-4 border-[#F6FEE6] bg-[#F6FEE6]">
      <For each={props.options}>
        {(option) => (
          <button
            classList={{
              rounded: true,
              "bg-[#BF0D00]": props.value == option.value,
              "bg-[#F6FEE6]": props.value != option.value,
              "px-4": true,
              "py-2": true,
              "text-white": props.value == option.value,
              "text-black": props.value != option.value,
            }}
            onClick={() => props.onChange(option.value)}
          >
            {option.displayName}
          </button>
        )}
      </For>
    </div>
  );
}

export default Multibutton;
