
<script setup lang="ts">
import { setup } from "mockjs";
import { type } from "os";
import { sendMsgAPI, chat35WithPrompt, chatStramChat } from "@/api/chat";
import { ref, reactive, onMounted, nextTick, watchEffect, toRefs } from "vue";
import { useRoute } from "vue-router";
import { useBasicStore } from "@/store/basic";
import cancelRequest from "@/utils/axios-req";
import axios from "axios";
import Highlight from "vue3-highlightjs";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/default.css";

hljs.registerLanguage("javascript", javascript);

const update = getCurrentInstance();

let messages = reactive({
  messagesData: [
    {
      sender: "",
      text: "",
      avatar: "",
      fromMe: false,
    },
  ],
});
let { messagesData } = toRefs(messages);
messagesData.value.length = 0;
const chatBox = ref<HTMLElement | null>(null);

// 改变服务名下拉框的值
const changeSelectValue = (e) => {
  console.log(e);
};
const selectValue = ref("GPT-3.5");
// 定义一级下拉框数据
const options = reactive([
  {
    value: "GPT-3.5",
    label: "GPT-3.5",
  },
  {
    value: "GPT-4.0",
    label: "GPT-4.0",
  },
]);
let retryText = ref("Regenerate response");

onBeforeMount(() => {
  getInitData();
  nextTick(() => {
    chatBox.value.scrollTop = chatBox.value?.scrollHeight;
  });
});

onMounted(() => {
  nextTick(() => {
    chatBox.value.scrollTop = chatBox.value?.scrollHeight;
  });
});

//获取初始化数据
const getInitData = () => {
  pushMessageBeforeMounted(
    "GPT",
    "欢迎来到AI聊天室。因为此服务为付费服务，请大家仅应用于辅助工作，节约公司成本。同时为了确保公司信息的安全和保密，请勿将敏感信息往该服务发送。"
  );
};

let prompt_list = [
  {
    question: "",
    answer: "",
  },
];
prompt_list.length = 0;

const savedMessages = sessionStorage.getItem("messages");
if (savedMessages) {
  messages = JSON.parse(savedMessages);
}
let newMessage = ref("");
const pushMessageBeforeMounted = (isMe: string, text: string) => {
  if (text.length <= 0) {
    return;
  }
  const savedMessages = sessionStorage.getItem("messages");
  if (savedMessages) {
    messages = JSON.parse(savedMessages);
  }
  if (messagesData.value.length == 0) {
    messagesData.value.push({
      sender: "GPT",
      text: text,
      avatar:
        "http://bj.oss.qiyi.storage/oven-pizza/37/98/142559866027750769.png",
      fromMe: false,
    });
    sessionStorage.setItem("messages", JSON.stringify(messages));
  }
};

const pushMessage = (isMe: string, text: string) => {
  if (text.length <= 0) {
    return;
  }
  if (text == "sf") {
    text = "";
  }
  const savedMessages = sessionStorage.getItem("messages");
  if (savedMessages) {
    messages = JSON.parse(savedMessages);
  }
  if (isMe == "Me") {
    messagesData.value.push({
      sender: "Me",
      text: text,
      avatar:
        "http://bj.oss.qiyi.storage/oven-pizza/97/42/142623281972014173.png",
      fromMe: true,
    });
  } else {
    messagesData.value.push({
      sender: "GPT",
      text: text,
      avatar:
        "http://bj.oss.qiyi.storage/oven-pizza/37/98/142559866027750769.png",
      fromMe: false,
    });
  }

  sessionStorage.setItem("messages", JSON.stringify(messages));
};

const pushPromptList = (question: string, answer: string) => {
  const savedpromptList = sessionStorage.getItem("prompt_list");
  if (savedpromptList) {
    prompt_list = JSON.parse(savedpromptList);
  }
  prompt_list.push({
    question: question,
    answer: answer,
  });
  sessionStorage.setItem("prompt_list", JSON.stringify(prompt_list));
};

