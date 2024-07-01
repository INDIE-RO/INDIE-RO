export const calculateLeftPosition = (textLocation: string, offset: string): string => {
  const baseValue = parseFloat(textLocation);
  const offsetValue = parseFloat(offset);
  return `${baseValue + offsetValue}rem`;
};
