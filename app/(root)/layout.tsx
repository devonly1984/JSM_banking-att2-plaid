import LeftSidebar from "@/components/LeftSidebar";
import MobileNavBar from "@/components/MobileNavBar";
import Image from "next/image";
import { ReactNode } from "react"

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const loggedIn = {
    firstName: "Bill",
    lastName: 'White'
  }
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

export default RootLayout