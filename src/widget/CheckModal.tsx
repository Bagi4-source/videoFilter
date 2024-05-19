import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Gauge } from "../components";
import cn from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseDisclosureReturn } from "@nextui-org/use-disclosure";

export const CheckModal = ({ link, disclosure }: { link: string; disclosure: UseDisclosureReturn }) => {
  const { isOpen, onOpenChange } = disclosure;

  useEffect(() => {
    checkVideo();
  }, []);

  const navigate = useNavigate();
  const [videoSafeResult, setVideoSafeResult] = useState(0);

  const cavVisitVideo = useMemo(() => {
    return videoSafeResult >= 90;
  }, [videoSafeResult]);

  const checkVideo = useCallback(() => {
    console.log(link);
    const safeResult = Math.random() * 50 + 50;
    const result = Math.min(Math.ceil(safeResult), 100);
    setVideoSafeResult(result);
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