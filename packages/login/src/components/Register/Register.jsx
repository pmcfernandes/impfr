import { useState } from "react";
import { createTranslator } from "../../i18n/index.js";
import { Button, Card, Input } from "../../ui/index.js";

export function Register({
  locale = "pt",
  title,
  description,
  onSubmit,
  onBack,
  submitting = false,
  className = "",
}) {
  const t = createTranslator(locale);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }

    setError(null);
    onSubmit?.({ name, email, password });
  }

  return (
    <Card className={className}>
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">{title ?? t("registerTitle")}</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description ?? t("registerDescription")}</p>
      </header>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          autoComplete="name"
          label={t("name")}
          name="name"
          onChange={(event) => setName(event.target.value)}
          required
          type="text"
          value={name}
        />
        <Input
          autoComplete="email"
          label={t("email")}
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          required
          type="email"
          value={email}
        />
        <Input
          autoComplete="new-password"
          label={t("password")}
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
        <Input
          autoComplete="new-password"
          label={t("confirmPassword")}
          name="confirm-password"
          onChange={(event) => {
            setConfirmPassword(event.target.value);
            setError(null);
          }}
          required
          type="password"
          value={confirmPassword}
        />
        {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:bg-red-950/50 dark:text-red-400" role="alert">{error}</p>}
        <Button className="w-full" disabled={submitting} type="submit">
          {submitting ? t("registering") : t("register")}
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
