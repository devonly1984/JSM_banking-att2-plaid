import Image from "next/image";
import { ReactNode } from "react"

const AuthLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <main className="flex min-h-screen w-full justify-between font-inter">{children}
  <div className="auth-asset">
    <div className="">
      <Image src="/icons/auth-image.svg" alt="auth image" width={500} height={500}/></div></div></main>;
};

export default AuthLayout;