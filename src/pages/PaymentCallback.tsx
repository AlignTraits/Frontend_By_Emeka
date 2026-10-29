import { useEffect } from "react"
import Header from "../components/Header";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import resetIcon from "../assets/resetRediret.svg"
import { getToken } from "../services/auth.service";

const readJSON = (key: string) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// Paystack sends people back here after paying.
// The paid check only runs for a logged in student (the server checks the plan
// on the logged in account), so this page sends each person to the right next
// step. The dashboard then finishes the check that was waiting.
const PaymentCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const pending = readJSON("eligibilityPayload")
    const account = readJSON("userData") // { ok: true } when the email already had an account
    const email: string = typeof pending?.email === "string" ? pending.email.trim() : ""

    let next = "/login"
    let message = "Payment received. Please log in to see your results."

    if (getToken()) {
      next = "/dashboard"
      message = "Payment received. Preparing your results…"
    } else if (email && !account?.ok) {
      // A new account with no password yet: set one with the emailed code.
      next = `/setup-password?email=${encodeURIComponent(email)}`
      message = "Payment received. Set a password to see your results."
    }

    toast.success(message)
    const timer = setTimeout(() => navigate(next, { replace: true }), 2500)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#CCE0F5] via-[#e9eff7] to-white">
      <Header />
      <div className='flex flex-col items-center p-[20px] md:p-[20px] p-[10px] gap-y-[20px] mt-10'>
        <div className=''>
          <img src={resetIcon} alt="" />
        </div>
        <p className='text-[#4C4E53] text-center max-w-[450px] px-4'>
          Payment successful, <span className="text-[#004085]">you will be redirected in a few seconds...</span>
        </p>
      </div>
    </div>
  )
}

export default PaymentCallback
