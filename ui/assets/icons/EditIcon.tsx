import * as React from "react"
import { SVGProps } from "react"
const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#1E1E1E"
    strokeWidth={0.6}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#1E1E1E"
      fillRule="evenodd"
      d="m8.56 20.25 12-12-4.81-4.81-12 12v4.81h4.81Zm7.19-14.69 2.69 2.69-1.94 1.94-2.69-2.69 1.94-1.94Zm-3 3 2.69 2.69-7.5 7.5H5.25v-2.69l7.5-7.5Z"
      clipRule="evenodd"
    />
  </svg>
)
export default EditIcon
