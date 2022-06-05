import { useState } from "react";
import { Layout } from "../components/Layout";

const EmailForm = ({ onSignin }: { onSignin: (email: string) => void }) => {
  const [email, setEmail] = useState("");
  return (
    <form
      className="email-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSignin(email);
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
      <EmailForm onSignin={() => {}} />
    </Layout>
  );
}

export default Page;
