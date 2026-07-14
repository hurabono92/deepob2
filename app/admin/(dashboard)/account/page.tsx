"use client";

import { useEffect, useState } from "react";

export default function AdminAccountPage() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/account")
      .then((res) => res.json())
      .then((data) => {
        setCurrentUsername(data.username ?? "");
        setNewUsername(data.username ?? "");
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== newPasswordConfirm) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/admin/account", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newUsername, newPassword }),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "변경에 실패했습니다.");
      return;
    }

    setSuccess("계정 정보가 변경되었습니다. 다음 로그인부터 새 정보를 사용하세요.");
    setCurrentUsername(newUsername.trim());
    setCurrentPassword("");
    setNewPassword("");
    setNewPasswordConfirm("");
  }

  return (
    <div>
      <h1 className="mb-8 text-xl font-bold text-ink">계정 설정</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-sm rounded-xl bg-white p-8 shadow-card"
      >
        <p className="mb-6 text-sm text-ink/50">
          현재 아이디: <span className="font-semibold text-ink">{currentUsername}</span>
        </p>

        {error && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}
        {success && (
          <p className="mb-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
            {success}
          </p>
        )}

        <label className="mb-3 block text-sm">
          <span className="mb-1 block text-ink/60">현재 비밀번호</span>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full rounded-md border border-surface px-3 py-2 outline-none focus:border-primary"
          />
        </label>

        <label className="mb-3 block text-sm">
          <span className="mb-1 block text-ink/60">새 아이디</span>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
            className="w-full rounded-md border border-surface px-3 py-2 outline-none focus:border-primary"
          />
        </label>

        <label className="mb-3 block text-sm">
          <span className="mb-1 block text-ink/60">새 비밀번호 (8자 이상)</span>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
            className="w-full rounded-md border border-surface px-3 py-2 outline-none focus:border-primary"
          />
        </label>

        <label className="mb-6 block text-sm">
          <span className="mb-1 block text-ink/60">새 비밀번호 확인</span>
          <input
            type="password"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            required
            minLength={8}
            className="w-full rounded-md border border-surface px-3 py-2 outline-none focus:border-primary"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-2 text-sm font-bold text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "저장 중..." : "변경 저장"}
        </button>
      </form>
    </div>
  );
}
