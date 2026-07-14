import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setSessionCookie } from "@/lib/auth";
import { getAdminCredentials } from "@/lib/admin-account";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const credentials = await getAdminCredentials();

  if (!credentials) {
    return NextResponse.json(
      { error: "관리자 계정이 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username !== credentials.username ||
    !(await bcrypt.compare(password, credentials.passwordHash))
  ) {
    return NextResponse.json(
      { error: "아이디 또는 비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  await setSessionCookie();
  return NextResponse.json({ ok: true });
}
