import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../api/authService";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    },
    onError: (error) => {
      // Handle validation errors from Laravel (422) or other errors
      const errorData = error.response?.data;
      if (errorData && errorData.errors) {
        Object.values(errorData.errors).forEach((messages) => {
          messages.forEach((message) => toast.error(message));
        });
      } else {
        toast.error(
          errorData?.message || "Registration failed. Please try again."
        );
      }
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            label="Name"
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
            error={errors.name}
          />
          <Input
            label="Email"
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={errors.password}
          />
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Registering..." : "Register"}
          </Button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
