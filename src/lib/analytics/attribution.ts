export type AttributionData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_id?: string;
  utm_source_platform?: string;
  utm_creative_format?: string;
  utm_marketing_tactic?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  ttclid?: string;
  twclid?: string;
  li_fat_id?: string;
  initial_landing_url?: string;
  initial_referrer?: string;
  last_landing_url?: string;
  last_referrer?: string;
  last_touch_at?: string;
};

const STORAGE_KEY = "stocai_attribution_v1";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "utm_source_platform",
  "utm_creative_format",
  "utm_marketing_tactic",
] as const;

const CLICK_KEYS = [
  "gclid",
  "fbclid",
  "msclkid",
  "ttclid",
  "twclid",
  "li_fat_id",
] as const;

const ATTR_KEYS = [...UTM_KEYS, ...CLICK_KEYS];

const isBrowser = () => typeof window !== "undefined";

const parseSearch = (search: string): Partial<AttributionData> => {
  if (!search) return {};
  const params = new URLSearchParams(search);
  const data: Partial<AttributionData> = {};
  ATTR_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      data[key] = value;
    }
  });
  return data;
};

const readStored = (): AttributionData => {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as AttributionData;
  } catch {
    return {};
  }
};

const writeStored = (data: AttributionData) => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors (private mode, quota, etc.)
  }
};

export const persistAttribution = (): AttributionData => {
  if (!isBrowser()) return {};

  const stored = readStored();
  const fromUrl = parseSearch(window.location.search);

  const next: AttributionData = { ...stored };

  if (!next.initial_landing_url) {
    next.initial_landing_url = window.location.href;
  }
  if (!next.initial_referrer && document.referrer) {
    next.initial_referrer = document.referrer;
  }

  next.last_landing_url = window.location.href;
  if (document.referrer) {
    next.last_referrer = document.referrer;
  }

  if (Object.keys(fromUrl).length > 0) {
    Object.assign(next, fromUrl);
    next.last_touch_at = new Date().toISOString();
  }

  writeStored(next);
  return next;
};

export const getAttribution = (): AttributionData => readStored();

const pickKeys = (data: AttributionData, keys: readonly string[]) => {
  const picked: Record<string, string> = {};
  keys.forEach((key) => {
    const value = (data as Record<string, string>)[key];
    if (value) {
      picked[key] = value;
    }
  });
  return picked;
};

export const getAttributionProperties = (): Record<string, string> => {
  const data = readStored();
  return pickKeys(data, [
    ...ATTR_KEYS,
    "initial_landing_url",
    "initial_referrer",
    "last_landing_url",
    "last_referrer",
    "last_touch_at",
  ]);
};

export const getFirstTouchProperties = (): Record<string, string> => {
  const data = readStored();
  const props: Record<string, string> = {};
  ATTR_KEYS.forEach((key) => {
    const value = (data as Record<string, string>)[key];
    if (value) {
      props[`first_${key}`] = value;
    }
  });
  if (data.initial_landing_url) {
    props.first_landing_url = data.initial_landing_url;
  }
  if (data.initial_referrer) {
    props.first_referrer = data.initial_referrer;
  }
  return props;
};

export const getAttributionForApi = (): Record<string, string> => {
  const data = readStored();
  return pickKeys(data, [
    ...ATTR_KEYS,
    "initial_landing_url",
    "initial_referrer",
    "last_landing_url",
    "last_referrer",
  ]);
};
