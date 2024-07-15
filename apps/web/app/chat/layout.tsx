import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Search } from "lucide-react";
import { getUsers } from "../../actions/user";

export default async ({ children }: { children: React.ReactNode }) => {
  const users = await getUsers();
  return (
    <div className="flex h-screen">
      <div className="basis-1/4  p-5 border-r border-accent">
        <div className="flex bg-card gap-2">
          <Input type="search " />
          <div className="grid place-items-center bg-primary px-3 rounded-lg">
            <Search className="text-card" />
          </div>
        </div>
        <div className="flex flex-col my-5 border border-accent rounded-lg ">
          {users.length === 0 ? (
            "Loading ..."
          ) : (
            <div className="flex items-center gap-3 w-full p-3 ">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="w-full">
                <div className="font-medium flex justify-between">
                  <h1>Acme Inc</h1>
                  <p className="text-sm font-normal text-white/50">7:00 AM</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Hey there! How can I help you?
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="basis-3/4">{children}</div>
    </div>
  );
};
