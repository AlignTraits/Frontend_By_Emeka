import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from '../../components/Header';
import { toast } from 'react-toastify'

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from "../../contexts/useAuth";
import { BeatLoader } from "react-spinners";
import { removeToken, sendSetupCode, setToken as saveToken, signUpTwo } from '../../services/auth.service'
import { GOOGLE_AUTH_URL } from '../../constants/auth.constant'
import PasswordChecker from "../../components/PasswordChecker"

interface SetupPasswordProps {
  title: string
}

const RESEND_WAIT_SECONDS = 60

// For students who used the quiz, a check or a payment before they had a
// password. We email them a 6 digit code (the email also has a link that fills
// the code in). They type it here with their new password, so they stay in this
// tab and their results can load straight after.
const SetupPassword = ({ title }: SetupPasswordProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setToken } = useAuth()

  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState('')
  const [codeFromLink, setCodeFromLink] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formError, setFormError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [sentNote, setSentNote] = useState("")
  const [waitSeconds, setWaitSeconds] = useState(0)
  const [showPasswordRules, setShowPasswordRules] = useState(false)
  const autoSent = useRef(false)

  const [rules, setRules] = useState({
    length: false,
    lower: false,
    upper: false,
    number: false,
    special: false,
  })

  useEffect(() => {
    setRules({
      length: password.length >= 8,
      lower: /[a-z]/.test(password),
      upper: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    })
  }, [password])

  const validCount = [rules.lower, rules.upper, rules.number, rules.special].filter(Boolean).length

  // Count down before "Send a new code" can be pressed again.
  useEffect(() => {
    if (waitSeconds <= 0) return
    const timer = setTimeout(() => setWaitSeconds((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [waitSeconds])

  const requestCode = async (target: string) => {
    if (!target) return
    setIsSending(true)
    setFormError("")
    try {
      await sendSetupCode(target)
      setSentNote(`We have emailed a 6 digit code to ${target}. Check your inbox and spam folder.`)
      setWaitSeconds(RESEND_WAIT_SECONDS)
    } catch (err: any) {
      setFormError(err?.response?.data?.message || "We could not send the code. Check your connection and try again.")
    } finally {
      setIsSending(false)
    }
  }

  useEffect(() => {
    const emailParam = (searchParams.get("email") || "").trim();
    const tokenParam = (searchParams.get("token") || "").trim();

    if (!emailParam) {
      navigate('/login')
      return
    }
    // Someone setting up an account should not be logged in as someone else.
    removeToken()
    setEmail(emailParam)

    if (tokenParam) {
      // Opened from the emailed link: the code is already filled in.
      setCode(tokenParam)
      setCodeFromLink(true)
    } else if (!autoSent.current) {
      autoSent.current = true
      requestCode(emailParam)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, navigate])

  function isValidPassword(value: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^])[A-Za-z\d@$!%*?#&^]{8,}$/;
    return passwordRegex.test(value);
  }

  const isFormValid = (): boolean => {
    return code.trim().length > 0 && validCount >= 3 && rules.length && password === confirmPassword && password !== ''
      && confirmPassword !== ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPassword(password)) {
      setPasswordError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("The two passwords do not match.");
      return;
    }

    try {
      setIsLoading(true)
      setFormError("")
      const result = await signUpTwo({ email, password, token: code.trim() });
      const loginToken = result?.data?.token
      if (loginToken) {
        saveToken(loginToken)
        setToken(loginToken)
        toast.success("Password set. Welcome to AlignTraits!")
        // The dashboard finishes any eligibility check that was waiting for this.
        navigate("/dashboard", { replace: true })
      } else {
        toast.success("Password set. Please log in.")
        navigate("/login", { replace: true })
      }
    } catch (err: any) {
      const message = err?.response?.data?.errors?.[0]?.message || err?.response?.data?.message
      setFormError(message || "Something went wrong. Please try again.")
      if (err?.response?.status === 409) {
        toast.info("This account already has a password. Use Forgot password to change it.")
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetInput = () => {
    setFormError("")
    setConfirmPasswordError("")
    setPasswordError("")
  }

  return (
<div className="relative min-h-screen w-full bg-gradient-to-br from-[#CCE0F5] via-[#e9eff7] to-white">
      <Header />

      <div className="mx-auto mt-[40px] md:mt-[80px] mb-10 w-full max-w-[600px] px-4 md:px-0">
        <div className="space-y-5 p-6 md:p-10 md:bg-white rounded-lg md:shadow-lg md:border-[#ccc] md:border-[1px]">
          <div className="mx-auto space-y-2 mb-6 md:mb-0">
            <h2 className="text-xl md:text-2xl text-[#101828] text-center md:text-left font-semibold">
              {title}
            </h2>
            <p className="text-[#475467] text-[14px] text-center md:text-left">
              {codeFromLink
                ? `Choose a password for ${email}.`
                : sentNote || `We are sending a 6 digit code to ${email}…`}
            </p>
          </div>

          {formError && (
            <p role="alert" className="bg-red-50 text-[#B42318] p-3 rounded-lg text-[13px]">{formError}</p>
          )}

          <form
            onSubmit={(e) => handleSubmit(e)}
            className="space-y-6 flex flex-col"
          >
            {!codeFromLink && (
              <div>
                <label htmlFor="setup-code" className="block text-[14px] md:text-[16px] font-[600] text-[#101828]">
                  6 digit code from your email
                </label>
                <input
                  id="setup-code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  required
                  className="mt-1 w-full h-12 px-4 py-3 border-[1px] border-[#ccc] rounded-xl bg-white shadow-md focus:outline-none text-base tracking-[0.4em]"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  onFocus={resetInput}
                />
                <button
                  type="button"
                  disabled={isSending || waitSeconds > 0}
                  onClick={() => requestCode(email)}
                  className="mt-2 text-[13px] font-semibold text-[#004085] underline disabled:no-underline disabled:text-[#98A2B3]"
                >
                  {isSending ? "Sending…" : waitSeconds > 0 ? `Send a new code in ${waitSeconds}s` : "Send a new code"}
                </button>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-[14px] md:text-[16px] font-[600] text-[#101828]">
                New password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="mt-1 w-full h-12 px-4 py-3 border-[1px] border-[#ccc] rounded-xl bg-white shadow-md focus:outline-none text-sm md:text-base"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => {
                    resetInput()
                    setShowPasswordRules(true)
                  }}
                  onBlur={() => setShowPasswordRules(false)}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#004085] "
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              {passwordError && <p className="mt-1 text-[#E33629] font-normal italic text-[11px]">{passwordError}</p>}
              { showPasswordRules && <PasswordChecker password={password} /> }
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-[14px] md:text-[16px] font-[600] text-[#101828]"
              >
                Confirm new password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="mt-1 w-full h-12 px-4 py-3 border-[1px] border-[#ccc] rounded-xl bg-white shadow-md focus:outline-none text-sm md:text-base"
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={resetInput}
                />
                <button
                  type="button"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#004085] "
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              {confirmPasswordError && <p className="mt-1 text-[#E33629] font-normal italic text-[11px]">{confirmPasswordError}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className="w-full h-12 mx-auto py-2 px-4 bg-[#004085] hover:bg-blue-700 text-white rounded-xl disabled:opacity-50"
            >
              {isLoading ? <BeatLoader /> : "Set password and continue"}
            </button>
          </form>

          {!codeFromLink && (
            <div className="pt-2 text-center">
              <p className="text-[13px] text-[#475467] mb-3">Is this a Google (Gmail) account? You can skip the code.</p>
              <button
                type="button"
                onClick={() => window.location.href = GOOGLE_AUTH_URL}
                className="w-full h-12 flex justify-center items-center gap-x-[10px] px-2 py-1 rounded-xl border border-[#ccc] bg-white hover:bg-gray-50"
              >
                <FcGoogle className="text-2xl" />
                <span className="text-sm md:text-base">Continue with Google</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupPassword;
