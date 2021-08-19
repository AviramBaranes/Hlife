type EnumTypes = string | number;

export const validateEnums = (
  value: string | number,
  enumList: EnumTypes[]
) => {
  let isValid = false;
  enumList.forEach((item: string | number) => {
    if (value === item) {
      isValid = true;
      return;
    }
  });
  if (isValid) {
    return true;
  }
  throw new Error("Invalid value");
};
