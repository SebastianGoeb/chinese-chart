import { createSignal } from "solid-js";
import { Revision } from "../services/hsk";

export const [revision, setRevision] = createSignal<Revision>(Revision.NEW);

export const [zoom, setZoom] = createSignal<number>(100);
