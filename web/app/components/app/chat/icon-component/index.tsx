import type { FC, SVGProps } from "react";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

export const stopIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.00004 0.583313C3.45621 0.583313 0.583374 3.45615 0.583374 6.99998C0.583374 10.5438 3.45621 13.4166 7.00004 13.4166C10.5439 13.4166 13.4167 10.5438 13.4167 6.99998C13.4167 3.45615 10.5439 0.583313 7.00004 0.583313ZM4.73029 4.98515C4.66671 5.10993 4.66671 5.27328 4.66671 5.59998V8.39998C4.66671 8.72668 4.66671 8.89003 4.73029 9.01481C4.78621 9.12457 4.87545 9.21381 4.98521 9.26973C5.10999 9.33331 5.27334 9.33331 5.60004 9.33331H8.40004C8.72674 9.33331 8.89009 9.33331 9.01487 9.26973C9.12463 9.21381 9.21387 9.12457 9.2698 9.01481C9.33337 8.89003 9.33337 8.72668 9.33337 8.39998V5.59998C9.33337 5.27328 9.33337 5.10993 9.2698 4.98515C9.21387 4.87539 9.12463 4.78615 9.01487 4.73023C8.89009 4.66665 8.72674 4.66665 8.40004 4.66665H5.60004C5.27334 4.66665 5.10999 4.66665 4.98521 4.73023C4.87545 4.78615 4.78621 4.87539 4.73029 4.98515Z"
      fill="#667085"
    />
  </svg>
);

export const OpeningStatementIcon = ({ className }: SVGProps<SVGElement>) => (
  <svg
    className={className}
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.25002 1C3.62667 1 1.50002 3.12665 1.50002 5.75C1.50002 6.28 1.58702 6.79071 1.7479 7.26801C1.7762 7.35196 1.79285 7.40164 1.80368 7.43828L1.80722 7.45061L1.80535 7.45452C1.79249 7.48102 1.77339 7.51661 1.73766 7.58274L0.911727 9.11152C0.860537 9.20622 0.807123 9.30503 0.770392 9.39095C0.733879 9.47635 0.674738 9.63304 0.703838 9.81878C0.737949 10.0365 0.866092 10.2282 1.05423 10.343C1.21474 10.4409 1.38213 10.4461 1.475 10.4451C1.56844 10.444 1.68015 10.4324 1.78723 10.4213L4.36472 10.1549C4.406 10.1506 4.42758 10.1484 4.44339 10.1472L4.44542 10.147L4.45161 10.1492C4.47103 10.1562 4.49738 10.1663 4.54285 10.1838C5.07332 10.3882 5.64921 10.5 6.25002 10.5C8.87338 10.5 11 8.37335 11 5.75C11 3.12665 8.87338 1 6.25002 1ZM4.48481 4.29111C5.04844 3.81548 5.7986 3.9552 6.24846 4.47463C6.69831 3.9552 7.43879 3.82048 8.01211 4.29111C8.58544 4.76175 8.6551 5.562 8.21247 6.12453C7.93825 6.47305 7.24997 7.10957 6.76594 7.54348C6.58814 7.70286 6.49924 7.78255 6.39255 7.81466C6.30103 7.84221 6.19589 7.84221 6.10436 7.81466C5.99767 7.78255 5.90878 7.70286 5.73098 7.54348C5.24694 7.10957 4.55867 6.47305 4.28444 6.12453C3.84182 5.562 3.92117 4.76675 4.48481 4.29111Z"
      fill="#667085"
    />
  </svg>
);

export const RatingIcon: FC<{ isLike: boolean }> = ({ isLike }) => {
  return isLike ? (
    <HandThumbUpIcon className="w-4 h-4" />
  ) : (
    <HandThumbDownIcon className="w-4 h-4" />
  );
};

