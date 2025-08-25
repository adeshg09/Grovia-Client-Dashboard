const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
    return false;
  }
};

const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Failed to retrieve ${key}:`, error);
    return defaultValue;
  }
};

const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Failed to remove ${key}:`, error);
    return false;
  }
};

const clearAll = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("Failed to clear storage:", error);
    return false;
  }
};

export { setItem, getItem, removeItem, clearAll };
