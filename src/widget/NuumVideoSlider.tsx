import { ScrollShadow } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { IFeedData, List } from "../types/Feed.type.ts";
import { VideoCard } from "../components";

export const NuumVideoSlider = () => {
  const [videos, setVideos] = useState<List[]>([]);

  useEffect(() => {
    axios.get<IFeedData>("https://nuum.ru/api/v2/main/clips/feed", {
      params: {
        "category": "all",
        "limit": 20,
        "offset": Math.ceil(Math.random() * 100),
      },
    }).then((response) => {
      setVideos(response.data.result.list ?? []);
    });
  }, []);
  return <section className={"container mx-auto px-4 py-4"}>
    <h2 className={"font-black text-[20px]"}>Клипы</h2>
    <ScrollShadow
      hideScrollBar
      size={0}
      orientation="horizontal"
      className="my-5"
    >
      <div className={"flex flex-row flex-nowrap gap-4 w-full"}>
        {
          videos.map((video, index) => <VideoCard
            channelLogo={video.media_container_channel.channel_image.small ?? ""}
            channelName={video.media_container_channel.channel_name ?? ""}
            preview={video.media_container_streams[0].stream_media[0].media_meta.media_preview_archive_images.small ?? ""}
            views={video.media_container_streams[0].stream_total_viewers ?? 0}
            link={"https://nuum.ru/clips/" + video.media_container_id}
            key={index} />)
        }
      </div>
    </ScrollShadow>
  </section>;
};