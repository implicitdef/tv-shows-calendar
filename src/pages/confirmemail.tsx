import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { onSigninSubmit } from "../client.auth";
import { EmailForm } from "../components/meta/EmailForm";

export function Page() {
  return (
    <Layout>
      <EmailForm onSubmit={onSigninSubmit} type="confirm_email" />
    </Layout>
  );
}

export default Page;
