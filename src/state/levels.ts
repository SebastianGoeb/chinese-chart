import { createSignal } from "solid-js";

export const [openWord, setOpenWord] = createSignal<
  { level: number; no: number } | undefined
>(undefined);
