import { redirect } from "react-router-dom";

export async function AuthRequired() {
  const isLoggedIn = localStorage.getItem("loggedin");
  if (!isLoggedIn) {
    throw redirect("/login?message=you must login first");
  }
}
