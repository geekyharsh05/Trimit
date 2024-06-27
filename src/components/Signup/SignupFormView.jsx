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
import { BeatLoader } from "react-spinners";
import Error from "../Error";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

const SignupFormView = ({
  formData,
  handleInputChange,
  handleSignup,
  errors,
  loading,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFileInputClick = () => {
    document.getElementById("profile_pic_input").click();
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-center">
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven&rsquo;t already
        </CardDescription>
        {errors.api && <Error message={errors.api} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleInputChange}
            className="bg-transparent border rounded-lg py-3 px-4 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
          />
          {errors.name && <Error message={errors.name} />}
        </div>
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-transparent border rounded-lg py-3 px-4 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
          />
        </div>
        {errors.email && <Error message={errors.email} />}

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

        <div className="space-y-1">
          <input
            id="profile_pic_input"
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            style={{ display: "none" }}
          />
          <Button
            onClick={handleFileInputClick}
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800"
          >
            Choose Profile Picture
          </Button>
          {formData.profile_pic && (
            <div className="mt-2 flex items-center justify-center">
              <img
                src={URL.createObjectURL(formData.profile_pic)}
                alt="Profile Preview"
                className="w-16 h-16 rounded-full object-cover mr-2"
              />
              <span>{formData.profile_pic.name}</span>
            </div>
          )}
        </div>
        {errors.profile_pic && <Error message={errors.profile_pic} />}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? (
            <BeatLoader size={10} color="#36d7b7" />
          ) : (
            "Create Account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignupFormView;
