export const validateForm = (ErrorStatus) => {
	try {
		if ((ErrorStatus.age || ErrorStatus.pw || ErrorStatus.email) !== true) {
			console.log('Sign in', true);
			return true;
		}
		console.log('Sign in', false);
		return false;
	} catch (error) {
		console.error('Error during validateForm() : ', error);
	}
};
