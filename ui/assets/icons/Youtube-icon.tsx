import * as React from "react"
import { SVGProps } from "react"
const YoutubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 512 512"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M449.446 0C483.971 0 512 28.03 512 62.554v386.892C512 483.97 483.97 512 449.446 512H62.554C28.03 512 0 483.97 0 449.446V62.554C0 28.03 28.029 0 62.554 0h386.892Zm-20.967 175.63c-4.139-15.489-16.337-27.687-31.826-31.826C368.575 136.28 256 136.28 256 136.28s-112.575 0-140.653 7.524c-15.486 4.139-27.686 16.337-31.826 31.826C76 203.705 76 262.282 76 262.282s0 58.576 7.521 86.648c4.14 15.489 16.34 27.69 31.826 31.829C143.425 388.28 256 388.28 256 388.28s112.575 0 140.653-7.521c15.489-4.139 27.687-16.34 31.826-31.829C436 320.858 436 262.282 436 262.282s0-58.577-7.521-86.652ZM219.998 316.283V208.281l93.53 54.001-93.53 54.001Z" />
  </svg>
)
export default YoutubeIcon
