const DEFAULTS = {
  title: "Application",
  navigation: [],
  activeNavigationId: undefined,
};

export function normalizeAppShellConfig(config = {}) {
  return {
    ...DEFAULTS,
    ...config,
    navigation: Array.isArray(config.navigation) ? config.navigation : [],
  };
}