const getMessages = () => {
  const savedMessages = sessionStorage.getItem("messages");
  if (savedMessages) {
    messages = JSON.parse(savedMessages);
  }
};
const getPromptList = (n: number) => {
  const savedpromptList = sessionStorage.getItem("prompt_list");
  if (savedpromptList) {
    prompt_list = JSON.parse(savedpromptList);
  }
  if (n < prompt_list.length) {
    return prompt_list.slice(prompt_list.length - n, prompt_list.length);
  } else {
    return prompt_list.slice(0, prompt_list.length);
  }
};
let chatStramWithParam = reactive({});

// button 按钮
const sendMessage = () => {
  let question = newMessage.value;
  newMessage.value = "";
  console.info("selectValue:", selectValue.value);
  sendMessageMethod(question, true, selectValue.value);
};

const handleKeyCode = (event) => {
  if (event.keyCode == 13 && event.shiftKey) {
    event.preventDefault();
    // 手动换行
    newMessage.value += "\n";
  } else if (event.keyCode == 13) {
    if (!event.metaKey) {
      event.preventDefault();
      sendMessage();
    }
  }
};
let eventSource = null;

const retryClick = () => {
  if (retryText.value == "Stop generating") {
    cancalClick();
    if (eventSource != null) {
      eventSource.close();
    }
    hideLoading();
  } else if (retryText.value == "Regenerate response") {
    if (messagesData.value.length == 1) {
      elMessage("请先输入你的问题哦", "error");
      return;
    }
    if (eventSource != null) {
      eventSource.close();
    }
    if (messagesData.value[messagesData.value.length - 1].sender == "GPT") {
      let lastSecondMassage = messagesData.value[messagesData.value.length - 2];
      messagesData.value.pop();
      update!.proxy!.$forceUpdate();
      let question = lastSecondMassage.text;
      let answer = "";
      sessionStorage.setItem("messages", JSON.stringify(messages));
      sendMessageMethod(question, false, selectValue.value);
    } else if (
      messagesData.value[messagesData.value.length - 1].sender == "Me"
    ) {
      let lastSecondMassage = messagesData.value[messagesData.value.length - 1];
      update!.proxy!.$forceUpdate();
      let question = lastSecondMassage.text;
      let answer = "";
      sessionStorage.setItem("messages", JSON.stringify(messages));
      sendMessageMethod(question, false, selectValue.value);
    } else {
      return;
    }
  }
};

function showLoading() {
  const loading = document.querySelector(".loading");
  const inputField = document.querySelector(".input-field");
  const sendbutton = document.querySelector(".send-button");
  sendbutton.style.display = "none";
  loading.style.display = "block";
  inputField.disabled = true;
  retryText.value = "Stop generating";
}

// 在loading完成后调用该函数
function hideLoading() {
  const loading = document.querySelector(".loading");
  const inputField = document.querySelector(".input-field");
  const sendbutton = document.querySelector(".send-button");
  sendbutton.style.display = "block";
  loading.style.display = "none";
  inputField.disabled = false;
  inputField.focus();
  retryText.value = "Regenerate response";
}

