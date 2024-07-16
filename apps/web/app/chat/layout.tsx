"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Input } from "@repo/ui/components/ui/input";
import { Search } from "lucide-react";
import { getUsers } from "../../actions/user";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

export default ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>();
  useEffect(() => {
    gets();
  }, []);

  const gets = async () => {
    setUsers(await getUsers());
  };
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
          {users?.length === 0 || !users
            ? "No users found in your contacts"
            : users?.map((user) => {
              return (
                <div
                  className="flex items-center gap-3 w-full p-3 object-none border-b border-accent last:border-none hover:bg-accent cursor-pointer"
                  onClick={() => router.push("/chat/" + user.user_id)}
                >
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={user.profile_img as string} />
                    <AvatarFallback>
                      {user.name.toUpperCase()[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <div className="font-medium flex justify-between">
                      <h1>{user.name}</h1>
                      <p className="text-sm font-normal text-white/50">
                        7:00 AM
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Hey there! How can I help you?
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="basis-3/4 ">{children}</div>
    </div>
  );
};
