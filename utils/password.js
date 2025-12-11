import bcrypt from "bcrypt";

// for signup
export function saltAndHashPassword(plainPassword) {
  const saltRound = 10;
  const hash = bcrypt.hashSync(plainPassword, saltRound);
  return hash;
}

// for signIn
export async function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}
