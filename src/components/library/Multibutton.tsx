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
  return (
    <div class="flex divide-x divide-stone-500 border border-stone-500">
      <For each={props.options}>
        {(option) => (
          <button
            class="px-4 py-2"
            classList={{
              // on
              "bg-rose-500": props.value == option.value,
              "text-white": props.value == option.value,
              // off
              "bg-white": props.value != option.value,
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
