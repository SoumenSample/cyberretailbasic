const PREMIUM_FEATURES = ["shelf_management", "employee_management"];

export function hasFeature(business: { enabledFeatures?: string[] }, key: string) {
  if (!business.enabledFeatures) return false;
  if (business.enabledFeatures.includes("*")) return true;
  if (PREMIUM_FEATURES.includes(key)) return false;
  return business.enabledFeatures.includes(key);
}
