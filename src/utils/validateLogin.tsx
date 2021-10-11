interface LoginParameters {
  username: string;
  password: string;
}

const validateLogin = async ({
  username,
  password,
}: LoginParameters): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "Leonardo" && password === "12345") resolve();
      reject("Invalid Username or Password");
    }, 1000);
  });
};

export default validateLogin;
