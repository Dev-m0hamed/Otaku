import AuthForm from "@/components/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth";

function page() {
  return (
    <AuthForm
      type="signIn"
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    />
  );
}

export default page;
