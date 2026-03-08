import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";

function page() {
  return (
    <AuthForm
      type="signUp"
      defaultValues={{ fullName: "", email: "", password: "", avatar: "" }}
      onSubmit={signUp}
    />
  );
}

export default page;
