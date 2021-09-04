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
  return isValid;
};
