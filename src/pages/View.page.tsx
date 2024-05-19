import { Header } from "../widget";
import { useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { InfoIcon } from "../icons";
import { Button, Card } from "@nextui-org/react";

export const ViewPage = () => {
  const [searchParams] = useSearchParams();
  const videoUrl = searchParams.get("videoUrl");
  console.log(videoUrl);
  return <>
    <Header />
    <section className={"container mx-auto px-4 flex flex-col gap-6"}>
      {videoUrl && <div className={"overflow-hidden rounded-2xl max-w-[600px]"}>
        <ReactPlayer
          // ref={playerRef}
          // light
          pip
          controls
          height={"100%"}
          width={"100%"}
          url={videoUrl} />
      </div>}
      <Button
        className={"bg-ElectricViolet text-white text-[16px] font-bold w-full"}
      >
        Запустить проверку
      </Button>
      <Card className={"bg-ShuttleGray text-Nero flex flex-row flex-nowrap justify-between items-start gap-3 p-5"}>
        <div className={"flex flex-col gap-3"}>
          <div className={"text-[13px]"}>
            Дополнительная информация
          </div>
          <div className={"text-[12px]"}>
            Данное видео было помечено автором в категорию “для детей”. После нажатия кнопки нейросеть сама (в режиме
            реального времени)
            проверит ролик и выдаст заключение ниже.
          </div>
        </div>
        <div className={"p-1"}>
          <InfoIcon />
        </div>
      </Card>
    </section>
  </>;
};