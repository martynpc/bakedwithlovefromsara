// Cloudflare Email Worker for hello@bakedwithlovefromsara.co.uk
// 1. Forwards every message to Sara's Gmail.
// 2. Sends the sender one short auto-reply saying where Sara will reply from.
// Deployed in the Cloudflare dashboard as the Worker "sara-hello-autoreply".
import { EmailMessage } from "cloudflare:email";

const FORWARD_TO = "saraivana76@gmail.com";
const FROM = "hello@bakedwithlovefromsara.co.uk";
const SUBJECT = "Thank you for your message - Baked with love from Sara";
const BODY = [
  "Thank you for getting in touch with Baked with love from Sara.",
  "",
  "Sára will reply personally from saraivana76@gmail.com, usually within a day or two. Please check your spam folder if you don't see it.",
  "",
  "Baked with love from Sara",
  "https://bakedwithlovefromsara.co.uk",
].join("\r\n");

export default {
  async email(message, env, ctx) {
    // Always deliver to Sara first; if this fails Cloudflare bounces the message
    // rather than losing it silently.
    await message.forward(FORWARD_TO);

    // Never auto-reply to automated mail, mailing lists or no-reply senders
    // (prevents reply loops).
    const msgId = message.headers.get("Message-ID");
    const autoSubmitted = (message.headers.get("Auto-Submitted") || "no").toLowerCase();
    const precedence = (message.headers.get("Precedence") || "").toLowerCase();
    const listId = message.headers.get("List-Id");
    if (
      !msgId ||
      autoSubmitted !== "no" ||
      ["bulk", "list", "junk"].includes(precedence) ||
      listId ||
      /no-?reply|mailer-daemon|postmaster/i.test(message.from)
    ) {
      return;
    }

    const raw = [
      `From: Baked with love from Sara <${FROM}>`,
      `To: ${message.from}`,
      `Subject: ${SUBJECT}`,
      `Message-ID: <${crypto.randomUUID()}@bakedwithlovefromsara.co.uk>`,
      `In-Reply-To: ${msgId}`,
      `References: ${msgId}`,
      `Date: ${new Date().toUTCString()}`,
      "Auto-Submitted: auto-replied",
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=utf-8",
      "Content-Transfer-Encoding: 8bit",
      "",
      BODY,
    ].join("\r\n");

    try {
      await message.reply(new EmailMessage(FROM, message.from, raw));
    } catch (err) {
      // Cloudflare refuses replies to senders that fail DMARC; the forward above
      // has already happened, so just log it.
      console.log("auto-reply skipped:", err && err.message);
    }
  },
};
