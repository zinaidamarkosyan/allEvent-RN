import React from 'react'
import { Svg, Path, G, Defs, ClipPath, Rect } from 'react-native-svg'

import { RW } from '@/theme/utils'

const SettingsIcon = ({ color = '#FDB737', size = 18 }) => {
  return (
    <Svg
      width={RW(size)}
      height={RW(size)}
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_298_1569)">
        <Path
          d="M6.77521 17.2064C6.67156 17.1734 6.56438 17.1486 6.46646 17.1063C5.99849 16.9092 5.73914 16.5561 5.65798 16.0734C5.61388 15.8104 5.56977 15.5475 5.52302 15.285C5.41319 14.668 4.80849 14.3191 4.19982 14.5244C3.92503 14.6167 3.6551 14.7236 3.38164 14.8207C2.7174 15.0562 2.07829 14.8365 1.72235 14.2443C1.26835 13.4893 0.817577 12.7325 0.370042 11.974C0.0171889 11.3755 0.138481 10.7406 0.683198 10.2942C0.903731 10.1151 1.12647 9.94363 1.3448 9.76364C1.84761 9.34721 1.84629 8.67638 1.34215 8.26081C1.11588 8.0744 0.881679 7.89697 0.656294 7.70927C0.145098 7.28472 0.023363 6.64383 0.355486 6.07733C0.809196 5.30347 1.2682 4.53275 1.73249 3.76516C2.07873 3.19182 2.72357 2.97335 3.36973 3.2008C3.63834 3.29572 3.90342 3.39832 4.17247 3.49196C4.80981 3.71385 5.41231 3.37053 5.52831 2.72237C5.5808 2.42865 5.62579 2.13322 5.6871 1.8412C5.74354 1.55546 5.90066 1.29761 6.13157 1.11176C6.36247 0.925913 6.65283 0.823612 6.95296 0.82236C7.8939 0.816375 8.83484 0.816375 9.77578 0.82236C10.4374 0.827063 10.9552 1.28539 11.0677 1.9498C11.1118 2.21231 11.1559 2.47525 11.2026 2.73776C11.3129 3.35728 11.9123 3.70573 12.5258 3.50222C12.8011 3.41072 13.071 3.30427 13.344 3.20679C14.0091 2.96993 14.6482 3.18669 15.0051 3.77884C15.4623 4.53788 15.9157 5.2992 16.3653 6.06279C16.7076 6.64426 16.5858 7.28472 16.061 7.71996C15.8404 7.90338 15.6089 8.07739 15.387 8.26081C14.8824 8.67809 14.8811 9.34549 15.3848 9.76278C15.6102 9.95004 15.8449 10.1271 16.0707 10.3143C16.5823 10.7389 16.7067 11.3793 16.375 11.9463C15.9198 12.725 15.4582 13.5002 14.9901 14.2721C14.6518 14.8279 14.0091 15.0485 13.3775 14.8318C13.1032 14.7377 12.8333 14.6313 12.5594 14.5355C11.9216 14.3123 11.3155 14.6543 11.2017 15.3004C11.1532 15.5731 11.1135 15.848 11.0584 16.1195C10.942 16.6873 10.5975 17.0486 10.0087 17.1799C9.9881 17.1866 9.9683 17.1953 9.94956 17.2059L6.77521 17.2064ZM15.2296 11.3062C15.0112 11.1318 14.8039 10.9642 14.5958 10.8C13.3753 9.83119 13.3753 8.19967 14.5958 7.23128C14.807 7.06368 15.0174 6.8948 15.2309 6.72378C14.7806 5.96788 14.3377 5.22737 13.8975 4.48216C13.8565 4.41332 13.819 4.39964 13.7401 4.42957C13.4534 4.53774 13.1667 4.64676 12.8743 4.73826C12.5631 4.83457 12.2343 4.86559 11.9097 4.82924C11.5852 4.79289 11.2724 4.69002 10.992 4.52745C10.7117 4.36488 10.4702 4.14634 10.2837 3.88635C10.0972 3.62636 9.96993 3.33087 9.91031 3.01952C9.85297 2.71725 9.8018 2.41369 9.74755 2.10927H6.97236C6.92826 2.3658 6.88106 2.61677 6.84004 2.86902C6.63054 4.22093 5.3757 5.08585 4.03001 4.78401C3.67936 4.70534 3.34415 4.55954 3.00497 4.43641C2.9097 4.40178 2.85854 4.40776 2.81002 4.50182C2.73636 4.64462 2.64771 4.77973 2.56523 4.91825L1.48991 6.72378L2.15548 7.25608C3.33004 8.19326 3.33004 9.83632 2.15548 10.7748L1.48991 11.3071C1.95479 12.0873 2.41615 12.8604 2.87794 13.6363C3.18008 13.5278 3.46236 13.4226 3.74508 13.3242C4.1387 13.1782 4.56719 13.1442 4.98007 13.2263C5.98878 13.4286 6.68567 14.1554 6.84225 15.161C6.88195 15.4175 6.93046 15.6706 6.97457 15.928H9.74888C9.79563 15.6569 9.8415 15.4055 9.8812 15.1529C10.0929 13.8039 11.357 12.9399 12.6983 13.2477C13.0485 13.3281 13.3833 13.4747 13.7233 13.5953C13.7992 13.6222 13.8477 13.6342 13.8975 13.55C14.3355 12.8035 14.781 12.0617 15.2296 11.3041V11.3062Z"
          fill={color}
        />
        <Path
          d="M8.44964 12.1707C6.68538 12.2425 5.17781 10.8616 5.10327 9.10348C5.0305 7.3886 6.44544 5.93451 8.26351 5.85413C10.0344 5.77717 11.5459 7.16243 11.6183 8.92905C11.688 10.6439 10.2673 12.0967 8.44964 12.1707ZM8.38084 7.13378C7.32977 7.11711 6.44455 7.95424 6.42206 8.98548C6.40001 10.0116 7.27111 10.8757 8.34026 10.8928C9.39132 10.9094 10.2748 10.074 10.299 9.04064C10.3233 8.02008 9.45042 7.15045 8.38084 7.13378Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_298_1569">
          <Rect
            width={RW(16.3887)}
            height={RW(16.3887)}
            fill="white"
            transform="translate(0.166016 0.817871)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SettingsIcon