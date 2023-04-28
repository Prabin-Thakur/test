import "./Login.scss";
import { TextField, Button } from "@mui/material";
import useLogin from "../../customHooks/uselogin";

const Login: React.FC = () => {
  const { handleSubmit, loggedIn, onSubmit, register, errors } = useLogin();

  if (loggedIn) {
    return <h2 className="login-container">Successfully logged in</h2>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-container">
      <TextField
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address",
          },
        })}
        label="Email"
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />
      <TextField
        {...register("password", { required: "Password is required" })}
        label="Password"
        type="password"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />
      <Button type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
};

export default Login;
