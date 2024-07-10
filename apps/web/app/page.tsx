import { Button } from "@repo/ui/components/ui/button";

export default () => {
  return (
    <div className="h-screen w-screen bg-black">
      <h1 className="text-5xl text-red-500">Hello, world!</h1>
      <Button variant="destructive">Hi There</Button>
    </div>
  );
};
