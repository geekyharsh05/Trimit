/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { z } from "zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { login } from "@/db/apiAuth";
import useFetch from "@/hooks/useFetch";
import { UrlState } from "@/contexts/UrlContext";
import LoginFormView from "./LoginFormView";

const LoginForm = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("#");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { loading, error, fn: fnLogin, data } = useFetch(login, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      fetchUser();
      toast.success("Logged In Successfully");
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    } else if (error) {
      toast.error("Error Logging In");
    }
  }, [error, data]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = z.object({
        email: z.string().email("Invalid email"),
        password: z
          .string()
          .min(6, "Password must be at least of 6 characters"),
      });

      schema.parse(formData);
      await fnLogin();
    } catch (e) {
      const newErrors = {};
      if (e.errors) {
        e.errors.forEach((err) => {
          newErrors[err.path] = err.message;
        });
      }
      setErrors(newErrors);
      toast.error("Some fields are invalid, Please check!");
    }
  };

  return (
    <LoginFormView
      formData={formData}
      handleInputChange={handleInputChange}
      handleLogin={handleLogin}
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
      errors={errors}
      loading={loading}
    />
  );
};

export default LoginForm;
