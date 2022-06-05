import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { NextApiRequest } from "next";

// TODO faire une vraie authentication plutôt qu'un paramètre de query
// Utiliser "https://next-auth.js.org/" pour le mode passwordless
// voir aussi https://nextjs.org/docs/authentication

export const LOCAL_STORAGE_EMAIL = "emailForSignIn";

export function getConnectedUserId(req: NextApiRequest): string {
  const { userId } = req.query;
  if (!userId || typeof userId !== "string") {
    throw new Error("missing user id");
  }
  return userId;
}

// Signin or signup, it's the exact same process
export async function onSigninSubmit(email: string): Promise<void> {
  console.log("@@@ on signin");
  const auth = getAuth();
  console.log("@@@ sendSignInLinkToEmail", email);
  await sendSignInLinkToEmail(auth, email, {
    // The domain has to be authorized in the Firebase Console
    url: `http://${window.location.host}/`,
    handleCodeInApp: true,
  });
  // If the user opens the link on the same device, we won't have to ask for the email again
  window.localStorage.setItem(LOCAL_STORAGE_EMAIL, email);
}