const cancalClick = (message) => {
  useBasicStore().cancalUrl("/api/gpt/chat35_with_prompt", message);
};
let retryCount = 0;
const maxRetryCount = 3;
function sendMessageMethod(message, isPushMe, gpt_type) {
  if (message.length <= 0) {
    elMessage("不能发送空消息哦", "error");
    return;
  }
  if (gpt_type === "GPT-3.5" && message.length > 3000) {
    elMessage("超过字数限制，请输入3k字符以内~", "error");
    return;
  }
  if (gpt_type === "GPT-4.0" && message.length > 24000) {
    elMessage("超过字数限制，请输入24k字符以内~", "error");
    return;
  }
  let question = message;
  let answer = "";
  const promptArray = getPromptList(6);
  if (isPushMe) {
    pushMessage("Me", question);
  }
  update!.proxy!.$forceUpdate();
  showLoading();
  let timeout = setTimeout(() => {
    cancalClick("timeout");
  }, 360000);
  if (gpt_type == "GPT-3.5") {
    showLoading();
    chatStramWithParam = {
      access_token: "w4OYIXJpWGE35",
      service_name: "test",
      question: question,
      model: "maven-gpt-35-turbo",
      answer_count: 1,
      stream: true,
      prompt_list: promptArray,
    };
    chatStramChat(chatStramWithParam)
      .then(({ code, msg, data }) => {
        clearTimeout(timeout);
        handleCode(code, msg);
        let url = `http://opengpt.online.qiyi.qae/api/completions/stream/response?id=`;
        // let url = `http://localhost:8082/api/completions/stream/response?id=`
        eventSource = new EventSource(url + data);
        startEventStream(url, eventSource, question, answer, data);

        nextTick(() => {
          chatBox.value.scrollTop = chatBox.value?.scrollHeight;
        });
      })
      .catch((error) => {
        hideLoading();
        handleError(error);
      })
      .finally(() => {
        clearTimeout(timeout);
        update!.proxy!.$forceUpdate();
        nextTick(() => {
          chatBox.value.scrollTop = chatBox.value?.scrollHeight;
        });
      });
    nextTick(() => {
      chatBox.value.scrollTop = chatBox.value?.scrollHeight;
    });
  } else if (gpt_type == "GPT-4.0") {
    showLoading();
    chatStramWithParam = {
      access_token: "w4OYIXJpWGE35",
      service_name: "test",
      question: question,
      model: "gpt-4",
      answer_count: 1,
      stream: true,
      referer: "GPT4",
      prompt_list: promptArray,
    };
    chatStramChat(chatStramWithParam)
      .then(({ code, msg, data }) => {
        clearTimeout(timeout);
        handleCode(code, msg);
        let url = `http://opengpt.online.qiyi.qae/api/completions/stream/response?id=`;
        // let url = `http://localhost:8082/api/completions/stream/response?id=`
        eventSource = new EventSource(url + data);
        startEventStream(url, eventSource, question, answer, data);

        nextTick(() => {
          chatBox.value.scrollTop = chatBox.value?.scrollHeight;
        });
      })
      .catch((error) => {
        hideLoading();
        handleError(error);
      })
      .finally(() => {
        clearTimeout(timeout);
        update!.proxy!.$forceUpdate();
        nextTick(() => {
          chatBox.value.scrollTop = chatBox.value?.scrollHeight;
        });
      });
    nextTick(() => {
      chatBox.value.scrollTop = chatBox.value?.scrollHeight;
    });
  }
}

const eventTimeoutDuration = 12000; // 设置超时时间为 12 秒
let timeoutId;

const eventResetTimeout = (eventSource) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    eventSource.close();
    pushMessage(
      "GPT",
      '<a style="color:red">很抱歉，由于微软的资源不足，您的请求暂时无法处理。请尝试点击下方的 "Regenerate response" 重试，感谢您的理解与耐心等待。</a>'
    );
    hideLoading();
    nextTick(() => {
      chatBox.value.scrollTop = chatBox.value?.scrollHeight;
    });
  }, eventTimeoutDuration);
};

