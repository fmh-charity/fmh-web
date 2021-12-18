const lcAvailable = () => {
  const key = '__TEST__';
  try {
    localStorage.setItem(key, key);
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

export const getlc = (key) => {
  if (lcAvailable()) {
    const item = localStorage.getItem(key);
    return item;
  }
  return null;
};
export const setlc = (key, value) => {
  if (lcAvailable()) {
    localStorage.setItem(key, value);
  }
};
export const clearlc = () => {
  if (lcAvailable()) {
    localStorage.clear();
  }
};
export const removelc = (key) => {
  if (lcAvailable()) {
    localStorage.removeItem(key);
  }
};


