import { useState } from "react";

const useShowPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return { showPassword, handleShowPassword };
};

export default useShowPassword;
