import Image from "../assets/send.jpg";
import RobotImage from "../assets/robot.png";
// import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Stack,
  Box,
  OutlinedInput,
} from "@mui/material";

import { getSession, getOneChatContent } from "../api/chat";
import { getSingalPrompt } from "../api/prompt";
import styled, { keyframes } from "styled-components";
const MsgType = {
  answer: "answer",
  question: "question",
};

const ChatItem = () => {
  let flag = 0;
  const username = localStorage.getItem("username");

  // const navigate = useNavigate();
  const inputRef = useRef();

  const [onRequest, setOnRequest] = useState(false);
  const [currsorBlinksFlag, setCurrsorBlinksFlag] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [requestError, setRequestError] = useState(false);
  const [requestParams, setRequestParams] = useState(null);
  // 存储会话ID
  const [id, setId] = useState();
  const params = useLocation();
  const chatWrapperRef = useRef();
  // 定义加载动画关键帧
  const pulse = keyframes`
    0% {
      content: '';
    }
    25% {
      content: '.';
    }
    50% {
      content: '..';
    }
    75% {
      content: '...';
    }
    100% {
      content: '';
    }
  `;
  // 定义加载动画组件
  const LoadingDots = styled.span`
    display: inline-block;
    font-size: 24px;
    margin-right: 2px;
    &:after {
      content: "";
      animation: ${pulse} 1s linear infinite;
    }
  `;

  // 定义鼠标闪烁动画关键帧
  const cursor = keyframes`
   0% {
     content: '';
   }

   100% {
     content: '|';
   }
 `;
  // 定义鼠标闪烁动画组件
  const CurrsorBlinks = styled.span`
    font-size: 16px;
    &:after {
      content: "";
      animation: ${cursor} 1s linear infinite;
    }
  `;

  useEffect(() => {
    // 去请求单个 prompt
    getSingalPrompt({
      uid: localStorage.getItem("uid"),
      prompt_id: params.state.item.id,
      service_name: "opencat",
    }).then((res) => {
      console.log(res.data, "49");
      // 修改浏览器标题
      document.title = res.data.data.title;
      setId(res.data.data.id);
      // 获取聊天历史记录
      getOneChatContent({
        uid: localStorage.getItem("uid"),
        prompt_id: res.data.data.id,
        size: 50,
      })
        .then((res) => {
          console.log(res.data, "60");
          let newMessages = [...messages];
          for (const item of res.data.data) {
            newMessages.push({
              type: MsgType.question,
              content: item.question,
            });
            newMessages.push({
              type: MsgType.answer,
              // content: item.answer.replace(/\[|\]|"/g, ""),
              content: JSON.parse(item.answer)[0],
            });
          }

          setMessages(newMessages);
        })
        .catch((err) => {});
    });
  }, []);
  // 自动将聊天记录定位到最后一条
  useEffect(() => {
    chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
  });
  const eventTimeoutDuration = 12000; // 设置超时时间为 12 秒
  let timeoutId = null;
  let eventSource = null;
  let retryCount = 1;
  const maxRetryCount = 3;
  const getAnswer = async (regenerate = false) => {
    if (question.trim() === "") return;
    if (onRequest) return;
    setOnRequest(true);
    setCurrsorBlinksFlag(true);
    setMessages([
      ...messages,
      {
        type: MsgType.question,
        content: question,
      },
      // 首次添加个 null 的答案，这里是为了增加光标闪烁的index (isAnswer && currsorBlinksFlag && index === messages.length - 1)
      {
        type: MsgType.answer,
        content: null,
      },
    ]);
    getSession({
      question: question,
      prompt_list: [],
      uid: localStorage.getItem("uid"),
      prompt_id: id,
    })
      .then((res) => {
        let uid = localStorage.getItem("uid");
        let url = `${process.env.PUBLIC_URL}/prompt/api/chat_stream?chat_id=${res.data.data.chat_id}&stream_id=${res.data.data.stream_id}&uid=${uid}`;
        // let url = `http://prompt-test.online.qiyi.qae/prompt/api/chat_stream?chat_id=${res.data.data.chat_id}&stream_id=${res.data.data.stream_id}&uid=111`;
        eventSource = new EventSource(url);
        startEventStream(url, eventSource, question);
      })
      .catch();
    setRequestError(false);
    setQuestion("");
  };
  // const eventResetTimeout = (eventSource) => {
  //   clearTimeout(timeoutId);
  //   timeoutId = setTimeout(() => {
  //     eventSource.close();
  //     if (flag == 0) {
  //       setMessages([
  //         ...messages,
  //         {
  //           type: MsgType.question,
  //           content: question,
  //         },
  //         {
  //           type: MsgType.answer,
  //           content:
  //             "很抱歉，由于微软的资源不足，您的请求暂时无法处理，请稍候重试",
  //         },
  //       ]);
  //     }
  //   }, eventTimeoutDuration);
  // };
  function startEventStream(url, eventSource, question) {
    let text = "";
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      console.log(retryCount, maxRetryCount, "1111111");
      if (retryCount < maxRetryCount && flag == 0) {
        retryCount++;
        console.log(retryCount, "retryCount");
        eventSource.close(); // 关闭当前的EventSource对象
        eventSource = new EventSource(url);
        startEventStream(url, eventSource, question);
      } else if (retryCount >= maxRetryCount && flag == 0) {
        eventSource.close(); // 关闭当前的EventSource对象
        setMessages([
          ...messages,
          {
            type: MsgType.question,
            content: question,
          },
          {
            type: MsgType.answer,
            content:
              "很抱歉，由于微软的资源不足，您的请求暂时无法处理，请稍候重试",
          },
        ]);
        setOnRequest(false);
        setCurrsorBlinksFlag(false);
      }
    }, eventTimeoutDuration);

    eventSource.addEventListener("message", (event) => {
      setCurrsorBlinksFlag(false);
      // retryCount = 0; // 重置计数器
      // eventResetTimeout(eventSource);
      if (event.type === "message") {
        if (flag == 0) {
          // pushMessage("GPT", "sf");
          flag = 1;
        }
        let content = "";
        if (event.type === "message") {
          if (event.data.includes("{")) {
            const startIndex = event.data.indexOf("{");
            const parsedData = JSON.parse(event.data.substring(startIndex));
            const model = parsedData.model;
            if (model == "gpt-4" || model == "gpt-4-32k") {
              content = parsedData.choices[0].delta.content || "";
            } else if (
              model == "gpt-35-turbo" ||
              model == "maven-gpt-35-turbo"
            ) {
              // content = parsedData.choices[0].delta.content;
              content = parsedData.choices[0].text;
            } else if (model == "erine") {
              content = parsedData.result;
            }
            if (content) {
              text += content;
            }
            // console.log(text, "text");
            if (text != undefined) {
              let test = [
                ...messages,
                {
                  type: MsgType.question,
                  content: question,
                },
              ];
              test.push({
                type: MsgType.answer,
                content: text,
              });
              setMessages(test);
              chatWrapperRef.current.scrollTop =
                chatWrapperRef.current.scrollHeight;
            }
            setInterval(() => {}, 1000);
          } else if (event.data == "[DONE]") {
            clearTimeout(timeoutId);
            eventSource.close();
            console.log("over");
            setOnRequest(false);
            setCurrsorBlinksFlag(false);
          }
        }
      }
    });

    eventSource.addEventListener("error", (event) => {
      clearTimeout(timeoutId);
      if (flag == 0) {
        setMessages([
          ...messages,
          {
            type: MsgType.question,
            content: question,
          },
          {
            type: MsgType.answer,
            content:
              "很抱歉，由于微软的资源不足，您的请求暂时无法处理，请稍候重试",
          },
        ]);
      }
      eventSource.close();
      setOnRequest(false);
      setCurrsorBlinksFlag(false);
    });
  }

  const onKeyUp = (e) => {
    if (e.keyCode === 13 && e.shiftKey) {
      getAnswer();
    }
  };

  const onEnterPress = (e) => {
    getAnswer();
  };

  const onRegenerate = () => {
    getAnswer(true);
  };

  const onSignOut = () => {
    localStorage.removeItem("tkn");
    // navigate("/signin");
  };

  useEffect(() => {
    setTimeout(() => {
      chatWrapperRef.current.addEventListener("MutationObserver", (e) => {
        e.currentTarget.scroll({
          top: e.currentTarget.scrollHeight,
          behavior: "smooth",
        });
      });
    }, 200);
  }, []);

  return (
    <Stack
      alignItems="center"
      justifyContent="flex-end"
      sx={{ height: "100vh", backgroundColor: "#EDEDED" }}
    >
      {/* <Header title="翻译助理" subTitle="二级标题"></Header> */}

      <Box
        ref={chatWrapperRef}
        sx={{
          marginTop: "10px",
          position: "relative",
          height: "100%",
          zIndex: 1,
          maxWidth: "md",
          width: "100%",
          overflowY: "auto",
          paddingBottom: "90px",
          "&::-webkit-scrollbar": {
            width: "0px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "md",
            width: "100%",
            minHeight: "100%",
          }}
        >
          {messages.map((item, index) => {
            const isAnswer = item.type === MsgType.answer;
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  alignSelf: (isAnswer && "flex-start") || "flex-end",
                  margin: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "32px",
                    height: "32px",
                    marginTop: "4px",
                    marginLeft: (!isAnswer && "4px") || 0,
                    marginRight: (isAnswer && "4px") || 0,
                    // borderRadius: '16px',
                    order: (isAnswer && -1) || 1,
                    flexShrink: 0,
                  }}
                >
                  {isAnswer ? (
                    <img
                      src={RobotImage}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    // <RobotIcon sx={{ width: "100%", height: "100%" }} />
                    // <PersonIcon sx={{ width: "100%", height: "100%" }} />
                    <img
                      src={localStorage.getItem("avatar")}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginLeft: (!isAnswer && "32px") || 0,
                    marginRight: (isAnswer && "32px") || 0,
                    padding: 1,
                    bgcolor: (isAnswer && "white") || "#AFE46E",
                    borderRadius: 3,
                    whiteSpace: "pre-line",
                    textOverflow: "auto",
                    wordWrap: "break-word",
                    wordBreak: "break-all",
                    minHeight: "22px",
                  }}
                >
                  {/* {item.content.replace(/\\n/g, "\n")} */}
                  {isAnswer &&
                  currsorBlinksFlag &&
                  index === messages.length - 1 ? (
                    <CurrsorBlinks></CurrsorBlinks>
                  ) : (
                    item.content
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
        {requestError && (
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              // width: '100%',
              left: "50%",
              bottom: "96px",
              transform: "translateX(-50%)",
              padding: 1,
              borderRadius: "4px",
              backgroundColor: "#19c37d",
            }}
            onClick={onRegenerate}
          >
            {"Regenerate response"}
          </Box>
        )}
      </Box>

      <Stack
        position="fixed"
        width="100%"
        bottom={0}
        alignItems="center"
        justifyContent="center"
        bgcolor="white"
        zIndex={3}
      >
        <Box padding={0.5} width="100%" maxWidth="md">
          <div style={{ display: "flex" }}>
            <OutlinedInput
              inputRef={inputRef}
              sx={{
                color: "black",
                width: "95%",
                marginLeft: "5px",
              }}
              autoFocus
              onKeyUp={onKeyUp}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask something..."
              maxRows="5"
              multiline={true}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              {onRequest ? (
                // <CurrsorBlinks></CurrsorBlinks>
                <div style={{ width: "25px" }}>
                  <LoadingDots></LoadingDots>
                </div>
              ) : (
                // <SendOutlinedIcon />
                <button
                  onClick={getAnswer}
                  style={{
                    border: "1px solid white",
                    backgroundColor: "white",
                  }}
                >
                  <img
                    src={Image}
                    alt=""
                    style={{
                      height: "25px",
                      width: "25px",
                      cursor: "pointer",
                    }}
                  />
                </button>
              )}
            </div>
            {/* {!onRequest && (
              <IconButton
                onClick={onEnterPress}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: "8px",
                  transform: "translateY(-50%)",
                }}
              >
                 <SendOutlinedIcon />
                <img src={Image} alt="" style={{height:"30px",width:"30px"}} />
              </IconButton>
            )} */}
          </div>
        </Box>
      </Stack>
      {/* <Footer/> */}
    </Stack>
  );
};

export default ChatItem;
