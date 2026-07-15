import { prisma } from "@/lib/db";

export async function getHistoryEntries() {
  return prisma.historyEntry.findMany({
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });
}

export async function getHistoryEntryById(id: number) {
  return prisma.historyEntry.findUnique({ where: { id } });
}

export async function createHistoryEntry(data: {
  year: string;
  content: string;
  imageUrl?: string | null;
  order?: number;
}) {
  return prisma.historyEntry.create({
    data: {
      year: data.year,
      content: data.content,
      imageUrl: data.imageUrl ?? null,
      order: data.order ?? 0,
    },
  });
}

export async function updateHistoryEntry(
  id: number,
  data: Partial<{
    year: string;
    content: string;
    imageUrl: string | null;
    order: number;
  }>
) {
  return prisma.historyEntry.update({ where: { id }, data });
}

export async function deleteHistoryEntry(id: number) {
  return prisma.historyEntry.delete({ where: { id } });
}

export function parseHistoryLines(content: string): string[] {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
