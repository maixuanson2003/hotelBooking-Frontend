"use client";
import { useState, useRef, useEffect } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { accesToken } from "@/app/APi/ApiAuthen";
import {
  GetsConversation,
  GetsConversationByGroupId,
} from "@/app/APi/ApiConversation";
import { sendMessage } from "@/app/APi/ApiChat";
interface chatinfor {
  userSender: string;
  userRceive: string;
  content: string;
  messageid: number;
}
interface Conversation {
  id: number;
  nameUserRecevive: string;
  chatinfors: chatinfor[];
}
export default function ChatboxWithToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [stompClient, setStompClient] = useState<any>();
  const [render, setReRender] = useState<any>(0);
  const [coversation, setConversation] = useState<Conversation>({
    id: 0,
    nameUserRecevive: "",
    chatinfors: [],
  });
  const [messages, setMessages] = useState<any[]>([]);
  const [messageSend, setMessageSend] = useState<string>(" ");
  const chatRef = useRef(null);
  useEffect(() => {
    const fetchData2 = async (id: number) => {
      if (id) {
        const responseData = await GetsConversationByGroupId(id);
        console.log(responseData.id);
        setMessages(responseData.chatinfors);
      }
    };

    const fetchData = async () => {
      const data = await GetsConversation();
      if (data) {
        setConversation(data[0]);
        connectWebSocket(data[0].id);
        fetchData2(data[0].id);
      }
    };
    fetchData();
  }, []);

  const sendMessages = async () => {
    if (stompClient && stompClient.connected && messageSend) {
      console.log(coversation.id);

      const dataSend = {
        userSender: localStorage.getItem("username"),
        userRceive: coversation.nameUserRecevive,
        content: messageSend,
        conversationId: coversation.id,
      };
      const datas = await sendMessage(dataSend);
      console.log(datas);
      stompClient.send(
        `/app/realtime/Conversation/${coversation.id}`,
        {},
        JSON.stringify(datas)
      );
      setMessageSend("");
      setReRender(render + 1);
    } else {
      console.error("STOMP client not connected or no message to send");
    }
  };
  useEffect(() => {
    const fetchData = async (id: number) => {
      if (id) {
        const responseData = await GetsConversationByGroupId(id);
        console.log(responseData.id);
        setMessages(responseData.chatinfors);
      }
    };
    fetchData(coversation.id);
  }, [render]);

  const connectWebSocket = (id: number) => {
    const client = Stomp.over(
      () => new SockJS("http://localhost:8080/realtime")
    );
    client.connect(
      {},
      (frame: any) => {
        client.subscribe(`/Topic/Conversation/${id}`, (msg) => {
          console.log(msg);
          setMessages((prevMessages) => [
            ...prevMessages,
            JSON.parse(msg.body),
          ]);
        });
        setStompClient(client);
        return () => {
          if (stompClient) {
            stompClient.disconnect();
          }
        };
      },
      (error: any) => {
        console.error("STOMP connection error:", error);
      }
    );
  };

  const toggleChatbox = async () => {
    const token = await accesToken();
    if (!token) {
      window.location.href = "/AuthFO/signIn";
    }

    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {/* Toggle Button */}
      <button
        onClick={toggleChatbox}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div
          ref={chatRef}
          className="w-full max-w-md mx-auto mt-4 bg-white border rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex flex-col p-4 space-y-4 h-[400px] overflow-y-scroll bg-gray-100">
            {messages.map((message, index) => (
              <div key={index} className={`flex `}>
                <div className={`p-2 rounded-lg max-w-xs text-sm`}>
                  <small className="text-xs text-gray-500">
                    {message.content}
                  </small>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center p-4 bg-white border-t">
            <input
              type="text"
              value={messageSend}
              onChange={(e) => setMessageSend(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              onClick={() => sendMessages()}
              className="ml-4 p-2 bg-blue-500 text-white rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
