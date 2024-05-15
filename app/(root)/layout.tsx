import { LeftSidebar, MobileNavBar } from "@/components";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const loggedIn = await getLoggedInUser();
  console.log("Logged In User", loggedIn);
  if (!loggedIn) redirect("/sign-in");
  return (
    <main className="flex h-screen w-full font-inter">
      <LeftSidebar user={loggedIn} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />

          <div className="">
            <MobileNavBar user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
};

export default RootLayout;
