export const dateToString = (date: Date) => {
  try {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return `${mm}-${dd}-${yyyy}`;
  } catch (err) {
    throw err;
  }
};
