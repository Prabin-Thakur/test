import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

const useLogin = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const check = localStorage.getItem("loggedIn");
    if (!check) {
      return;
    }
    if (check === "true") {
      setLoggedIn(true);
    }
    if (check === "false") {
      setLoggedIn(false);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    if (data.email === "admin@admin.com" && data.password === "admin") {
      localStorage.setItem("loggedIn", JSON.stringify(true));
      setLoggedIn(true);
      window.location.reload();
    } else {
      alert("Login failed");
    }
  };

  return {
    loggedIn,
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};

export default useLogin;
