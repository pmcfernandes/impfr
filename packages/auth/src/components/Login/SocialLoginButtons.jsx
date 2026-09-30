const PROVIDERS = {
  google: { label: "Google", icon: GoogleIcon },
  microsoft: { label: "Microsoft", icon: MicrosoftIcon },
  apple: { label: "Apple", icon: AppleIcon },
};

export function SocialLoginButtons({ providers, onSelect, disabled, t }) {
  const availableProviders = providers.filter((provider) => PROVIDERS[provider]);

  if (availableProviders.length === 0) return null;

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        {t("orContinueWith")}
        <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
      </div>
      <div className="grid gap-2">
        {availableProviders.map((provider) => {
          const { label, icon: Icon } = PROVIDERS[provider];

          return (
            <button
              className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-900 dark:focus:ring-offset-gray-950"
              disabled={disabled}
              key={provider}
              onClick={() => onSelect?.(provider)}
              type="button"
            >
              <Icon />
              {t("continueWith")} {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
      <path d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 0 1-2 3.1v2.5h3.2c1.9-1.8 3.1-4.4 3.1-7.4Z" fill="#4285F4" />
      <path d="M12 22c2.7 0 5-.9 6.7-2.4l-3.2-2.5c-.9.6-2 .9-3.5.9-2.7 0-5-1.8-5.8-4.3H2.9v2.6A10 10 0 0 0 12 22Z" fill="#34A853" />
      <path d="M6.2 13.7A6 6 0 0 1 5.9 12c0-.6.1-1.2.3-1.7V7.7H2.9A10 10 0 0 0 2 12c0 1.6.4 3 1 4.3l3.2-2.6Z" fill="#FBBC05" />
      <path d="M12 6c1.6 0 3 .5 4.1 1.6l3-3A10 10 0 0 0 2.9 7.7l3.3 2.6C7 7.8 9.3 6 12 6Z" fill="#EA4335" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M2 2h9.5v9.5H2z" fill="#f35325" />
      <path d="M12.5 2H22v9.5h-9.5z" fill="#81bc06" />
      <path d="M2 12.5h9.5V22H2z" fill="#05a6f0" />
      <path d="M12.5 12.5H22V22h-9.5z" fill="#ffba08" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
      <path d="M17.1 12.7c0-2.2 1.8-3.3 1.9-3.4a4.1 4.1 0 0 0-3.2-1.7c-1.4-.1-2.6.8-3.3.8-.7 0-1.8-.8-3-.8a4.3 4.3 0 0 0-3.7 2.2c-1.6 2.7-.4 6.7 1.1 8.9.8 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.8-.7 1.3 0 1.7.7 2.8.7 1.2 0 1.9-1 2.6-2.2.8-1.2 1.1-2.4 1.1-2.4a4 4 0 0 1-1.8-3.6Zm-2.2-6.6c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2-.5 2.7-1.3Z" />
    </svg>
  );
}
