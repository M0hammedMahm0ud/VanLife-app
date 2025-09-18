import { redirect } from "react-router-dom";

export async function AuthRequired(request) {
  const isLoggedIn = localStorage.getItem("loggedin");
  const pathname = new URL(request.url).pathname;

  if (!isLoggedIn) {
    throw redirect(
      `/login?message=you must login first&&redirectTo=${pathname}`
    );
  }
}
