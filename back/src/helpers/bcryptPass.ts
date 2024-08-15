import * as bcrypt from "bcrypt";
async function cryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
  try {
    const saltRounds = parseInt(process.env.saltRounds);

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
}

export { cryptPassword };
