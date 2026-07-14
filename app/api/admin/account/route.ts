import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAdminCredentials, updateAdminCredentials } from "@/lib/admin-account";

export async function GET() {
  const credentials = await getAdminCredentials();
  return NextResponse.json({ username: credentials?.username ?? "" });
}

export async function PATCH(request: NextRequest) {
  const { currentPassword, newUsername, newPassword } = await request.json();

  if (
    typeof currentPassword !== "string" ||
    typeof newUsername !== "string" ||
    typeof newPassword !== "string"
  ) {
    return NextResponse.json({ error: "입력값이 올바르지 않습니다." }, { status: 400 });
  }

  const trimmedUsername = newUsername.trim();
  if (!trimmedUsername) {
    return NextResponse.json({ error: "새 아이디를 입력해주세요." }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json(
      { error: "새 비밀번호는 8자 이상이어야 합니다." },
      { status: 400 }
    );
  }

  const credentials = await getAdminCredentials();
  if (
    !credentials ||
    !(await bcrypt.compare(currentPassword, credentials.passwordHash))
  ) {
    return NextResponse.json(
      { error: "현재 비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  await updateAdminCredentials(trimmedUsername, newPassword);
  return NextResponse.json({ ok: true });
}
