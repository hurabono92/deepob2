import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const validUsername = process.env.ADMIN_USERNAME;
  const passwordHashB64 = process.env.ADMIN_PASSWORD_HASH_B64;
  const passwordHash = passwordHashB64
    ? Buffer.from(passwordHashB64, "base64").toString("utf-8")
    : undefined;

  if (!validUsername || !passwordHash) {
    return NextResponse.json(
      { error: "관리자 계정이 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username !== validUsername ||
    !(await bcrypt.compare(password, passwordHash))
  ) {
    return NextResponse.json(
      { error: "아이디 또는 비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  await setSessionCookie();
  return NextResponse.json({ ok: true });
}
