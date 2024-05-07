import * as React from "react"
import { SVGProps } from "react"
const MobileMenuIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={36}
    height={36}
    stroke="#000"
    strokeWidth={6}
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 64 64"
    {...props}
  >
    <path
      d="M0 0h1280v800H0z"
      style={{
        fill: "none",
      }}
      transform="translate(-1088 -192)"
    />
    <path
      d="M103.288 8.535h71.218v34.133h-71.218z"
      style={{
        fillRule: "nonzero",
      }}
      transform="matrix(.2251 0 0 .17555 -15.279 42.427)"
    />
    <path
      d="M103.288 8.535h141.366v34.133H103.288z"
      style={{
        fillRule: "nonzero",
      }}
      transform="matrix(.2251 0 0 .17555 -15.069 27.505)"
    />
    <path
      d="M103.288 8.535h212.447v34.133H103.288z"
      style={{
        fillRule: "nonzero",
      }}
      transform="matrix(.2251 0 0 .17555 -15.069 12.584)"
    />
  </svg>
)
export default MobileMenuIcon