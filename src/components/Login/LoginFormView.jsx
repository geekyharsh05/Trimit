/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SyncLoader } from "react-spinners";
import Error from "../Error";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const LoginFormView = ({
  formData,
  handleInputChange,
  handleLogin,
  showPassword,
  togglePasswordVisibility,
  errors,
  loading,
}) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-center">
        <CardTitle>Login</CardTitle>
        <CardDescription>
          To your account if you already have one
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-transparent border rounded-lg py-3 px-4 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
          />
          {errors.email && <Error message={errors.email} />}
        </div>

        <div className="relative space-y-1">
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleInputChange}
            className="bg-transparent border rounded-lg py-3 px-4 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <EyeOffIcon className="mb-2" size={20} />
            ) : (
              <EyeIcon className="mb-2" size={20} />
            )}
          </button>
        </div>
        {errors.password && <Error message={errors.password} />}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          {loading ? <SyncLoader size={10} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginFormView;
