import SetupPassword from './SetupPassword'

// /signup-two is where visitors land after paying without an account password.
// It uses the same secure set-password page as /setup-password: a 6 digit code
// is emailed to them, so nobody can set a password on someone else's account.
export default function RegisterTwo() {
  return <SetupPassword title="Create your password" />
}
