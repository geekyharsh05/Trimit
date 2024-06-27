import { signUpWithGoogle } from "@/db/apiAuth";
import Google from "../Icons/Google";

const SignUpWithGoogleButton = () => {
  const handleSignUp = async () => {
    try {
      await signUpWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <button
      onClick={handleSignUp}
      type="button"
      className="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400 "
    >
      <Google />
      Sign in with Google
    </button>
  );
};

const SignUpUsingGoogle = () => {
  return (
    <div className="App flex flex-col items-center mt-[-30px]">
      <SignUpWithGoogleButton />
    </div>
  );
};

export default SignUpUsingGoogle;
