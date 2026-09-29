import md5 from "md5";
import { useState } from "react";
import { createTranslator } from "../../i18n/index.js";
import { Button, Card, Input } from "../../ui/index.js";

export function EditProfile({
  initialValues = {},
  customFields = [],
  locale = "pt",
  title,
  description,
  onSubmit,
  onBack,
  submitting = false,
  className = "",
}) {
  const t = createTranslator(locale);
  const [name, setName] = useState(initialValues.name ?? "");
  const [email, setEmail] = useState(initialValues.email ?? "");
  const [customValues, setCustomValues] = useState(() =>
    Object.fromEntries(customFields.map((field) => [field.key, initialValues[field.key] ?? ""])),
  );
  const gravatarHash = md5(email.trim().toLowerCase());
  const avatarUrl = `https://www.gravatar.com/avatar/${gravatarHash}?d=mp&s=160`;

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.({ name, email, ...customValues });
  }

  return (
    <Card className={className}>
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">{title ?? t("editProfileTitle")}</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description ?? t("editProfileDescription")}</p>
      </header>
      <div className="mb-6 flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
        <img
          alt={t("profilePhoto")}
          className="h-16 w-16 rounded-full border-2 border-white object-cover shadow-sm dark:border-gray-800"
          height="64"
          referrerPolicy="no-referrer"
          src={avatarUrl}
          width="64"
        />
        <p className="text-sm text-gray-600 dark:text-gray-300">{t("gravatarDescription")}</p>
      </div>
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
        {customFields.map(({ key, label, type = "text", ...inputProps }) => (
          <Input
            {...inputProps}
            key={key}
            label={label ?? key}
            name={key}
            onChange={(event) => setCustomValues((values) => ({ ...values, [key]: event.target.value }))}
            type={type}
            value={customValues[key]}
          />
        ))}
        <Button className="w-full" disabled={submitting} type="submit">
          {submitting ? t("savingProfile") : t("saveProfile")}
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
