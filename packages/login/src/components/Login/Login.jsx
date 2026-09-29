import { useState } from "react";
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
  className = "",
}) {
  const t = createTranslator(locale);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.({ email, password });
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
