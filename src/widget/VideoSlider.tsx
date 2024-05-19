import { ScrollShadow, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { IFeedData, List } from "../types/Feed.type.ts";
import { VideoCard } from "../components";
import { CheckModal } from "./CheckModal.tsx";

export const VideoSlider = () => {
  const disclosure = useDisclosure();
  const [link, setLink] = useState("");
  const [videos, setVideos] = useState<List[]>([]);

  useEffect(() => {
    axios.get<IFeedData>("https://nuum.ru/api/v2/main/clips/feed", {
      params: {
        "category": "all",
        "limit": 12,
        "offset": Math.ceil(Math.random() * 100),
      },
    }).then((response) => {
      setVideos(response.data.result.list ?? []);
    });
  }, []);
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
          videos.map((video, index) => <div
            onClick={() => {
              setLink(video.media_container_streams[0].stream_media[0].media_meta.media_archive_url ?? "");
              disclosure.onOpen();
            }}
            key={index}
          ><VideoCard
            channelLogo={video.media_container_channel.channel_image.small ?? ""}
            channelName={video.media_container_channel.channel_name ?? ""}
            preview={video.media_container_streams[0].stream_media[0].media_meta.media_preview_archive_images.small ?? ""}
            views={video.media_container_streams[0].stream_total_viewers ?? 0}
            link={"https://nuum.ru/clips/" + video.media_container_id}
            key={index} /></div>)
        }
      </div>
    </ScrollShadow>
    <CheckModal link={link} disclosure={disclosure} />
  </section>;
};