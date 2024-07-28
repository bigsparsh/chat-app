"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Input } from "@repo/ui/components/ui/input";
import { Search, Plus, ChevronDownIcon } from "lucide-react";
import { getUsers, searchUser } from "../../actions/user";
import { useEffect, useState } from "react";
import { Contact, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/ui/alert-dialog";
import { toast } from "sonner";
import { createContact, getContacts } from "../../actions/contact";
import { useSession } from "next-auth/react";

type ContactExtras = {
  user: User;
  associated_user: User;
};

export default ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const router = useRouter();
  const [contacts, setContacts] = useState<(Contact & ContactExtras)[]>();
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    if (session.status === "authenticated") {
      gets();
    }
  }, [session]);

  const gets = async () => {
    setUsers(await getUsers());
    setContacts(await getContacts());
  };

  const handleContactSearchChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUsers(await searchUser(e.target.value));
  };

  const handleAddContact = async (associated_user_id: string) => {
    await createContact(
      associated_user_id,
      // @ts-ignore
      session.data?.user?.user_id as string,
    );
    gets();
    toast("Contact added successfully");
  };
  return (
    <div className="flex h-screen">
      <div className="basis-1/4 border-r border-accent flex flex-col">
        <div className="flex bg-card gap-2 h-16 items-center px-5 border-b">
          <Input type="search " />
          <div className="grid place-items-center bg-primary p-2 w-fit h-fit rounded-lg">
            <Search className="text-card" size={20} />
          </div>
        </div>
        <div className="flex flex-col  grow">
          {contacts?.length === 0 || !contacts ? (
            <div className="flex py-20 items-center flex-col grow h-1/2 text-primary/50">
              <h1 className="leading-4">Seems like you don't have friends</h1>
              <p>Add some from down below</p>
              <ChevronDownIcon />
            </div>
          ) : (
            contacts?.map((contact) => {
              return (
                <div
                  className="flex items-center gap-3 w-full p-3 object-none border-b border-accent  hover:bg-accent cursor-pointer"
                  onClick={() =>
                    router.push("/chat/" + contact.associated_user.user_id)
                  }
                >
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage
                      src={contact.associated_user.profile_img as string}
                    />
                    <AvatarFallback>
                      {contact.associated_user.name.toUpperCase()[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <div className="font-medium flex justify-between">
                      <h1>{contact.associated_user.name}</h1>
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
            })
          )}
        </div>
        <div className="border-t flex justify-evenly gap-3 items-center p-2 h-16">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost">
                <Plus />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h1 className="text-lg font-semibold mb-3">Add Contacts</h1>
                <Input
                  type="email"
                  placeholder="Search by email"
                  className="w-full"
                  onChange={handleContactSearchChange}
                />
                <div className="space-y-2">
                  {users?.length != 0 ? (
                    users?.map((user) => {
                      if (
                        contacts
                          ?.map((contact) => contact.associated_user.email)
                          .includes(user.email)
                      )
                        return;
                      return (
                        <div key={user.user_id}>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                className="flex items-center gap-3 w-full"
                                variant="ghost"
                              >
                                <Avatar className="h-7 w-7 border">
                                  <AvatarImage
                                    src={user.profile_img as string}
                                  />
                                  <AvatarFallback>
                                    {user.name.toUpperCase()[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="grow">{user.email}</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription></AlertDialogDescription>
                                Do you want to add {user.name} to your contacts?
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>No</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleAddContact(user.user_id)}
                                >
                                  Yes
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      );
                    })
                  ) : (
                    <div className="mt-4">No results found</div>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="basis-3/4 ">{children}</div>
    </div>
  );
};
