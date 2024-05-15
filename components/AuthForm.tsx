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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";
const AuthForm = ({ type }: AuthFormProps) => {
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const formSchema = AuthFormSchema(type);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setisLoading(true);
    try {
      //sign up with app-write & create plaid token
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password!
        };
        const newUser = await signUp(userData);
        setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
    
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
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      placeholder="Enter your First Name"
                      label="First Name"
                      name="firstName"
                    />
                    <CustomInput
                      control={form.control}
                      placeholder="Enter your Last Name"
                      name="lastName"
                      label="Last Name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    placeholder="Enter your Address"
                    name="address1"
                    label="Address"
                  />

                  <CustomInput
                    control={form.control}
                    placeholder="Enter your City"
                    name="city"
                    label="City"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      placeholder="ex: NY"
                      name="state"
                      label="State"
                    />

                    <CustomInput
                      control={form.control}
                      placeholder="ex: 11101"
                      name="postalCode"
                      label="Zip Code"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      placeholder="Date of Birth ex: YYYY-MM-DD "
                      name="dateOfBirth"
                      label="Date of Birth"
                    />
                    <CustomInput
                      control={form.control}
                      placeholder="ex: 1234"
                      name="ssn"
                      label="SSN"
                    />
                  </div>
                </>
              )}
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
              <div className="flex flex-col gap-4">
                <Button disabled={isLoading} type="submit" className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
