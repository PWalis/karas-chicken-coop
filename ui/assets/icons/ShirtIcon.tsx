import * as React from "react"
import { SVGProps } from "react"
const ShirtIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#1E1E1E"
      strokeLinecap="square"
      strokeLinejoin="round"
      strokeWidth={1.992}
      d="m3 7 3-3h3a3 3 0 0 0 6 0h3l3 3-.5 5-2.5-1.5V20H6v-9.5L3.5 12 3 7Z"
    />
  </svg>
)
export default ShirtIcon