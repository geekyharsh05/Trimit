// import { Input } from "./ui/input";
// import * as Yup from "yup";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Button } from "./ui/button";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { signup } from "@/db/apiAuth";
// import { BeatLoader } from "react-spinners";
// import useFetch from "@/hooks/useFetch";
// import Error from "./Error";
// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { EyeIcon, EyeOffIcon } from "lucide-react";

// const Signup = () => {
//   let [searchParams] = useSearchParams();
//   const longLink = searchParams.get("createNew");

//   const navigate = useNavigate();

//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     profile_pic: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: files ? files[0] : value,
//     }));
//     if (files) {
//       toast.success("Profile picture added successfully");
//     }
//   };

//   const { loading, error, fn: fnSignup, data } = useFetch(signup, formData);

//   useEffect(() => {
//     if (error === null && data) {
//       toast.success("Account created successfully");
//       navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
//     } else if (error) {
//       toast.error("Error creating account");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [error, data]);

//   const handleSignup = async () => {
//     setErrors([]);
//     try {
//       const schema = Yup.object().shape({
//         name: Yup.string().required("Name is required"),
//         email: Yup.string()
//           .email("Invalid email")
//           .required("Email is required"),
//         password: Yup.string()
//           .min(6, "Password must be at least 6 characters")
//           .required("Password is required"),
//         profile_pic: Yup.mixed().required("Profile picture is required"),
//       });

//       await schema.validate(formData, { abortEarly: false });
//       await fnSignup();
//     } catch (error) {
//       const newErrors = {};
//       if (error?.inner) {
//         error.inner.forEach((err) => {
//           newErrors[err.path] = err.message;
//         });
//         toast.error("Some fields are invalid. Please check.");
//         setErrors(newErrors);
//       } else {
//         setErrors({ api: error.message });
//         toast.error("Some fields are invalid. Please check.");
//       }
//     }
//   };

//   const handleFileInputClick = () => {
//     document.getElementById("profile_pic_input").click();
//   };

//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <Card>
//       <CardHeader className="flex items-center justify-center">
//         <CardTitle>Signup</CardTitle>
//         <CardDescription>
//           Create a new account if you haven&rsquo;t already
//         </CardDescription>
//         {error && <Error message={error?.message} />}
//       </CardHeader>
//       <CardContent className="space-y-2">
//         <div className="space-y-1">
//           <Input
//             name="name"
//             type="text"
//             placeholder="Enter Your Name"
//             onChange={handleInputChange}
//             className="bg-transparent border rounded-lg py-3 px-4 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
//           />
//           {errors.name && <Error message={errors.name} />}
//         </div>
//         <div className="space-y-1">
//           <Input
//             name="email"
//             type="email"
//             placeholder="Enter Your Email"
//             onChange={handleInputChange}
//             className="bg-transparent border rounded-lg py-3 px-4 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
//           />
//         </div>
//         {errors.email && <Error message={errors.email} />}

//         <div className="relative space-y-1">
//           <Input
//             name="password"
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter Password"
//             onChange={handleInputChange}
//             className="bg-transparent border rounded-lg py-3 px-4 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
//           />
//           <button
//             type="button"
//             onClick={togglePasswordVisibility}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//           >
//             {showPassword ? (
//               <EyeOffIcon className="mb-2" size={20} />
//             ) : (
//               <EyeIcon className="mb-2" size={20} />
//             )}
//           </button>
//         </div>
//         {errors.password && <Error message={errors.password} />}

//         <div className="space-y-1">
//           <input
//             id="profile_pic_input"
//             name="profile_pic"
//             type="file"
//             accept="image/*"
//             onChange={handleInputChange}
//             style={{ display: "none" }}
//           />
//           <Button
//             onClick={handleFileInputClick}
//             className="w-full bg-blue-700 text-white py-2 rounded-md"
//           >
//             Choose Profile Picture
//           </Button>
//           {formData.profile_pic && (
//             <div className="mt-2 flex items-center justify-center">
//               <img
//                 src={URL.createObjectURL(formData.profile_pic)}
//                 alt="Profile Preview"
//                 className="w-16 h-16 rounded-full object-cover mr-2"
//               />
//               <span>{formData.profile_pic.name}</span>
//             </div>
//           )}
//         </div>
//         {errors.profile_pic && <Error message={errors.profile_pic} />}
//       </CardContent>
//       <CardFooter>
//         <Button
//           onClick={handleSignup}
//           className="w-full bg-blue-500 text-white py-2 rounded-md"
//         >
//           {loading ? (
//             <BeatLoader size={10} color="#36d7b7" />
//           ) : (
//             "Create Account"
//           )}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default Signup;

import SignupForm from "./Signup/SignupForm";

const Signup = () => {
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default Signup;
