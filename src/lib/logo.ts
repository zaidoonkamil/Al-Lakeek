/** The اللكيك mark, measured from the logo file (1920×1920 canvas). */
export const MARK_VIEWBOX = "0 0 1920 1920";

/** Four solid pieces, in the order they assemble. */
export const MARK_PATHS = {
  arcTop: "M258 980A686 686 0 0 1 1017 275L822 457A514 514 0 0 0 452 800Z",
  chevron: "M1246 276H1574L631 1152L1123 1646H806L307 1147Z",
  leg: "M1019 1004L1661 1646H1344L856 1158Z",
  arcSide: "M1500 558A686 686 0 0 1 1534 1303L1407 1177A514 514 0 0 0 1373 677Z",
} as const;

/** Just the forward arrow, used as the site's motion device. */
export const CHEVRON_PATH = "M62 0H100L38 50L100 100H62L0 50Z";
