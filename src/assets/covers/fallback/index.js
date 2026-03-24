import LetterCover from "./letter.jsx";
import DoubleCover from "./double.jsx";
import MoonCover from "./moon.jsx";
import BrokenCover from "./broken.jsx";
import StairsCover from "./stairs.jsx";
import AxeCover from "./axe.jsx";
import RouletteCover from "./roulette.jsx";
import HaloCover from "./halo.jsx";
import RingCover from "./ring.jsx";
import FlameCover from "./flame.jsx";
import MirrorCover from "./mirror.jsx";
import BrothersCover from "./brothers.jsx";

const fallbackCovers = {
  letter: LetterCover,
  double: DoubleCover,
  moon: MoonCover,
  broken: BrokenCover,
  stairs: StairsCover,
  axe: AxeCover,
  roulette: RouletteCover,
  halo: HaloCover,
  ring: RingCover,
  flame: FlameCover,
  mirror: MirrorCover,
  brothers: BrothersCover,
};

export default fallbackCovers;
