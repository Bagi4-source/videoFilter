import { Card, CardFooter, CardHeader, Image, Link, User } from "@nextui-org/react";
import { EyeIcon } from "../icons";

export interface IVideoCardProps {
  views: number;
  channelName: string;
  channelLogo: string;
  preview: string;
  link: string;
}

function stringifyNumber(value: number): string {
  if (value < 1000) return value.toString();
  if (value < 1000000) return (value / 1000).toFixed(1) + "K";
  if (value < 1000000000) return (value / 1000000).toFixed(1) + "M";
  return (value / 1000000000).toFixed(1) + "B";
}


export const VideoCard = ({ views, preview, channelLogo, channelName, link }: IVideoCardProps) => {
  return <Link href={link} target={"_blank"}>
    <Card className={"w-[160px] h-[284px] flex-shrink-0 font-MTSCompact relative"}>
      <CardHeader className="absolute z-20 top-1 flex-col !items-start">
        <div className="text-tiny text-Nero uppercase font-medium flex flex-row flex-nowrap gap-1">
          <EyeIcon />
          {stringifyNumber(views)}
        </div>
      </CardHeader>
      <div className={"bg-gradient-to-t from-[#181818] h-1/3 w-full absolute bottom-0 z-10"} />
      <div className={"bg-gradient-to-b from-[#181818] h-1/3 w-full absolute top-0 z-10"} />
      <Image
        width={160}
        height={284}
        removeWrapper
        alt="video preview"
        className={"z-0 w-full h-full object-cover shadow-[inset_0_0_15px_10px_rgba(0,0,0,1)]"}
        src={preview}
      />
      <CardFooter className="absolute z-20 bottom-1 flex-col !items-start">
        <User
          name={channelName}
          avatarProps={{
            src: channelLogo,
            size: "sm",
          }}
          classNames={{
            name: "text-tiny text-Nero font-medium text-ellipsis overflow-hidden",
          }}
        />
      </CardFooter>
    </Card>
  </Link>;
};