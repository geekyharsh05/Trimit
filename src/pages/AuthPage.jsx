/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UrlState } from "@/contexts/UrlContext";
import SignUpUsingGithub from "@/components/OAuth/SignUpUsingGithub";
import SignUpUsingGoogle from "@/components/OAuth/SignUpUsingGoogle";

const AuthPage = () => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="mt-20 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {searchParams.get("createNew")
          ? "Hold up! Let's login first..."
          : "Login / Signup"}
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
        <div className="my-3 flex items-center px-3">
          <hr className="w-full border-slate-600" />
          <span className="mx-3 text-slate-500">or</span>
          <hr className="w-full border-slate-600" />
        </div>
      </Tabs>
      <div className="flex items-center gap-2">
        <SignUpUsingGithub />
        <SignUpUsingGoogle />
      </div>
    </div>
  );
};

export default AuthPage;
