function flatten(value, prefix, out, separator) {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      flatten(child, prefix ? `${prefix}${separator}${key}` : key, out, separator);
    }
    return;
  }
  out[prefix] = value;
}
function envValue(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  const text = String(value);
  if (/[\s#="'\\]/u.test(text)) return JSON.stringify(text);
  return text;
}
export function jsonToEnv(input, options = {}) {
  if (input === null || typeof input !== "object" || Array.isArray(input)) throw new TypeError("Expected input to be an object");
  const { separator = "_", uppercase = true, sort = false } = options;
  const flat = {};
  flatten(input, "", flat, separator);
  let entries = Object.entries(flat).map(([key,value])=>[uppercase?key.toUpperCase():key,value]);
  if (sort) entries.sort(([a],[b])=>a.localeCompare(b));
  return entries.map(([key,value])=>`${key}=${envValue(value)}`).join("\n");
}
