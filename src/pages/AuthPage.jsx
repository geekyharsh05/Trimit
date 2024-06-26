import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UrlState } from "@/contexts/UrlContext";

const AuthPage = () => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      </Tabs>
    </div>
  );
};

export default AuthPage;
