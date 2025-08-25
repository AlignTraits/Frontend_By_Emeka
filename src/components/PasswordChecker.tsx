import { useEffect, useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'

export default function PasswordChecker({ password }: { password: string }) {
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

  return (
    <div className="mt-3 p-3 border rounded-lg bg-gray-50 text-sm">
      <p className="text-[#b4005a] font-semibold">Your password must contain:</p>
      <ul className="mt-2 space-y-1 text-[14px]">
        <li className={rules.length ? "text-green-600" : "text-gray-500"}>
          <AiOutlineCheck className="inline mr-1" /> At least 8 characters
        </li>
        <li className={validCount >= 3 ? "text-green-600" : "text-gray-500"}>
          <AiOutlineCheck className="inline mr-1" /> At least 3 of the following:
          <ul className="ml-6 mt-1 space-y-1">
            <li className={rules.lower ? "text-green-600" : "text-gray-500"}>
              <AiOutlineCheck className="inline mr-1" /> Lowercase letters (a-z)
            </li>
            <li className={rules.upper ? "text-green-600" : "text-gray-500"}>
              <AiOutlineCheck className="inline mr-1" /> Uppercase letters (A-Z)
            </li>
            <li className={rules.number ? "text-green-600" : "text-gray-500"}>
              <AiOutlineCheck className="inline mr-1" /> Numbers (0-9)
            </li>
            <li className={rules.special ? "text-green-600" : "text-gray-500"}>
              <AiOutlineCheck className="inline mr-1" /> Special characters (!@#$%^&*)
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
