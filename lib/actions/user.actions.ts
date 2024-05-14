"use server"

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";


const {} = process.env;
export const signUp = async (userData : SignUpParams) => {
    const {email,password,firstName,lastName} = userData;
  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify(newUserAccount);
  } catch (error) {
    console.log(error);
  }
};
export const signIn = async () => {
    try {
        
    } catch (error) {
        console.log(error);
    }
};
export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient();
const user =  await account.get();
return parseStringify(user);
  } catch (error) {
    return null;
  }
};