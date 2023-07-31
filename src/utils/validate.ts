export function isValidEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function hasTwoOrMoreSpecialCharacters(password: string) {
  const specialCharRegex = /[^a-zA-Z0-9]/g;
  const matches = password.match(specialCharRegex);
  return matches ? matches.length >= 2 : false;
}

