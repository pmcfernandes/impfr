import { useState } from "react";
import { createTranslator } from "../../i18n/index.js";
import { Button, Card, Input } from "../../ui/index.js";

export function ChangePassword({
  locale = "pt",
  title,
  description,
  onSubmit,
  submitting = false,
  className = "",
}) {
  const t = createTranslator(locale);
  const [currentPassword, setCurrentPassword] = useState("");
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
    onSubmit?.({ currentPassword, password });
  }

  return (
    <Card className={className}>
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">{title ?? t("changePasswordTitle")}</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description ?? t("changePasswordDescription")}</p>
      </header>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          autoComplete="current-password"
          label={t("currentPassword")}
          name="current-password"
          onChange={(event) => setCurrentPassword(event.target.value)}
          required
          type="password"
          value={currentPassword}
        />
        <Input
          autoComplete="new-password"
          label={t("newPassword")}
          name="new-password"
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
          {submitting ? t("changingPassword") : t("changePassword")}
        </Button>
      </form>
    </Card>
  );
}
