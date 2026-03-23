export type IconProps = {
  width?: number;
  height?: number;
};

export default function LogoTraditional({
  height = 32,
  width = 32,
}: Readonly<IconProps>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 452 452"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_8017_7547)">
        <rect x={76} y={58} width={300} height={300} rx={110} fill="#012340" />
      </g>
      <path
        d="M241.482 159.17h-34.867l92.302 40.895-72.787 32.652L108 179.773l27.321-12.257 100.176 44.858 17.954-8.085-100.176-45.119L189.963 143h72.595L344 179.68l-27.864 12.596-74.654-33.106z"
        fill="#29A5F2"
      />
      <path
        d="M335.74 199.383v10.844l-2.452 1.1v-10.844l-7.59 3.403v7.038l-2.452 1.1v-7.038l-7.59 3.402v7.043l-2.452 1.1v-7.043l-7.591 3.402v7.048l-2.451 1.1v-7.052l-7.591 3.402v7.052l-2.451 1.101v-7.057l-7.591 3.402v10.867l-2.451 1.1v-10.871l-7.591 3.402v7.066l-2.451 1.1v-7.065l-7.591 3.402v7.07l-2.451 1.1v-7.07l-7.591 3.402v7.075l-2.451 1.1v-7.075l-7.591 3.403v7.079l-2.451 1.1v-7.079l-7.591 3.402v10.894l-2.451 1.1v-10.894l-6.734 3.017-.03.014-.136-.064-117.71-52.517v24.63l117.887 52.829 117.853-52.815v-24.905l-8.258 3.7zm-37.558 24.649l-.136-.06v-.027l.136.064v.028-.005z"
        fill="#D9D9D9"
      />
      <defs>
        <filter
          id="filter0_d_8017_7547"
          x={0}
          y={0}
          width={452}
          height={452}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={18} />
          <feGaussianBlur stdDeviation={38} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_8017_7547"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_8017_7547"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
