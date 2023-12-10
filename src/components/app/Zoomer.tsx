import { setZoom, zoom } from "../../state/config";
import Multibutton, { MultibuttonOption } from "../library/Multibutton";

const options: MultibuttonOption<number>[] = [
  {
    displayName: "50%",
    value: 50,
  },
  {
    displayName: "100%",
    value: 100,
  },
  {
    displayName: "200%",
    value: 200,
  },
];

function Zoomer() {
  return (
    <Multibutton
      options={options}
      value={zoom()}
      onChange={(value) => setZoom(value)}
    ></Multibutton>
  );
}

export default Zoomer;
