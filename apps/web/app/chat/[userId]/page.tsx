"use client";
import { Message, User } from "@prisma/client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { Textarea } from "@repo/ui/components/ui/textarea";
import {
  SearchIcon,
  PaperclipIcon,
  MoveHorizontalIcon,
  CheckCheck,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getUserById } from "../../../actions/user";
import { useSession } from "next-auth/react";
import { getMessages } from "../../../actions/message";

export default ({ params }: { params: { userId: string } }) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const chatbox = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User>();
  const session = useSession();
  const messageInput = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<Message[]>();
  const [socket, setSocket] = useState<WebSocket>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session.status == "authenticated") {
      const ws = new WebSocket("ws://localhost:8080");
      setSocket(ws);
      setLoading(true);
      gets();

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: "connection",
            payload: {
              email: session.data?.user?.email,
              user_id: session.data?.user?.user_id,
            },
          }),
        );
        ws.send(
          JSON.stringify({
            type: "peer connection",
            connected_to: params.userId,
          }),
        );
      };
      ws.onmessage = (msg) => {
        try {
          const data = JSON.parse(msg.data);
          if (data.type == "message" && data.sender_id == params.userId) {
            gets();
          }
        } catch (err) {
          toast("Invalid message received");
        }
      };
    }
    return () => {
      socket?.close();
    };
  }, [session]);

  useEffect(() => {
    if (chatbox.current) {
      chatbox.current.scrollTop = chatbox.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (session.status == "authenticated" && socket) {
      window.onkeydown = (e) => {
        if (e.key == "Enter") {
          sendMessage();
        }
      };
    }
    return () => {
      window.removeEventListener("keydown", () => { });
    };
  }, [session, socket]);

  const sendMessage = async () => {
    if (!socket) {
      // Debug statement (Remove later)
      toast("Socket not connected");
      return;
    }
    if (messageInput.current?.value.length == 0) {
      return;
    }
    socket.send(
      JSON.stringify({
        type: "message",
        sender_id: session.data?.user.user_id,
        receiver_id: params.userId,
        payload: {
          message: messageInput.current?.value,
        },
      }),
    );
    messageInput.current?.focus();
    messageInput.current!.value = "";
    // TODO: find a better solution for this
    gets();
  };

  const gets = async () => {
    try {
      setMessages(await getMessages(params.userId));
      setUser((await getUserById(params.userId)) as User);
    } catch (e) {
      toast("User not found or invaild ID");
    }
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex h-16 py-2 items-center justify-between border-b px-4">
        <div className="flex items-center gap-3">
          {loading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : (
            <Avatar className="h-10 w-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>{user?.name.toUpperCase()[0]}</AvatarFallback>
            </Avatar>
          )}
          <div>
            {loading ? (
              <Skeleton className="h-6 w-20 rounded-full mb-1" />
            ) : (
              <div className="font-medium">{user?.name}</div>
            )}
            {loading ? (
              <Skeleton className="h-4 w-32 rounded-full" />
            ) : (
              <div className="text-sm text-muted-foreground">
                Last seen 2 hours ago
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <SearchIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <PaperclipIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoveHorizontalIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div
        className="grow overflow-auto flex flex-col p-5 gap-3"
        style={{
          background: `
radial-gradient(circle, hsl(var(--accent)) 10%, transparent 10%) center/ 20px 20px
`,
        }}
        ref={chatbox}
      >
        {loading ? (
          <>
            <div className="flex-col bg-accent w-fit max-w-2xl p-3 rounded-b-3xl rounded-tr-3xl flex gap-2 relative ml-5">
              <Skeleton className=" w-60 h-20 flex flex-col gap-2">
                <Skeleton className="h-4 w-20 bg-primary/50" />
                <Skeleton className="h-4 w-40 bg-primary/50" />
                <Skeleton className="h-4 w-10 bg-primary/50" />
                <Skeleton className="h-4 w-50 bg-primary/50" />
                <div className="  flex items-center justify-between gap-2">
                  <Skeleton className="h-2 w-10 bg-primary/70" />
                  <CheckCheck size={20} className="text-white/50" />
                </div>
              </Skeleton>
            </div>
          </>
        ) : (
          messages?.map((msg) => {
            if (msg.sender_id !== session.data?.user.user_id) {
              return (
                <div className="flex-col bg-accent w-fit max-w-2xl p-3 rounded-b-3xl rounded-tr-3xl flex gap-2 relative ml-5">
                  <div className="border-b-transparent border-r-[15px] border-b-[15px] border-r-accent h-0 w-0 absolute top-0 left-[-15px]" />
                  <p className="">{msg.message}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-white/50 text-sm">
                      {formatter.format(msg.created_at)}
                    </p>
                    <CheckCheck size={20} className="text-white/50" />
                  </div>
                </div>
              );
            } else {
              return (
                <div className="flex-col bg-primary self-end text-card w-fit max-w-2xl p-3 rounded-b-3xl rounded-tl-3xl flex gap-2 relative mr-5">
                  <div className="border-b-transparent border-l-[15px] border-b-[15px] border-l-primary h-0 w-0 absolute top-0 right-[-15px]" />
                  <p className="">{msg.message}</p>
                  <div className="flex flex-row-reverse items-center gap-5 justify-between">
                    <p className="text-card/50 text-sm">
                      {formatter.format(msg.created_at)}
                    </p>
                    <CheckCheck size={20} className="text-card/50" />
                  </div>
                </div>
              );
            }
          })
        )}
      </div>
      <div className="border-t p-4 flex gap-3">
        <Textarea
          placeholder="Type your message..."
          ref={messageInput}
          className="max-h-[48px] h-fit  rounded-2xl resize-none border border-neutral-400 shadow-sm pr-16 grow"
        />
        <Button className="rounded-xl self-end">
          <Send />
        </Button>
      </div>
    </div>
  );
};
