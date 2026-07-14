import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const SINGLETON_ID = 1;

function getEnvCredentials() {
  const username = process.env.ADMIN_USERNAME;
  const hashB64 = process.env.ADMIN_PASSWORD_HASH_B64;
  const passwordHash = hashB64
    ? Buffer.from(hashB64, "base64").toString("utf-8")
    : undefined;
  return { username, passwordHash };
}

// DB에 저장된 계정 정보가 있으면 그것을 우선 사용하고, 없으면 .env의 초기 계정으로 대체한다.
export async function getAdminCredentials(): Promise<{
  username: string;
  passwordHash: string;
} | null> {
  const stored = await prisma.adminAccount.findUnique({
    where: { id: SINGLETON_ID },
  });
  if (stored) {
    return { username: stored.username, passwordHash: stored.passwordHash };
  }

  const { username, passwordHash } = getEnvCredentials();
  if (!username || !passwordHash) return null;
  return { username, passwordHash };
}

export async function updateAdminCredentials(
  username: string,
  password: string
) {
  const passwordHash = await bcrypt.hash(password, 10);
  return prisma.adminAccount.upsert({
    where: { id: SINGLETON_ID },
    update: { username, passwordHash },
    create: { id: SINGLETON_ID, username, passwordHash },
  });
}
