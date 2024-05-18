"use client"
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { Button } from "./ui/button"
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createLinkToken, exchangePublicToken } from "@/lib/actions/plaid.actions";
import Image from "next/image";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const [token, setToken] = useState('')
    const router = useRouter();
    useEffect(()=>{
        const getLinkToken = async()=>{
          const data = await createLinkToken(user);
          setToken(data?.linkToken)
        }
        getLinkToken();
    },[user])
    const onSuccess = useCallback<PlaidLinkOnSuccess>(
      async (public_token: string) => {
        await exchangePublicToken({
          publicToken: public_token,
          user,
        });
        router.push("/");
      },
      [user]
    );   
    const config: PlaidLinkOptions = {
      token,
      onSuccess,
    };
    const { open, ready } = usePlaidLink(config);
  return (
    <>
      {variant === "primary" ? (
        <Button
          className="plaidlink-primary"
          disabled={!ready}
          onClick={() => open()}
        >
          Connect bank
        </Button>
      ) : variant === "ghost" ? (
        <Button
          variant="ghost"
          className="plaidlink-ghost"
          onClick={() => open()}
        >
          <Image
            src="/icons/connect-bank.svg"
            width={24}
            height={24}
            alt="connect bank"
          />
          <p className="hidden text-[16px] font-semibold text-black-2">
            Connect Bank
          </p>
        </Button>
      ) : (
        <Button className="plaidlink-default" onClick={() => open()}>
          <Image
            src="/icons/connect-bank.svg"
            width={24}
            height={24}
            alt="connect bank"
          />
          <p className="text-[16px] font-semibold text-black-2">Connect Bank</p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
