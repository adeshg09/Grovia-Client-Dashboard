export const removeEmpty = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );
};
