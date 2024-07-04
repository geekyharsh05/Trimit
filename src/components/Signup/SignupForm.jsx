/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { z } from "zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { signup } from "@/db/apiAuth";
import useFetch from "@/hooks/useFetch";
import SignupFormView from "./SignupFormView";

const SignupForm = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
    if (files) {
      toast.success("Profile picture added successfully");
    }
  };

  const handleRemovePicture = () => {
    setFormData((prevState) => ({
      ...prevState,
      profile_pic: null,
    }));
    toast.success("Profile picture removed successfully");
  };

  const { loading, error, fn: fnSignup, data } = useFetch(signup, formData);

  useEffect(() => {
    if (error === null && data) {
      toast.success("Account created successfully");
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    } else if (error) {
      toast.error("Error creating account");
    }
  }, [error, data]);

  const handleSignup = async () => {
    setErrors({});
    try {
      const schema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email").min(1, "Email is required"),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters")
          .min(1, "Password is required"),
        profile_pic: z.any().refine((file) => file instanceof File, {
          message: "Profile picture is required",
        }),
      });

      schema.parse(formData);
      await fnSignup();
    } catch (error) {
      const newErrors = {};
      if (error.errors) {
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        toast.error("Some fields are invalid, Please check!");
        setErrors(newErrors);
      } else {
        setErrors({ api: error.message });
        toast.error("Some fields are invalid, Please check!");
      }
    }
  };

  return (
    <SignupFormView
      formData={formData}
      handleInputChange={handleInputChange}
      handleRemovePicture={handleRemovePicture}
      handleSignup={handleSignup}
      errors={errors}
      loading={loading}
    />
  );
};

export default SignupForm;
