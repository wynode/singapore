import Head from "next/head";
import Link from "next/link";
import {
  Pagination,
  Card,
  CardBody,
  CardFooter,
  // Image,
  Select,
  SelectItem,
  Input,
  CircularProgress,
  Button,
  Progress,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import ImageCover from "@/public/images/video_cover.png";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { useEffect, useState, useRef } from "react";

const videoProgressOptions = [
  { value: "0", label: "未学习" },
  { value: "1", label: "学习中" },
  { value: "2", label: "已学习" },
];

export default function VideoList() {
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      router.push("/login");
    }
  });
  const router = useRouter();
  const [page, setPage] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [total, setTotal] = useState(0);
  const [row, setRow] = useState({});
  const [initialTime, setInitialTime] = useState("");
  const [progress, setProgress] = useState("");
  const [originProgress, setOriginProgress] = useState("");
  const [videoProgress, setVideoProgress] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const videoRef = useRef(null);
  // const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    // 监听播放进度
    const handleTimeUpdate = () => {
      const { currentTime, duration } = video;
      setVideoProgress(Math.round((currentTime / duration) * 100));
    };
    if (video) {
      // 设置进度
      videoRef.current.currentTime = initialTime || 0;

      video.addEventListener("timeupdate", handleTimeUpdate);
    }

    if (isOpen === false && initialTime !== "") {
      if (originProgress !== 100) {
        fetch("https://api.luminouscn.com/course/progress/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify({
            student: localStorage.getItem("student_id"),
            course: row.id,
            progress: videoProgress,
          }),
        }).then(() => {
          getList();
        });
      }
    }

    // 清理事件监听器
    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [isOpen, initialTime]);

  const handleSearch = async () => {};

  const getList = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.luminouscn.com/course/?page=${page}&page_size=12&name=${courseName}&progress=${progress}`,
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      const json = await res.json();
      if (res.status === 400 || res.status === 401) {
        router.push("/login");
        return;
      }
      if (json && json.results) {
        setTotal(Math.ceil(json.count / 12));
        setVideoList(json.results);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleProgressChange = (e) => {
    setProgress(e.target.value);
  };
  useEffect(() => {
    getList();
  }, [page]);
  useEffect(() => {
    if (page === 1) {
      getList();
    } else {
      setPage(1);
    }
  }, [courseName, progress, originProgress]);
  return (
    <>
      <Head>
        <title>视频学习 - 星辉出入境服务</title>
      </Head>
      <main className="w-full min-h-[calc(100vh-170px)] flex flex-col items-center px-4 pt-28">
        <div className="max-w-7xl w-full text-gray-300">
          <div className="flex gap-4">
            {/* <Select
              // label="视频类别"
              placeholder="选择视频类别"
              selectionMode="multiple"
              className="max-w-xs"
            >
              {videoType.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select> */}
            <Select
              aria-label="学习进度"
              placeholder="选择学习进度"
              className="max-w-xs"
              onChange={handleProgressChange}
            >
              {videoProgressOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
            <Input
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
              variant="underlined"
              // label="课程名称"
              placeholder="输入课程名称"
            />
            <Button
              onClick={handleSearch}
              isLoading={isLoading}
              radius="full"
              className="bg-gradient-to-tr from-stone-400 to-slate-500 text-white shadow-lg"
            >
              查询
            </Button>
          </div>
          {isLoading ? (
            <div className="w-full h-60 flex justify-center items-center">
              <CircularProgress
                size="lg"
                color="secondary"
                aria-label="Loading..."
              />
            </div>
          ) : (
            <div className="gap-10 grid grid-cols-2 sm:grid-cols-4 my-10">
              {videoList.map((item, index) => (
                <Card
                  shadow="sm"
                  key={index}
                  isPressable
                  onPress={() => {
                    setRow(item);
                    setInitialTime(
                      Math.floor((item.seconds * item.progress) / 100)
                    );
                    setOriginProgress(item.progress);
                    onOpen();
                  }}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt="视频"
                      className="w-full object-cover h-[140px]"
                      src={ImageCover}
                    />
                  </CardBody>

                  <CardFooter className="flex-col text-small justify-between">
                    <h2>{item.name}</h2>
                    <Progress
                      aria-label="Downloading..."
                      size="md"
                      value={item.progress}
                      color="success"
                      showValueLabel={true}
                      className="max-w-md"
                    />
                    {/* <p className="text-default-500">{item.description}</p> */}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* <Button onPress={onOpen}>Open Modal</Button> */}
          {total ? (
            <Pagination
              page={page}
              total={total}
              className="flex justify-center"
              onChange={(newPage) => {
                setPage(newPage);
              }}
              classNames={{
                wrapper:
                  "gap-0 overflow-visible h-8 rounded border border-divider",
                item: "w-8 h-8 text-small rounded-none bg-transparent",
                cursor:
                  "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
              }}
            />
          ) : (
            ""
          )}
        </div>

        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          size="4xl"
          onOpenChange={onOpenChange}
          classNames={{
            backdrop:
              "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {row.name}
                </ModalHeader>
                <ModalBody>
                  <video
                    id="myVideo"
                    ref={videoRef}
                    className="w-full max-h-[calc(100vh-400px)]"
                    controls
                    src={row.url}
                  ></video>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    关闭
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </main>
    </>
  );
}
