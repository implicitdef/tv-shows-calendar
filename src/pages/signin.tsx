import { useState } from "react";
import { Layout } from "../components/Layout";

const EmailForm = ({ onSignin }: { onSignin: (email: string) => void }) => {
  const [email, setEmail] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSignin(email);
      }}
    >
      <label>
        Your email :
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">OK</button>
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
