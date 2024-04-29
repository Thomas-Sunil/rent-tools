import SignUpForm from './SignupForm';

const ParentComponent = () => {
  const handleSignUp = () => {
    // Handle sign up logic here, for example:
    // Submit form data to the server, store user information in the database, etc.
    console.log("Signed up successfully!");
  };

  return (
    <div>
      {/* Pass onSignUp prop to SignUpForm */}
      <SignUpForm onSignUp={handleSignUp} />
    </div>
  );
};

export default ParentComponent;