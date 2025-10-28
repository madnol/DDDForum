import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

import { api } from "../api";

import { useUser } from "../contexts/userContext";
import { useSpinner } from "../contexts/spinnerContext";

import { Layout } from "../components/layout";
import { RegistrationForm, type RegistrationInput } from "../components/registrationForm";


type ValidationResult = {
  success: boolean;
  errorMessage?: string;
}

function validateForm(input: RegistrationInput): ValidationResult {
  if (input.email.indexOf('@') === -1) return { success: false, errorMessage: "Email invalid" };
  if (input.username.length < 2) return { success: false, errorMessage: "Username invalid" }
  return { success: true }
}

export const RegisterPage = () => {
  const { setUser } = useUser()

  const navigate = useNavigate()

  const spinner = useSpinner()

  const handleSubmitRegistrationForm = async (input: RegistrationInput) => {
    const validationResult = validateForm(input);
    if (!validationResult.success) {
      return toast.error(validationResult.errorMessage);
    }

    spinner.activate()
    try {
      const response = await api.register(input);

      setUser(response.data.data)
      spinner.deactivate();
      toast.success("Success! Redirecting home.");

      setTimeout(() => { navigate('/') }, 3000)
    } catch (error) {
      const { response } = (error as AxiosError<{ error: string; success: boolean }>)

      spinner.deactivate()
      return toast.error(response?.data.error)
    }
  };

  return (
    <Layout>
      <RegistrationForm
        onSubmit={(input: RegistrationInput) =>
          handleSubmitRegistrationForm(input)
        }
      />
    </Layout>
  )
}
