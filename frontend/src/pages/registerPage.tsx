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

  const handleSubmitRegistrationForm = (input: RegistrationInput) => {
    // Logic goes here
    // Validate the form        
    // If the form is invalid      
    // Show an error toast (for invalid input)
    // If the form is valid, start isLoading    
    // Make the API call      
    // If the API call is successful        
    // Save the user details to the cache        
    // Stop the spinner        
    // Show the toast        
    // In 3 seconds, redirect to the main page           
    // If the call failed        
    // Stop the spinner        
    // Show the toast (for unknown error)
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
