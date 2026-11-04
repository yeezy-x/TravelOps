import { db } from "../index";

export async function findUserByEmail(email: string) {
  const user = await db.orm.public.User.where({ email }).first();
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    passwordHash: user.passwordHash,
  };
}