// 处理SSE事件流的函数
function startEventStream(url, eventSource, question, answer, data) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    if (retryCount < maxRetryCount) {
      retryCount++;
      eventSource.close(); // 关闭当前的EventSource对象
      eventSource = new EventSource(url + data);
      startEventStream(url, eventSource, question, answer, data);
    } else {
      eventSource.close(); // 关闭当前的EventSource对象
      pushMessage(
        "GPT",
        '<a style="color:red">很抱歉，由于微软的资源不足，您的请求暂时无法处理。请尝试点击下方的 "Regenerate response" 重试，感谢您的理解与耐心等待。</a>'
      );
      hideLoading();
      nextTick(() => {
        chatBox.value.scrollTop = chatBox.value?.scrollHeight;
      });
    }
  }, eventTimeoutDuration);
  let flag = 0;
  eventSource.addEventListener("message", (event) => {
    retryCount = 0; // 重置计数器
    eventResetTimeout(eventSource);
    retryCount = 0;
    if (event.type === "message") {
      showLoading();
      if (flag == 0) {
        pushMessage("GPT", "sf");
        flag = 1;
      }
      console.log(event.data);
      if (event.data == "data: [DONE]") {
        clearTimeout(timeoutId);
        answer = messagesData.value[messagesData.value.length - 1].text;
        pushPromptList(question, answer);
        eventSource.close();
        hideLoading();
      } else if (event.data.indexOf("{") != -1) {
        let content;
        const startIndex = event.data.indexOf("{");
        const parsedData = JSON.parse(event.data.substring(startIndex));
        const model = parsedData.model;
        if (model == undefined) {
          pushMessage(
            "GPT",
            '<a style="color:red">很抱歉，由于微软的资源不足，您的请求暂时无法处理。请尝试点击下方的 "Regenerate response" 重试，感谢您的理解与耐心等待。</a>'
          );
          eventSource.close();
          hideLoading();
          nextTick(() => {
            chatBox.value.scrollTop = chatBox.value?.scrollHeight;
          });
        } else if (model == "gpt-4" || model == "gpt-4-32k") {
          content = parsedData.choices[0].delta.content;
        } else if (model == "gpt-35-turbo" || model == "maven-gpt-35-turbo") {
          content = parsedData.choices[0].text;
        } else if (model == "erine") {
          content = parsedData.result;
        }
        if (content != undefined) {
          messagesData.value[messagesData.value.length - 1].text += content; // 将每个字符逐字添加到 message 字符串中
          nextTick(() => {
            chatBox.value.scrollTop = chatBox.value?.scrollHeight;
          });
        }
      }
    }
  });

  eventSource.addEventListener("error", (event) => {
    clearTimeout(timeoutId);
    if (messagesData.value[messagesData.value.length - 1].sender == "GPT") {
      messagesData.value[messagesData.value.length - 1].text +=
        `\n` + ` <a style="color:red;font=8">Network Error</a>`;
    } else {
      pushMessage(
        "GPT",
        '<a style="color:red">很抱歉，由于微软的资源不足，您的请求暂时无法处理。请尝试点击下方的 "Regenerate response" 重试，感谢您的理解与耐心等待。</a>'
      );
    }
    eventSource.close();
    hideLoading();
    nextTick(() => {
      chatBox.value.scrollTop = chatBox.value?.scrollHeight;
    });
  });
}

const decorateData = (data) => {
  let answer = data[0];
  const codeBlocks = answer.match(/```([a-z]*)\n([\s\S]*?)```/g) || [];
  let highlightedText = answer;
  for (let block of codeBlocks) {
    const language = "javascript";
    const code = block.replace(/```([a-z]*)\n```/, "").trim();
    const highlightedCode = hljs.highlight(code, { language }).value;
    answer = answer.replace(
      block,
      `<pre><code class="hljs ${language}">${highlightedCode}</code></pre>`
    );
  }
  return answer;
};

const handleError = (error) => {
  console.log(error);
  if (axios.isCancel(error)) {
    if (error.message != undefined && error.message.includes("timeout")) {
      pushMessage(
        "GPT",
        "很抱歉，我当前处理量有些大，导致响应超时，请您稍等片刻再尝试哦！"
      );
    } else {
      pushMessage("GPT", "还有什么能帮助到您呢，上个问题的回答您已经取消了");
    }
  } else if (error.message != undefined && error.message.includes("timeout")) {
    pushMessage(
      "GPT",
      "很抱歉，我当前处理量有些大，导致响应超时，请您稍等片刻再尝试哦！"
    );
  } else {
    pushMessage("GPT", "抱歉，我现在有点忙，请您稍等...");
  }
};

// 处理请求的状态码
const handleCode = (code, msg) => {
  if (code != 0) {
    if (code == 1002) {
      pushMessage("GPT", "请求已超过每分钟处理上限，请您稍等片刻再尝试哦！");
    } else if (code == 1003) {
      pushMessage("GPT", "今天的请求已经达到了处理上限，请您明天再来哦！");
    } else if (code == 1004) {
      pushMessage(
        "GPT",
        "很抱歉，我当前处理量有些大，导致响应超时，请您稍等片刻再尝试哦！"
      );
    } else if (code == 1005) {
      pushMessage("GPT", "字数过多啦！请您缩减到4096以内token后发送哦！");
    } else {
      if (msg != undefined) {
        pushMessage("GPT", msg);
      } else {
        pushMessage("GPT", "抱歉，我现在有点忙，请您稍等...");
      }
    }
  }
};
</script>