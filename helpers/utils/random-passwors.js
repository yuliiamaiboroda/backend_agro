const randomPassword = () => {
  const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowers = "abcdefghijklmnopqrstuvwxyz";
  const digits = "01234567890";

  const choices = [uppers, lowers, digits];

  let password = "";
  const ranLength = Math.ceil(Math.random() * 10) + 4;
  for (let i = 0; i < ranLength; i++) {
    const choice = choices[Math.ceil(Math.random() * 3) - 1];
    const choiceItem = choice[Math.ceil(Math.random() * choice.length) - 1];
    password += choiceItem;
  }

  for (let i = 0; i < 3; i++) {
    // Append needed values to end
    const choice = choices[i];
    const choiceItem = choice[Math.ceil(Math.random() * choice.length) - 1];
    password += choiceItem;
  }

  password = password
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join("");

  return password;
};

module.exports = { randomPassword };
