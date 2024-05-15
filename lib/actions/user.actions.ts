"use server"

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import { extractCustomerIdFromUrl, parseStringify } from "../utils";
import { createDwollaCustomer } from "./dwolla.actions";


const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;
export const signUp = async ({password,...userData} : SignUpParams) => {
    const { email, firstName, lastName } = userData;
    let newUserAccount;
  try {
    const { account,database } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    if (!newUserAccount) throw new Error('Error creating user');
    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData,
      type: 'personal'

    })
    if (!dwollaCustomerUrl) throw new Error("Error creating dwolla Customer");
      const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);
const newUser = await database.createDocument(
  DATABASE_ID!,
  USER_COLLECTION_ID!,
  ID.unique(),
  {
    ...userData,
    userId: newUserAccount.$id,
    dwollaCustomerId,
    dwollaCustomerUrl,
  }
);
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify(newUser);
  } catch (error) {
    console.log(error);
  }
};
export const signIn = async ({ email, password }:signInProps) => {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    cookies().set("appwrite-session", response.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(response);
  } catch (error) {
    console.log(error);
  }
};
export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient();
const user =  await account.get();
console.log("Action", user);
return parseStringify(user);
  } catch (error) {
    return null;
  }
};
export const logoutAccount =async()=>{
try {
  const {account} = await createSessionClient();
  cookies().delete('appwrite-session');
  await account.deleteSession("current");
} catch (error) {
  return null;
}
}