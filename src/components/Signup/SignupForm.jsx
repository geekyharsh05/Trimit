/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { signup } from "@/db/apiAuth";
import useFetch from "@/hooks/useFetch";
import SignupFormView from "./SignupFormView";

const SignupForm = () => {
  let [searchParams] = useSearchParams();
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
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (error) {
      const newErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
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
      handleSignup={handleSignup}
      errors={errors}
      loading={loading}
    />
  );
};

export default SignupForm;
