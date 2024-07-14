"use client";
import { Button } from "@repo/ui/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@repo/ui/components/ui/collapsible";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@repo/ui/components/ui/avatar";
import { Textarea } from "@repo/ui/components/ui/textarea";

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="hidden w-64 border-r bg-muted/40 md:block">
        <div className="flex h-14 items-center justify-between border-b px-4">
          <div className="font-semibold">Contacts</div>
          <Button variant="ghost" size="icon">
            <PlusIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          <Collapsible className="border-b">
            <CollapsibleTrigger className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-muted">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Acme Inc</div>
                  <div className="text-sm text-muted-foreground">
                    Hey there! How can I help you?
                    {children}
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                <time dateTime="2023-07-14">Jul 14</time>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid gap-3 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-muted-foreground">
                      Hey there! How can I help you?
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Jane Smith</div>
                    <div className="text-sm text-muted-foreground">
                      Hey there! How can I help you?
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Bob Johnson</div>
                    <div className="text-sm text-muted-foreground">
                      Hey there! How can I help you?
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible className="border-b">
            <CollapsibleTrigger className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-muted">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Acme Inc</div>
                  <div className="text-sm text-muted-foreground">
                    Hey there! How can I help you?
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                <time dateTime="2023-07-14">Jul 14</time>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid gap-3 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-muted-foreground">
                      Hey there! How can I help you?
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Jane Smith</div>
                    <div className="text-sm text-muted-foreground">
                      Hey there! How can I help you?
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Bob Johnson</div>
                    <div className="text-sm text-muted-foreground">
                      Hey there! How can I help you?
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Acme Inc</div>
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
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
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
                  Great, let's go over the details. I'll share my screen so we
                  can discuss the project plan.
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
            <Button
              type="submit"
              size="icon"
              className="absolute top-3 right-3"
            >
              <SendIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MoveHorizontalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function PaperclipIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
