import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import {
  LOCAL_STORAGE_EMAIL,
  onEmailConfirmSubmit,
  onSigninSubmit,
  tryToSignIfComingFromLink,
} from "../client.auth";
import { EmailForm } from "../components/meta/EmailForm";
import { SigninFailed } from "../components/meta/SigninFailed";

export function Page() {
  const [signinResult, setSigninResult] = useState<
    "success" | "needEmailConfirmation" | "error" | "notASigninLink" | null
  >(null);

  useEffect(() => {
    async function maybeSignin() {
      const res = await tryToSignIfComingFromLink();
      setSigninResult(res);
    }
    maybeSignin();
  }, []);

  return (
    <Layout>
      {signinResult === "needEmailConfirmation" && (
        <EmailForm onSubmit={onEmailConfirmSubmit} type="confirm_email" />
      )}
      {signinResult === "error" && <SigninFailed />}
    </Layout>
  );
}

export default Page;
