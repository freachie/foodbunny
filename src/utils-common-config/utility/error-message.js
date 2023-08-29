export const getErrorMessage = (err) => {
  let error = err.toString().split("(").pop();
  let index = error.indexOf(')');
  error = error.slice(0, index);
  console.log(error);
  switch (error) {
		case "auth/account-exists-with-different-credential":
			error = "Phone number already in use with another username";
			break;
		case "auth/code-expired":
			error = "Code Expired. Please try resending";
			break;
		case "auth/wrong-password":
			error = "Entered password is wrong.";
			break;
		case "auth/user-not-found":
			error = "This user is not registered. Please try signup as new user.";
			break;
		case "auth/email-already-in-use":
			error = "This email is already in use. Please try sign in";
			break;
		case "auth/invalid-action-code":
			error = "Invalid action code";
			break;
		case "auth/invalid-phone-number":
			error = "Phone number is invalid";
			break;
		case "auth/missing-verification-id":
			error = "Missing verification ID";
			break;
		case "auth/invalid-verification-code":
			error = "Verification code is invalid";
			break;
		case "auth/quota-exceeded":
			error =
				"You have reached maximum limit of updating. Please try again tomorrow";
			break;
		case "Error: reCAPTCHA has already been rendered in this elemen":
			error = "reCAPTCHA is not valid. Please try refreshing the page";
			break;
		default:
			error = "Something went wrong. Please try again !";
	}
  return error;
}