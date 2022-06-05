import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { onSigninSubmit } from "../client.auth";

const EmailForm = ({
  onSubmit,
}: {
  onSubmit: (email: string) => Promise<void>;
}) => {
  const [email, setEmail] = useState("");
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  return (
    <form
      className="email-form"
      onSubmit={async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setDisplaySuccess(false);
        try {
          await onSubmit(email);
          setDisplaySuccess(true);
        } catch (e) {
          if (e instanceof FirebaseError && e.code === "auth/invalid-email") {
            setErrorMessage("Invalid email");
          } else {
            console.error(e);
            setErrorMessage("Something went wrong, sorry");
          }
        }
      }}
    >
      <h1>Sign up / sign in</h1>
      <div>
        <input
          value={email}
          placeholder="Your email here"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">OK</button>
      </div>
      {displaySuccess && (
        <p className="email-form__success">
          Email sent ! Click the link you received.
        </p>
      )}
      {errorMessage && <p className="email-form__error"> {errorMessage}</p>}
      <p>
        No password needed. We will send you an email with a link. You will have
        to click that link to prove that you own this email adress.
      </p>
    </form>
  );
};

export function Page() {
  return (
    <Layout>
      <EmailForm onSubmit={onSigninSubmit} />
    </Layout>
  );
}

export default Page;
