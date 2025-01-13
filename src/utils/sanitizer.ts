export const sanitizeData = (data: any) => {
  // sanitizing the input data
  const sanitized = { ...data };
  for (const key in sanitized) {
    if (typeof sanitized[key] === "string") {
      sanitized[key] = sanitized[key].trim();
    }
  }
  return sanitized;
};
