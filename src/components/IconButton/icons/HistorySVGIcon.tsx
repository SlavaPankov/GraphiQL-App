import { SVGProps } from 'react';

export function HistorySVGIcon({
  stroke = 'currentColor',
  strokeWidth = '1.5',
  strokeLinecap = 'square',
}: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      height="1em"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.59375 9.52344L4.87259 12.9944L8.07872 9.41249"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
      />
      <path
        d="M13.75 5.25V10.75H18.75"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
      />
      <path
        d="M4.95427 11.9332C4.55457 10.0629 4.74441 8.11477 5.49765 6.35686C6.25089 4.59894 7.5305 3.11772 9.16034 2.11709C10.7902 1.11647 12.6901 0.645626 14.5986 0.769388C16.5071 0.893151 18.3303 1.60543 19.8172 2.80818C21.3042 4.01093 22.3818 5.64501 22.9017 7.48548C23.4216 9.32595 23.3582 11.2823 22.7203 13.0853C22.0824 14.8883 20.9013 16.4492 19.3396 17.5532C17.778 18.6572 15.9125 19.25 14 19.25"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
