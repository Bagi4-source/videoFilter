import {
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { CheckIcon, ClipIcon, CopyIcon, InfoIcon, VerifyIcon, WarningIcon } from "../icons";
import { FormEvent, useCallback, useRef, useState } from "react";
import cn from "classnames";
import { Gauge } from "../components";
import axios from "axios";

function validURL(str: string) {
  if (str === "") return true;
  const pattern = new RegExp("^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$", "i"); // fragment locator
  return pattern.test(str);
}

const CheckContent = ({ isInvalid }: { isInvalid: boolean }) => {
  if (!isInvalid) return <div><CheckIcon /></div>;
  return <div className={"flex flex-row flex-nowrap gap-3"}>
    <div className={"text-[14px] text-Warning"}>Ошибка</div>
    <WarningIcon />
  </div>;
};

const Form = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [link, setLink] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const pasteBtnRef = useRef(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const copyFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setLink(text);
      setIsInvalid(!validURL(text));
      setIsFocused(false);
    } catch (err) {
      console.error(err);
      setLink("");
      setIsInvalid(false);
      setIsFocused(false);
    }
  }, []);

  const handleFileChange = async (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || e.currentTarget.files.length === 0) return;

    const file = e.currentTarget.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("YOUR_SERVER_ENDPOINT", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully", response.data);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return <>
    <div className={"flex flex-row flex-nowrap items-center gap-3"}>
      <Button
        onClick={() => {
          if (!inputFileRef.current) return;
          inputFileRef.current.click();
        }}
        size={"lg"}
        isIconOnly
        className={"bg-Nero bg-opacity-10 border-1 border-opacity-10"}
        variant="faded"
        aria-label="Upload file">
        <ClipIcon />
      </Button>
      <Input
        type="file"
        ref={inputFileRef}
        onInput={handleFileChange}
        className={"hidden"} />
      <Input
        size={"lg"}
        variant={"faded"}
        value={link}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={(e) => {
          if (e.relatedTarget && pasteBtnRef.current == e.relatedTarget)
            return;
          setIsFocused(false);
          setIsInvalid(!validURL(link));
        }}
        onValueChange={setLink}
        classNames={{
          input: "invalid:text-white",
          inputWrapper: cn("bg-Nero bg-opacity-10 border-1 border-opacity-10", isInvalid && !isFocused && "border-Warning border-opacity-100"),
        }}
        type="text"
        placeholder="https://"
        endContent={
          isFocused || link === "" ? <Button
            ref={pasteBtnRef}
            onMouseDown={(e) => e.preventDefault()}
            onClick={copyFromClipboard}
            className={"bg-Nero bg-opacity-10 text-[10px] text-Nero font-medium h-auto px-6 py-2"}
            startContent={
              <div>
                <CopyIcon width={12} height={12} />
              </div>
            }>
            Вставка
          </Button> : <CheckContent isInvalid={isInvalid} />
        }
      />
    </div>
    <Button
      disabled={isInvalid || link === ""}
      size={"lg"}
      onClick={() => {
        const valid = validURL(link);
        setIsInvalid(!valid);
        if (valid) onOpen();
      }}
      className={"bg-ElectricViolet text-Nero font-[16px] font-bold disabled:text-SilverChalice disabled:bg-Nero disabled:bg-opacity-10"}
      variant="flat"
      aria-label="Start check">
      Запустить проверку
    </Button>
    <Modal
      isOpen={isOpen}
      backdrop={"blur"}
      onOpenChange={onOpenChange}
      className={"bg-CodGray"}
    >
      <ModalContent className={"p-2"}>
        {(onClose) => (
          <>
            <ModalHeader className={"font-black text-[20px]"}>
              Результат
            </ModalHeader>
            <ModalBody className={"flex flex-col gap-2 items-center"}>
              <div className={"text-[14px] w-full"}>Насколько видео безопасно для детей?</div>
              <div className={"w-full -translate-x-1"}>
                <Gauge value={95} />
              </div>
              <div className={"text-[18px] font-medium"}>Дата последней проверки</div>
              <div className={"text-[16px]"}>19 мая 2024 года в 02:24</div>
            </ModalBody>
            <ModalFooter className={"flex flex-col gap-2 items-center"}>
              <Button className={"bg-ElectricViolet text-white text-[16px] font-bold w-full"} onPress={onClose}>
                Перейти к видео
              </Button>
              <Button className={"bg-none text-white text-[16px] font-bold w-full"} variant="light" onPress={onClose}>
                Перепроверить
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </>;
};

export const FilterForm = () => {
  return <section className={"py-4 px-4 flex flex-col gap-6 container mx-auto"}>
    <Card className={"bg-ShuttleGray text-Nero flex flex-row flex-nowrap items-center gap-6 p-5"}>
      <div className={"p-1"}>
        <InfoIcon />
      </div>
      <div className="text-[12px] text-center w-full">
        Вставьте ссылку в поле ниже или загрузите видео с устройства
      </div>
    </Card>
    <Form />
    <Card className={"bg-Tundora text-Nero flex flex-row flex-nowrap items-center gap-6 p-5"}>
      <div className={"p-1"}>
        <VerifyIcon />
      </div>
      <div className="text-[12px] text-center w-full">
        Также вы можете воспользоваться демонстрационными образцами из разных категорий контента
      </div>
    </Card>
  </section>;
};