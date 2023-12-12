import { SVGProps } from 'react';

interface IChevronSVGIconProps extends SVGProps<SVGSVGElement> {
  isActive: boolean;
}

export function ChevronSVGIcon({
  stroke = 'currentColor',
  strokeWidth = '1.5',
  isActive,
}: Readonly<IChevronSVGIconProps>) {
  return (
    <svg
      height="1em"
      viewBox="0 0 14 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d={isActive ? 'M1 1L7 7L13 1' : 'M13 8L7 2L1 8'}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

ChevronSVGIcon.defaultProps = { isActive: false };
