import { createSignal } from "solid-js";
import { Revision } from "../hsk/hsk";

export const [revision, setRevision] = createSignal<Revision>(Revision.NEW);

export const [zoom, setZoom] = createSignal<number>(100);
