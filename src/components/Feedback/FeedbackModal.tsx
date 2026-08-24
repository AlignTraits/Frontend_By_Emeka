import { useEffect, useRef, useState } from "react";
import { sendFeedback } from "../../services/utils";
import "./FeedbackModal.css";

interface FeedbackModalProps {
  // How long to wait after mount before showing the check-in, in ms.
  // Defaults to 30s to match "a minute after viewing their personality overview".
  delayMs?: number;
  // A tag so feedback submissions (and the "don't ask again" flag) can be
  // scoped to where they were collected, e.g. "personality-overview".
  source?: string;
}

const STORAGE_KEY_PREFIX = "alignTraits_feedbackSeen_";

type Choice = "yes" | "no" | null;
type Step = 1 | 2 | 3;

export default function FeedbackModal({
  delayMs = 30000,
  source = "personality-overview",
}: FeedbackModalProps) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [choice, setChoice] = useState<Choice>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [sending, setSending] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const storageKey = `${STORAGE_KEY_PREFIX}${source}`;

  // Show once, ~a minute after the page is viewed — unless already dismissed before.
  useEffect(() => {
    if (localStorage.getItem(storageKey)) return;

    const timer = setTimeout(() => {
      setVisible(true);
      setStep(1);
    }, delayMs);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (step === 2) {
      const t = setTimeout(() => textareaRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [step]);

  const dismissForGood = () => {
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
  };

  const closeModal = () => {
    setVisible(false);
    dismissForGood();
  };

  const handleSelectOption = (value: Choice) => {
    setChoice(value);
  };

  const handleSubmitStep1 = () => {
    if (!choice) return;
    setStep(2);
  };

  const handleSend = async () => {
    setSending(true);
    try {
      await sendFeedback({
        source,
        isClear: choice === "yes",
        message: feedbackText,
      });
    } catch (err) {
      // Non-critical: don't block the user's flow on a feedback-submission failure.
      console.error("Failed to submit feedback:", err);
    } finally {
      setSending(false);
      setStep(3);
    }
  };

  const handleSkip = () => setStep(3);

  const handleDone = () => closeModal();

  if (!visible) return null;

  return (
    <div
      className={`fb-backdrop${visible ? " visible" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="fb-modal" role="dialog" aria-modal="true" aria-labelledby="fbTitle">
        <div className="fb-topbar">
          <button
            className={`fb-back${step === 2 ? " show" : ""}`}
            aria-label="Back"
            onClick={() => setStep(1)}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M15 5l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {step !== 3 && (
            <div className="fb-progress">
              <span className="label">Step</span>
              <span className={`fb-dot${step >= 1 ? " active" : ""}`} />
              <span className={`fb-dot${step >= 2 ? " active" : ""}`} />
            </div>
          )}

          <button className="fb-close" aria-label="Close" onClick={closeModal}>
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {step === 1 && (
          <div className="fb-step fb-step-active">
            <div className="fb-badge-wrap">
              <div className="fb-badge">
                <div className="fb-badge-inner">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="8" cy="10.5" r="1" fill="currentColor" />
                    <circle cx="12" cy="10.5" r="1" fill="currentColor" />
                    <circle cx="16" cy="10.5" r="1" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>

            <h2 id="fbTitle">Let's do a quick check-in.</h2>
            <p className="sub">
              Are your AlignTraits career recommendations clear and helpful to you?
            </p>

            <div className="fb-options">
              <button
                className={`fb-option${choice === "yes" ? " active" : ""}`}
                onClick={() => handleSelectOption("yes")}
              >
                <span className="emoji">👍</span>
                <span>Yes, they are clear</span>
                <span className="radio-dot" />
              </button>
              <button
                className={`fb-option${choice === "no" ? " active" : ""}`}
                onClick={() => handleSelectOption("no")}
              >
                <span className="emoji">👎</span>
                <span>No, I'm a bit confused</span>
                <span className="radio-dot" />
              </button>
            </div>

            <button
              className="fb-btn fb-btn-primary"
              disabled={!choice}
              onClick={handleSubmitStep1}
            >
              Submit
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="fb-step fb-step-active">
            <div className="fb-badge-wrap">
              <div className="fb-badge">
                <div className="fb-badge-inner">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 20h4.5L19.8 8.7a1.5 1.5 0 0 0 0-2.1l-2.4-2.4a1.5 1.5 0 0 0-2.1 0L4 15.5V20z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M13.5 5.5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            <h2>Tell us more.</h2>
            <p className="sub">
              Your feedback helps us build a better platform. What suggestions do you have for
              us?
            </p>

            <textarea
              ref={textareaRef}
              className="fb-textarea"
              placeholder="Let us know what you liked, or what we can do better..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />

            <button className="fb-btn fb-btn-primary" disabled={sending} onClick={handleSend}>
              {sending ? "Sending..." : "Send"}
            </button>
            <button className="fb-skip" onClick={handleSkip}>
              Skip for now
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="fb-step fb-step-active">
            <div className="fb-badge-wrap">
              <div className="fb-badge">
                <div className="fb-badge-inner">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      className="fb-check-path"
                      d="M5 13l4.5 4.5L19 7"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <h2>Thanks for the feedback!</h2>
            <p className="sub">
              We're using it to make your AlignTraits experience even better.
            </p>
            <button className="fb-btn fb-btn-primary" onClick={handleDone}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
