import { ScrollShadow, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { VideoCard } from "../components";
import { CheckModal } from "./CheckModal.tsx";

const items: { preview: string; link: string; views: number }[] = [
  {
    preview: "/videoFilter/public/Preview1.png",
    link: "/videoFilter/public/Video1.mp4",
    views: 130013,
  }, {
    preview: "/videoFilter/public/Preview2.png",
    link: "/videoFilter/public/Video2.mp4",
    views: 42003,
  }, {
    preview: "/videoFilter/public/Preview3.png",
    link: "/videoFilter/public/Video3.mp4",
    views: 2130013,
  }, {
    preview: "/videoFilter/public/Preview4.png",
    link: "/videoFilter/public/Video4.mp4",
    views: 230013,
  },
];

export const VideoSlider = () => {
  const disclosure = useDisclosure();
  const [link, setLink] = useState("");

  return <section className={"container mx-auto px-4 py-4"}>
    <h2 className={"font-black text-[20px]"}>Демо-ролики</h2>
    <ScrollShadow
      hideScrollBar
      size={0}
      orientation="horizontal"
      className="my-5"
    >
      <div className={"flex flex-row flex-nowrap gap-4 w-full"}>
        {
          items.map((video, index) => <div
            className={"cursor-pointer"}
            onClick={() => {
              setLink(video.link);
              disclosure.onOpen();
            }}
            key={index}
          >
            <VideoCard
              channelLogo={"/videoFilter/public/logo.svg"}
              channelName={"ScreenSheriff"}
              preview={video.preview}
              views={video.views}
              key={index} />
          </div>)
        }
      </div>
    </ScrollShadow>
    <CheckModal link={link} disclosure={disclosure} />
  </section>;
};