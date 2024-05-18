import { SVGProps } from "react";

export const BurgerIcon = (props: SVGProps<SVGSVGElement>) => {
  return <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M0.5 5.5H11.5C11.7761 5.5 12 5.27614 12 5C12 4.72386 11.7761 4.5 11.5 4.5H0.5C0.223858 4.5 0 4.72386 0 5C0 5.27614 0.223858 5.5 0.5 5.5Z"
      fill="white" />
    <path
      d="M0.5 1.5H11.5C11.7761 1.5 12 1.27614 12 1C12 0.723858 11.7761 0.5 11.5 0.5H0.5C0.223858 0.5 0 0.723858 0 1C0 1.27614 0.223858 1.5 0.5 1.5Z"
      fill="white" />
    <path
      d="M0.5 9.5H11.5C11.7761 9.5 12 9.27614 12 9C12 8.72386 11.7761 8.5 11.5 8.5H0.5C0.223858 8.5 0 8.72386 0 9C0 9.27614 0.223858 9.5 0.5 9.5Z"
      fill="white" />
  </svg>;
};