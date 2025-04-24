import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M.005 23.978c-.001-.466.161-.919.46-1.278l9.994-11.979a2.002 2.002 0 013.533 1.095 1.997 1.997 0 01-.454 1.46L4.582 23.979l8.636 10.701a1.998 1.998 0 01-.3 2.815 2 2 0 01-2.918-.28L.345 25.237c-.251-.37-.371-.813-.34-1.258z"
        fill="#522FFF"
      />
    </Svg>
  )
}

export default SvgComponent
