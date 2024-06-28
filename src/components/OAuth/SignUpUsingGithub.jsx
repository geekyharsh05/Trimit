import { signUpWithGithub } from "@/db/apiAuth";
import Github from "../Icons/Github";

const SignUpWithGithubButton = () => {
  const handleSignUp = async () => {
    try {
      await signUpWithGithub();
    } catch (error) {
      console.error("Error signing in with GitHub:", error.message);
    }
  };

  return (
    <button
      onClick={handleSignUp}
      type="button"
      className="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400 sm:w-auto"
    >
      <Github />
      Sign in with Github
    </button>
  );
};

const SignUpUsingGithub = () => {
  return (
    <div className="App flex flex-col items-center mt-[-30px]">
      <SignUpWithGithubButton />
    </div>
  );
};

export default SignUpUsingGithub;
