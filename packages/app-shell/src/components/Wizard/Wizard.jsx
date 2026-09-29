import { Check } from "lucide-react";
import { useState } from "react";
import { createTranslator } from "../../i18n/index.js";
import { Button } from "../../ui/Button.jsx";
import { Card } from "../../ui/Card.jsx";
import { cx } from "../../ui/cx.js";

export function Wizard({
  steps = [],
  activeStep,
  defaultStep = 0,
  onStepChange,
  onComplete,
  locale = "pt",
  className,
}) {
  const [uncontrolledStep, setUncontrolledStep] = useState(defaultStep);
  const t = createTranslator(locale);

  if (steps.length === 0) return null;

  const requestedStep = activeStep ?? uncontrolledStep;
  const currentStep = Math.min(Math.max(requestedStep, 0), steps.length - 1);
  const isLastStep = currentStep === steps.length - 1;

  function changeStep(nextStep) {
    if (activeStep === undefined) setUncontrolledStep(nextStep);
    onStepChange?.(nextStep);
  }

  function handleNext() {
    if (isLastStep) onComplete?.();
    else changeStep(currentStep + 1);
  }

  return (
    <Card className={cx("p-0", className)}>
      <ol className="grid border-b border-gray-200 sm:grid-cols-[repeat(var(--step-count),minmax(0,1fr))] dark:border-gray-800" style={{ "--step-count": steps.length }}>
        {steps.map((step, index) => {
          const isCurrent = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <li className="relative flex items-center gap-3 px-5 py-4" key={step.id ?? step.title}>
              <span
                className={cx(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                  isCurrent && "border-blue-500 bg-blue-500 text-white",
                  isComplete && "border-emerald-500 bg-emerald-500 text-white",
                  !isCurrent && !isComplete && "border-gray-300 text-gray-500 dark:border-gray-700 dark:text-gray-400",
                )}
              >
                {isComplete ? <Check aria-hidden="true" size={15} /> : index + 1}
              </span>
              <div>
                <p className={cx("text-sm font-medium", isCurrent ? "text-gray-950 dark:text-gray-50" : "text-gray-500 dark:text-gray-400")}>{step.title}</p>
                {step.description && <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{step.description}</p>}
              </div>
            </li>
          );
        })}
      </ol>
      <div className="min-h-44 p-6">{steps[currentStep].content}</div>
      <div className="flex justify-between gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-800">
        <Button disabled={currentStep === 0} onClick={() => changeStep(currentStep - 1)} variant="secondary">
          {t("previous")}
        </Button>
        <Button onClick={handleNext}>{t(isLastStep ? "finish" : "next")}</Button>
      </div>
    </Card>
  );
}
