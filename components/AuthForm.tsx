"use client";
import Image from "next/image";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import { AuthFormSchema } from "@/lib/schemas/AuthFormSchema";
import CustomInput from "./CustomInput";
import { Button } from "./ui/button";
const AuthForm = ({ type }: AuthFormProps) => {
  const [user, setUser] = useState(null);
  const form = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof AuthFormSchema>) => {
    console.log(data);
  };
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image src="/icons/logo.svg" width={34} height={34} alt="Logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:txt-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign in" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/**Plaid Link */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CustomInput
                control={form.control}
                placeholder="Enter your email"
                label="Email"
                name="email"
              />
              <CustomInput
                control={form.control}
                placeholder="Enter your password"
                name="password"
                label="Password"
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </>
      )}
    </section>
  );
};

export default AuthForm;
