import { useId, useState } from "react";
import { createTranslator } from "../../i18n/index.js";
import { Button, Card, Input } from "../../ui/index.js";
import { SocialLoginButtons } from "./SocialLoginButtons.jsx";

export function Login({
  locale = "pt",
  title,
  description,
  onSubmit,
  onSocialLogin,
  socialProviders = [],
  submitting = false,
  showRememberMe = true,
  rememberMe,
  defaultRememberMe = false,
  onRememberMeChange,
  className = "",
}) {
  const t = createTranslator(locale);
  const rememberId = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [internalRememberMe, setInternalRememberMe] = useState(defaultRememberMe);
  const rememberMeChecked = rememberMe ?? internalRememberMe;

  function handleRememberMeChange(event) {
    const value = event.target.checked;
    if (rememberMe === undefined) setInternalRememberMe(value);
    onRememberMeChange?.(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.({ email, password, rememberMe: rememberMeChecked });
  }

  return (
    <Card className={className}>
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">{title ?? t("title")}</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description ?? t("description")}</p>
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
        <Input
          autoComplete="current-password"
          label={t("password")}
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
        {showRememberMe && (
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 dark:text-gray-300" htmlFor={rememberId}>
            <input
              checked={rememberMeChecked}
              className="h-4 w-4 rounded border-gray-300 accent-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
              id={rememberId}
              name="rememberMe"
              onChange={handleRememberMeChange}
              type="checkbox"
            />
            {t("rememberMe")}
          </label>
        )}
        <Button className="w-full" disabled={submitting} type="submit">
          {submitting ? t("submitting") : t("submit")}
        </Button>
      </form>
      <SocialLoginButtons
        disabled={submitting}
        onSelect={onSocialLogin}
        providers={socialProviders}
        t={t}
      />
    </Card>
  );
}
