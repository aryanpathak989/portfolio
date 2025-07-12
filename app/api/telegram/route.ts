// File: app/api/telegram/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { firstName, email, projectBudget, aboutProject } = data;

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
  const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID!;

  if (!BOT_TOKEN || !CHANNEL_ID) {
    return NextResponse.json({ error: "Missing token or channel ID" }, { status: 500 });
  }

  const message = `
📢 *New Project Inquiry!*
👤 *Name:* ${firstName}
✉️ *Email:* ${email}
💰 *Budget:* $${projectBudget}
📝 *Project Details:*
${aboutProject}
  `;

  const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const response = await fetch(telegramUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHANNEL_ID,
      text: message,
      parse_mode: "Markdown",
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    return NextResponse.json({ error: "Failed to send message", details: error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
