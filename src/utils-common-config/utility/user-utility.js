export const getUserFromFirebase = (data) => {
  const user = {
		name: data.displayName,
		phone: data.phoneNumber,
		email: data.email,
		isUserLoggedIn: true,
  };
  return user;
};