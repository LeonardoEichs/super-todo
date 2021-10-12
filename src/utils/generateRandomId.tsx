const generateRandom = () => Math.random().toString(36).substring(2);

const generateRandomId = () => {
  return generateRandom() + generateRandom();
};

export default generateRandomId;
