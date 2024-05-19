import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Gauge } from "../components";
import cn from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import axios from "axios";

export const CheckModal = ({ link, disclosure }: { link: string; disclosure: UseDisclosureReturn }) => {
  const { isOpen, onOpenChange } = disclosure;
  const [videoSafeResult, setVideoSafeResult] = useState(0);

  useEffect(() => {
    checkVideo().then();
  }, []);

  const handleCheck = async (images: string[]) => {
    const t = new Date().valueOf();
    axios.post<{ safe: number }[]>("/checkImages", {
      images,
    })
      .then((response) => {
        console.log("Success checked. Time: ", new Date().valueOf() - t, "ms");
        const len = response.data.length;
        if (len === 0) return setVideoSafeResult(0);

        const sum = response.data.reduce((acc: number, item) => {
          return acc + item.safe * 100;
        }, 0);
        const res = sum / response.data.length;
        if (res >= 90) return setVideoSafeResult(Math.ceil(res));
        setVideoSafeResult(Math.max(0, Math.ceil(res / 3)));
      });
  };

  async function captureVideoFrame(videoUrl: string) {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const results: string[] = [];
    const times = [0];

    video.src = videoUrl;
    video.crossOrigin = "anonymous";

    video.addEventListener("loadeddata", function() {
      const duration = video.duration;
      times.push(duration / 3);
      times.push(duration / 2);
      times.push(2 * duration / 3);
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      captureNextFrame();
    });

    function captureNextFrame() {
      if (times.length === 0) {
        handleCheck(results);
        video.remove();
        canvas.remove();
        return;
      }
      const time = times.shift();
      if (time === undefined) return;
      video.currentTime = time;
    }

    video.addEventListener("seeked", function() {
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      results.push(canvas.toDataURL("image/png"));
      captureNextFrame();
    });
  }

  const navigate = useNavigate();

  const cavVisitVideo = useMemo(() => {
    return videoSafeResult >= 90;
  }, [videoSafeResult]);

  const checkVideo = useCallback(async () => {
    await captureVideoFrame(link);
  }, [link]);

  return <Modal
    isOpen={isOpen}
    backdrop={"blur"}
    onOpenChange={onOpenChange}
    className={"bg-CodGray"}
  >
    <ModalContent className={"p-2"}>
      {() => (
        <>
          <ModalHeader className={"font-black text-[20px]"}>
            Результат
          </ModalHeader>
          <ModalBody className={"flex flex-col gap-2 items-center"}>
            <div className={"text-[14px] w-full"}>Насколько видео безопасно для детей?</div>
            <div className={"w-full -translate-x-1"}>
              <Gauge value={videoSafeResult} />
            </div>
            <div className={"text-[18px] font-medium"}>Дата последней проверки</div>
            <div className={"text-[16px]"}>19 мая 2024 года в 02:24</div>
          </ModalBody>
          <ModalFooter className={"flex flex-col gap-2 items-center"}>
            <div className={cn("text-center text-[8px] h-6 text-Warning", cavVisitVideo && "!text-green-500")}>
              {
                cavVisitVideo ? "Данный материал полностью безопасен для просмотра." : "Данный материал может содержать нежелательный контент, сцены физического насилия и прочее."
              }
            </div>
            <Button
              disabled={!cavVisitVideo}
              className={cn("bg-ElectricViolet text-white text-[16px] font-bold w-full", !cavVisitVideo && "bg-Warning")}
              onClick={() => {
                navigate(`/videoFilter/view/?videoUrl=${encodeURIComponent(link)}`);
              }}>
              {cavVisitVideo ? "Перейти к видео" : "Небезопасно"}
            </Button>
            <Button
              className={"bg-none text-white text-[16px] font-bold w-full"}
              variant="light"
              onPress={checkVideo}>
              Перепроверить
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>;
};