"use client";
import { User } from "@prisma/client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import { Textarea } from "@repo/ui/components/ui/textarea";
import {
  SearchIcon,
  PaperclipIcon,
  MoveHorizontalIcon,
  SendIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getUserById } from "../../../actions/user";

export default ({ params }: { params: { userId: string } }) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    gets();
  }, []);

  const gets = async () => {
    try {
      setUser((await getUserById(params.userId)) as User);
    } catch (e) {
      toast("User not found or invaild ID");
    }
    setLoading(false);
  };

  return (
    <div className="flex-1 border border-red-100">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>{user?.name.toUpperCase()[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user?.name}</div>
            <div className="text-sm text-muted-foreground">
              Last seen 2 hours ago
            </div>
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
      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="rounded-lg bg-muted p-4 text-sm">
              <p>Hey there! How can I help you today?</p>
              <div className="mt-2 text-xs text-muted-foreground">
                <time dateTime="2023-07-14">Jul 14, 2:30 PM</time>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-end">
            <div className="rounded-lg bg-primary p-4 text-sm text-primary-foreground">
              <p>I'm looking to discuss a new project we're working on.</p>
              <div className="mt-2 text-xs text-muted-foreground">
                <time dateTime="2023-07-14">Jul 14, 2:32 PM</time>
              </div>
            </div>
            <Avatar className="h-10 w-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="rounded-lg bg-muted p-4 text-sm">
              <p>Sure, I'd be happy to discuss the project with you.</p>
              <div className="mt-2 text-xs text-muted-foreground">
                <time dateTime="2023-07-14">Jul 14, 2:34 PM</time>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-end">
            <div className="rounded-lg bg-primary p-4 text-sm text-primary-foreground">
              <p>
                Great, let's go over the details. I'll share my screen so we can
                discuss the project plan.
              </p>
              <div className="mt-2 text-xs text-muted-foreground">
                <time dateTime="2023-07-14">Jul 14, 2:36 PM</time>
              </div>
            </div>
            <Avatar className="h-10 w-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <div className="border-t p-4">
        <div className="relative">
          <Textarea
            placeholder="Type your message..."
            className="min-h-[48px] w-full rounded-2xl resize-none border border-neutral-400 shadow-sm pr-16"
          />
          <Button type="submit" size="icon" className="absolute top-3 right-3">
            <SendIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
