import { Metadata } from "next";
import { getSessionFromCookie } from "@/utils/auth";
import SignUpClientComponent from "./sign-up.client";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

const SignUpPage = async () => {
  const session = await getSessionFromCookie();

  if (session) {
    return redirect('/');
  }

  return <SignUpClientComponent />
}

export default SignUpPage;