export const EditIcon = ({ className }: SVGProps<SVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14 11.9998L13.3332 12.7292C12.9796 13.1159 12.5001 13.3332 12.0001 13.3332C11.5001 13.3332 11.0205 13.1159 10.6669 12.7292C10.3128 12.3432 9.83332 12.1265 9.33345 12.1265C8.83359 12.1265 8.35409 12.3432 7.99998 12.7292M2 13.3332H3.11636C3.44248 13.3332 3.60554 13.3332 3.75899 13.2963C3.89504 13.2637 4.0251 13.2098 4.1444 13.1367C4.27895 13.0542 4.39425 12.9389 4.62486 12.7083L13 4.33316C13.5523 3.78087 13.5523 2.88544 13 2.33316C12.4477 1.78087 11.5523 1.78087 11 2.33316L2.62484 10.7083C2.39424 10.9389 2.27894 11.0542 2.19648 11.1888C2.12338 11.3081 2.0695 11.4381 2.03684 11.5742C2 11.7276 2 11.8907 2 12.2168V13.3332Z"
        stroke="#6B7280"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EditIconSolid = ({ className }: SVGProps<SVGElement>) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8374 8.63108C11.0412 8.81739 11.0554 9.13366 10.8691 9.33747L10.369 9.88449C10.0142 10.2725 9.52293 10.5001 9.00011 10.5001C8.47746 10.5001 7.98634 10.2727 7.63157 9.8849C7.45561 9.69325 7.22747 9.59515 7.00014 9.59515C6.77271 9.59515 6.54446 9.69335 6.36846 9.88517C6.18177 10.0886 5.86548 10.1023 5.66201 9.91556C5.45853 9.72888 5.44493 9.41259 5.63161 9.20911C5.98678 8.82201 6.47777 8.59515 7.00014 8.59515C7.52251 8.59515 8.0135 8.82201 8.36867 9.20911L8.36924 9.20974C8.54486 9.4018 8.77291 9.50012 9.00011 9.50012C9.2273 9.50012 9.45533 9.40182 9.63095 9.20979L10.131 8.66276C10.3173 8.45895 10.6336 8.44476 10.8374 8.63108Z"
        fill="#6B7280"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.89651 1.39656C8.50599 0.787085 9.49414 0.787084 10.1036 1.39656C10.7131 2.00604 10.7131 2.99419 10.1036 3.60367L3.82225 9.88504C3.81235 9.89494 3.80254 9.90476 3.79281 9.91451C3.64909 10.0585 3.52237 10.1855 3.3696 10.2791C3.23539 10.3613 3.08907 10.4219 2.93602 10.4587C2.7618 10.5005 2.58242 10.5003 2.37897 10.5001C2.3652 10.5001 2.35132 10.5001 2.33732 10.5001H1.50005C1.22391 10.5001 1.00005 10.2763 1.00005 10.0001V9.16286C1.00005 9.14886 1.00004 9.13497 1.00003 9.1212C0.999836 8.91776 0.999669 8.73838 1.0415 8.56416C1.07824 8.4111 1.13885 8.26479 1.22109 8.13058C1.31471 7.97781 1.44166 7.85109 1.58566 7.70736C1.5954 7.69764 1.60523 7.68783 1.61513 7.67793L7.89651 1.39656Z"
        fill="#6B7280"
      />
    </svg>
  );
};

export const TryToAskIcon = (
  <svg
    width="11"
    height="10"
    viewBox="0 0 11 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.88889 0.683718C5.827 0.522805 5.67241 0.416626 5.5 0.416626C5.3276 0.416626 5.173 0.522805 5.11111 0.683718L4.27279 2.86334C4.14762 3.18877 4.10829 3.28255 4.05449 3.35821C4.00051 3.43413 3.93418 3.50047 3.85826 3.55445C3.78259 3.60825 3.68881 3.64758 3.36338 3.77275L1.18376 4.61106C1.02285 4.67295 0.916668 4.82755 0.916668 4.99996C0.916668 5.17236 1.02285 5.32696 1.18376 5.38885L3.36338 6.22717C3.68881 6.35234 3.78259 6.39167 3.85826 6.44547C3.93418 6.49945 4.00051 6.56578 4.05449 6.6417C4.10829 6.71737 4.14762 6.81115 4.27279 7.13658L5.11111 9.3162C5.173 9.47711 5.3276 9.58329 5.5 9.58329C5.67241 9.58329 5.82701 9.47711 5.8889 9.3162L6.72721 7.13658C6.85238 6.81115 6.89171 6.71737 6.94551 6.6417C6.99949 6.56578 7.06583 6.49945 7.14175 6.44547C7.21741 6.39167 7.31119 6.35234 7.63662 6.22717L9.81624 5.38885C9.97715 5.32696 10.0833 5.17236 10.0833 4.99996C10.0833 4.82755 9.97715 4.67295 9.81624 4.61106L7.63662 3.77275C7.31119 3.64758 7.21741 3.60825 7.14175 3.55445C7.06583 3.50047 6.99949 3.43413 6.94551 3.35821C6.89171 3.28255 6.85238 3.18877 6.72721 2.86334L5.88889 0.683718Z"
      fill="#667085"
    />
  </svg>
);
