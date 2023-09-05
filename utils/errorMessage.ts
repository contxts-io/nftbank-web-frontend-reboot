interface ErrorMessages {
  [errorCode: string]: string;
}
const ERROR_MESSAGES: ErrorMessages = {
  'auth/too-many-requests': 'Too many requests. Try again later.',
  'auth/invalid-credentials':
    'Invalid credentials. Please check your email and password.',
  'auth/invalid-action-code': 'The request has expired. Please try again.',
  'auth/user-not-found': 'User not found. Please register an account.',
  'auth/email-already-in-use' : 'Looks like you already have an account. Please Sign in.',
};

const errorMessage = (errorCode: string) => {
  const message = ERROR_MESSAGES[errorCode] || 'Something went wrong. Please try again.';
  return message;
};

export default errorMessage;
