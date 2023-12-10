import { SVGProps } from 'react';

interface IDocsSVGIconProps extends SVGProps<SVGSVGElement> {
  isActive: boolean;
}

export function DocsSVGIcon({
  fill = 'currentColor',
  stroke = 'currentColor',
  strokeWidth = '1.5',
  isActive,
}: Readonly<IDocsSVGIconProps>) {
  return (
    <svg
      height="1em"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.75 3C0.75 1.75736 1.75736 0.75 3 0.75H17.25C17.8023 0.75 18.25 1.19772 18.25 1.75V5.25"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path
        d="M0.75 3C0.75 4.24264 1.75736 5.25 3 5.25H18.25C18.8023 5.25 19.25 5.69771 19.25 6.25V22.25C19.25 22.8023 18.8023 23.25 18.25 23.25H3C1.75736 23.25 0.75 22.2426 0.75 21V3Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {isActive ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 5.25C1.75736 5.25 0.75 4.24264 0.75 3V21C0.75 22.2426 1.75736 23.25 3 23.25H18.25C18.8023 23.25 19.25 22.8023 19.25 22.25V6.25C19.25 5.69771 18.8023 5.25 18.25 5.25H3ZM13 11L6 11V12.5L13 12.5V11Z"
          fill={fill}
        />
      ) : (
        <line
          x1="13"
          y1="11.75"
          x2="6"
          y2="11.75"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      )}
    </svg>
  );
}

DocsSVGIcon.defaultProps = { isActive: false };
