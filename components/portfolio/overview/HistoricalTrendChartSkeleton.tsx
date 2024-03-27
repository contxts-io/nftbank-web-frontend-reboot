import { useEffect, useMemo, useState } from "react";
import styles from "./HistoricalTrendChartSkeleton.module.css";

const HistoricalTrendChartSkeleton = () => {
  return (
    <section className="w-full relative">
      <svg
        fill="none"
        height="200"
        width="100%"
        preserveAspectRatio="none"
        transform="translate(0, 35)"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 647 200"
        className={styles.skeleton}
      >
        <defs>
          <linearGradient
            id="historical-chart-mask-gradient"
            x1="0%"
            x2="100%"
            y1="0%"
            y2="0%"
          >
            <stop offset="0" className={styles["gradient-base"]}>
              <animate
                attributeName="offset"
                dur="1.3s"
                repeatCount="indefinite"
                values="-1;3"
              />
            </stop>
            <stop offset="0.5" className={styles["gradient-highlight"]}>
              <animate
                attributeName="offset"
                dur="1.3s"
                repeatCount="indefinite"
                values="-0.5;3.5"
              />
            </stop>
            <stop offset="1" className={styles["gradient-base"]}>
              <animate
                attributeName="offset"
                dur="1.3s"
                repeatCount="indefinite"
                values="0;4"
              />
            </stop>
          </linearGradient>
        </defs>
        <mask id="historical-chart-mask" style={{ maskType: "alpha" }}>
          <path
            d="M1 116.929L63.6429 135.618C64.4181 135.849 65.2563 135.591 65.7666 134.963L128.679 57.5764C129.19 56.9481 130.03 56.6898 130.805 56.9222L190.69 74.8658C191.353 75.0644 192.071 74.9063 192.589 74.4477L256.881 17.5583C257.199 17.2768 257.599 17.1039 258.022 17.0647L324.825 10.8717C324.951 10.86 325.078 10.8603 325.205 10.8727L388.49 17.088C388.739 17.1125 388.99 17.09 389.231 17.0218L445.383 1.10001C445.616 1.03389 445.86 1.01071 446.101 1.03161L514.104 6.91595C514.394 6.94103 514.675 7.02907 514.927 7.17392L582.274 45.8297C582.783 46.1219 583.395 46.1757 583.947 45.9768L647 23.2701"
            className={styles["gradient-base"]}
            stroke-width="1"
          />
        </mask>
        <g mask="url(#historical-chart-mask)">
          <rect
            fill="url(#historical-chart-mask-gradient)"
            height="200"
            rx="4"
            width="100%"
          />
        </g>
      </svg>
    </section>
  );
};
export default HistoricalTrendChartSkeleton;
