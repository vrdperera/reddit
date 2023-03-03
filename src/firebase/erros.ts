const FIREBASE_ERRORS = {
  'Firebase: Error (auth/app-deleted)':
    'The Firebase app has been deleted. Re-create the Firebase app.',
  'Firebase: Error (auth/app-not-authorized)':
    'The user is not authorized to access the Firebase app. Make sure the correct app has been configured in the Firebase console.',
  'Firebase: Error (auth/argument-error)':
    'An error occurred while parsing a method argument.',
  'Firebase: Error (auth/invalid-api-key)':
    'The provided API key is invalid. Get a valid API key from the Firebase console.',
  'Firebase: Error (auth/invalid-user-token)':
    "The user's token is invalid or has expired. Sign the user in again.",
  'Firebase: Error (auth/network-request-failed)':
    "A network error occurred. Check the user's internet connection and try again.",
  'Firebase: Error (auth/operation-not-allowed)':
    'The requested authentication operation is not allowed. Enable the corresponding authentication method in the Firebase console.',
  'Firebase: Error (auth/requires-recent-login)':
    'This operation requires a recent login. Log the user in again before retrying this operation.',
  'Firebase: Error (auth/too-many-requests)':
    'Too many requests have been made to the Firebase Authentication API in a short period of time.',
  'Firebase: Error (auth/user-cancelled)':
    'The user did not grant your application the permissions it requested.',
  'Firebase: Error (auth/user-not-found)':
    'There is no user record corresponding to this identifier. The user may have been deleted.',
  'Firebase: Error (auth/user-disabled)':
    'The user account has been disabled by an administrator.',
  'Firebase: Error (auth/email-already-in-use)':
    'The email address is already in use by another account.',
  'Firebase: Error (auth/invalid-email)': 'The email address is not valid.',
  'Firebase: Error (auth/invalid-password)':
    'The password is not valid. It must be at least 6 characters long.',
  'Firebase: Error (auth/weak-password)':
    'The password is too weak. It must be at least 6 characters long and contain a mix of letters, numbers, and symbols.',
  'Firebase: Error (auth/account-exists-with-different-credential)':
    'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.',
  'Firebase: Error (auth/credential-already-in-use)':
    'This credential is already associated with a different user account.',
  'Firebase: Error (auth/wrong-password)':
    'The password is invalid for the given email, or the account corresponding to the email does not have a password set.',
  'Firebase: Error (auth/popup-closed-by-user)':
    'The popup has been closed by the user before finalizing the operation.',
  'Firebase: Error (auth/unauthorized-domain)':
    'This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.',
  'Firebase: Error (auth/unsupported-persistence-type)':
    'The current environment does not support the specified persistence type.',
  'Firebase: Error (auth/cancelled-popup-request)':
    'This operation has been cancelled due to another conflicting popup being opened.',
  'Firebase: Error (auth/popup-blocked)':
    'The sign-in popup was blocked by the browser.',
};

export { FIREBASE_ERRORS };
