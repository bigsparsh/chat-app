import Link from "next/link";
import Image from "next/image";
import { Button } from "@repo/ui/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@repo/ui/components/ui/avatar";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <WebcamIcon className="h-6 w-6" />
          <span className="sr-only">Chatter App</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Testimonials
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
          <Link href="/auth/signup">
            <Button variant="outline" className="shrink-0">
              Sign Up
            </Button>
          </Link>
          <Button variant="ghost" className="shrink-0">
            Login
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Connect with friends and family, anytime, anywhere.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Chatter is the ultimate messaging app, with real-time chat,
                    group conversations, and seamless file sharing.
                  </p>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button className="shrink-0">Download App</Button>
                    <Button variant="secondary" className="shrink-0">
                      Learn More
                    </Button>
                    <Button variant="outline" className="shrink-0">
                      Contact Us
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-start rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="border w-10 h-10">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5">
                        <p className="text-sm font-medium leading-none">
                          John Doe
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Software Engineer
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      "Chatter has been a game-changer for staying connected\n
                      with my friends and family. The real-time messaging and\n
                      group chat features make it easy to keep up with\n
                      everyone."
                    </p>
                  </div>
                  <div className="flex flex-col items-start rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="border w-10 h-10">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5">
                        <p className="text-sm font-medium leading-none">
                          Jane Smith
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Marketing Manager
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      "I love how easy it is to share files and photos with my\n
                      team on Chatter. It's made our collaboration so much\n
                      more efficient."
                    </p>
                  </div>
                </div>
              </div>
              <Image
                src="https://picsum.photos/1920/1080"
                width={550}
                height={550}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                alt="Landing"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Powerful features to keep you connected
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Chatter offers a suite of features to make your conversations
                  seamless and engaging.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Real-time Messaging</h3>
                      <p className="text-muted-foreground">
                        Send and receive messages instantly, with no delays.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Group Chats</h3>
                      <p className="text-muted-foreground">
                        Create and participate in group conversations with
                        friends, family, or colleagues.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">File Sharing</h3>
                      <p className="text-muted-foreground">
                        Share photos, videos, documents, and more with your
                        contacts.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <Image
                src="https://picsum.photos/1920/1080"
                width={550}
                height={310}
                alt="Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What our users are saying
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from real people who love using Chatter to stay
                  connected.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-4">
                  <div className="flex flex-col items-start rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="border w-10 h-10">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5">
                        <p className="text-sm font-medium leading-none">
                          John Doe
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Software Engineer
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      "Chatter has been a game-changer for staying connected\n
                      with my friends and family. The real-time messaging and\n
                      group chat features make it easy to keep up with\n
                      everyone."
                    </p>
                  </div>
                  <div className="flex flex-col items-start rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="border w-10 h-10">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5">
                        <p className="text-sm font-medium leading-none">
                          Jane Smith
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Marketing Manager
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      "I love how easy it is to share files and photos with my\n
                      team on Chatter. It's made our collaboration so much\n
                      more efficient."
                    </p>
                  </div>
                </div>
              </div>
              <Image
                src="https://picsum.photos/1920/1080"
                width="550"
                height="310"
                alt="Testimonials"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Chatter App. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Twitter
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Facebook
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Instagram
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function WebcamIcon(props: any) {
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
      <circle cx="12" cy="10" r="8" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
    </svg>
  );
}
