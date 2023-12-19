import React from 'react'
import { Svg, Path, Rect, ClipPath, Defs, G } from 'react-native-svg'

import { RW } from '@/theme/utils'

const ChatIcon = ({ color = '#FDB737', size = 18 }) => {
  return (
    <Svg
      width={RW(size)}
      height={RW(size)}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_298_1551)">
        <Path
          d="M7.78786 0.860378C8.13148 0.917186 8.47911 0.956282 8.81839 1.03347C11.3977 1.62059 13.407 3.80533 13.782 6.4188C13.8081 6.60025 13.8255 6.78304 13.8368 6.96582C13.8428 7.06273 13.8786 7.1055 13.9744 7.13725C15.8935 7.77215 17.1525 9.06201 17.6951 11.0095C18.0902 12.4263 17.8955 13.7944 17.1942 15.0863C17.168 15.1305 17.1514 15.1797 17.1456 15.2309C17.1399 15.282 17.1451 15.3337 17.1608 15.3827C17.3872 16.1893 17.609 16.9973 17.8324 17.8046C17.8394 17.83 17.8447 17.8561 17.8574 17.9092L16.7888 17.6128C16.2973 17.4768 15.8067 17.3368 15.3128 17.2085C15.2304 17.1892 15.1438 17.199 15.0677 17.2362C11.9744 18.9375 8.15519 17.4033 7.09928 14.0316C7.06588 13.9284 7.02381 13.892 6.91928 13.885C5.92956 13.8222 4.9671 13.5348 4.10485 13.0445C4.04842 13.0111 3.95525 13.0195 3.88746 13.0379C2.91369 13.3025 1.94127 13.5725 0.96817 13.8398C0.937782 13.8482 0.907061 13.8549 0.850291 13.8689C0.960825 13.4659 1.06568 13.0836 1.17121 12.7014C1.34385 12.0755 1.52017 11.4506 1.68614 10.823C1.7048 10.7405 1.69417 10.654 1.65608 10.5784C1.20805 9.77578 0.934052 8.88768 0.85196 7.97198C0.845027 7.92381 0.83544 7.87607 0.823242 7.82896V6.92673C0.87901 6.58856 0.907727 6.24304 0.994885 5.91288C1.67712 3.32849 3.31642 1.69277 5.90879 1.02646C6.22837 0.944586 6.5613 0.914511 6.88789 0.859375L7.78786 0.860378ZM2.28122 12.442C2.87362 12.278 3.43464 12.1263 3.99265 11.9645C4.05167 11.9441 4.11472 11.938 4.17656 11.9468C4.23841 11.9555 4.29727 11.9789 4.34829 12.015C5.57318 12.7916 6.90192 13.0626 8.33184 12.8059C11.3573 12.2636 13.3967 9.27688 12.7362 6.27846C12.2503 4.073 10.8828 2.60637 8.69717 2.04732C6.51155 1.48826 4.62546 2.12384 3.1401 3.81837C1.54221 5.64054 1.38726 8.28408 2.70598 10.3733C2.74216 10.4242 2.76569 10.483 2.77464 10.5448C2.78358 10.6066 2.77768 10.6697 2.75741 10.7288C2.59545 11.2872 2.44418 11.8496 2.28122 12.442ZM13.8422 8.1404C13.2244 11.3751 11.3169 13.2811 8.1061 13.888C8.62471 15.4819 10.1956 16.8683 12.2306 16.9332C13.1698 16.9685 14.0958 16.7032 14.874 16.176C14.9742 16.1091 15.0654 16.0904 15.1829 16.1305C15.3663 16.193 15.5556 16.2374 15.7426 16.2886C15.9637 16.349 16.1847 16.4085 16.4275 16.474C16.3096 16.0503 16.2061 15.6537 16.0876 15.2617C16.0448 15.1207 16.0682 15.0161 16.1453 14.8921C17.0403 13.4509 17.1471 11.9515 16.4125 10.419C15.8792 9.30628 14.9976 8.55977 13.8422 8.1404Z"
          fill={color}
        />
        <Path
          d="M6.33161 5.8548H5.34082C5.3495 5.28439 5.5522 4.80721 5.9556 4.42226C6.14352 4.24002 6.36554 4.09669 6.60893 4.00049C6.85232 3.90428 7.11229 3.85709 7.37394 3.86163C7.63559 3.86616 7.89377 3.92232 8.13369 4.0269C8.3736 4.13148 8.59053 4.28241 8.77204 4.47105C8.95611 4.66099 9.10069 4.88559 9.1974 5.13184C9.2941 5.37809 9.34102 5.6411 9.33543 5.90563C9.32984 6.17015 9.27185 6.43094 9.16482 6.67288C9.0578 6.91482 8.90386 7.1331 8.71193 7.31509C8.4598 7.55735 8.19332 7.78492 7.94387 8.02919C7.88593 8.09073 7.8506 8.17014 7.84369 8.25441C7.83 8.46359 7.83901 8.67412 7.83901 8.89099H6.8402C6.8402 8.49935 6.83653 8.11172 6.84488 7.7241C6.84488 7.67564 6.90365 7.62151 6.94506 7.58208C7.30705 7.24558 7.67672 6.9171 8.0337 6.57525C8.18184 6.43428 8.2823 6.25053 8.32103 6.04966C8.35977 5.84879 8.33485 5.64083 8.24976 5.45482C8.1666 5.27165 8.0305 5.11762 7.85901 5.01261C7.68752 4.9076 7.48852 4.85642 7.28768 4.86569C7.05866 4.87821 6.84087 4.96899 6.67069 5.12286C6.50051 5.27673 6.38824 5.48438 6.35265 5.71112C6.34597 5.75289 6.33996 5.79666 6.33161 5.8548Z"
          fill={color}
        />
        <Path d="M7.82882 9.91162V10.8894H6.8457V9.91162H7.82882Z" fill={color} />
      </G>
      <Defs>
        <ClipPath id="clip0_298_1551">
          <Rect
            width={RW(17.0749)}
            height={RW(17.0749)}
            fill="white"
            transform="translate(0.822266 0.860352)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default ChatIcon