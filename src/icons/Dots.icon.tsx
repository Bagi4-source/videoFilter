import { SVGProps } from "react";

export const DotsIcon = (props: SVGProps<SVGSVGElement>) => {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd"
          d="M12.75 9.25C12.0596 9.25 11.5 8.69036 11.5 8C11.5 7.30964 12.0596 6.75 12.75 6.75C13.4404 6.75 14 7.30964 14 8C14 8.69036 13.4404 9.25 12.75 9.25ZM3.25 9.25C2.55964 9.25 2 8.69036 2 8C2 7.30964 2.55964 6.75 3.25 6.75C3.94036 6.75 4.5 7.30964 4.5 8C4.5 8.69036 3.94036 9.25 3.25 9.25ZM6.75 8C6.75 8.69036 7.30964 9.25 8 9.25C8.69036 9.25 9.25 8.69036 9.25 8C9.25 7.30964 8.69036 6.75 8 6.75C7.30964 6.75 6.75 7.30964 6.75 8Z"
          fill="white" />
  </svg>;
};