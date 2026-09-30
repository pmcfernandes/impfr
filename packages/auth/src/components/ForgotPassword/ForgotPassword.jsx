import { useState } from "react";
import { createTranslator } from "../../i18n/index.js";
import { Button, Card, Input } from "../../ui/index.js";

export function ForgotPassword({
  locale = "pt",
  title,
  description,
  onSubmit,
  onBack,
  submitting = false,
  className = "",
}) {
  const t = createTranslator(locale);
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.({ email });
  }

  return (
    <Card className={className}>
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">{title ?? t("forgotPasswordTitle")}</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description ?? t("forgotPasswordDescription")}</p>
      </header>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          autoComplete="email"
          label={t("email")}
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          required
          type="email"
          value={email}
        />
        <Button className="w-full" disabled={submitting} type="submit">
          {submitting ? t("sendingReset") : t("sendReset")}
        </Button>
      </form>
      {onBack && (
        <button
          className="mt-4 w-full text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          onClick={onBack}
          type="button"
        >
          {t("backToLogin")}
        </button>
      )}
    </Card>
  );
}
