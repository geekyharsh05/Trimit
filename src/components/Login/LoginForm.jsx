/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { login } from "@/db/apiAuth";
import useFetch from "@/hooks/useFetch";
import { UrlState } from "@/contexts/UrlContext";
import LoginFormView from "./LoginFormView";

const LoginForm = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

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
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnLogin();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
      toast.error("Some fields are invalid. Please check.");
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
