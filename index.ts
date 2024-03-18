import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) throw new Error("BOT_TOKEN not found");

const bot = new Telegraf(BOT_TOKEN);

bot.command("todo", async (ctx) => {
  let taskMsg = ctx.message.text.replace(/\/todo/g, "").trim();

  if (!taskMsg) {
    await ctx.deleteMessage();
    ctx.reply("Задача пустая, напиши после команды что нужно 🙄");

    return;
  }

  const inlineKeyboard = [[{ text: "Done ✅", callback_data: "done-0" }]];

  ctx.reply(`ок, записал`, {
    disable_notification: true,
    reply_parameters: {
      message_id: ctx.message.message_id,
    },
    reply_markup: {
      inline_keyboard: inlineKeyboard,
    },
  });
});

bot.on(message("text"), async (ctx) => {
  const messageText = ctx.message.text;
  const msg = messageText.toLowerCase();

  if (!msg.startsWith("степа") && !msg.startsWith("напомни")) return;
  if (msg.split(" ").length <= 1) return;

  const inlineKeyboard = [[{ text: "Done ✅", callback_data: "done-0" }]];

  ctx.reply(`ок, записал`, {
    disable_notification: true,
    reply_parameters: {
      message_id: ctx.message.message_id,
    },
    reply_markup: {
      inline_keyboard: inlineKeyboard,
    },
  });
});

bot.action("done-0", async (ctx) => {
  const newKeyboard = [[{ text: "Undone 🔄", callback_data: `undone-0` }]];

  const targetMessage = ctx.update.callback_query.message;
  if (!targetMessage) throw new Error("not found reply message");

  if ("text" in targetMessage) {
    const newMessageText = `<s>сделано</s>`;

    await ctx.editMessageText(newMessageText, {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: newKeyboard },
    });
  }
});

bot.action("undone-0", async (ctx) => {
  const newKeyboard = [[{ text: "Done ✅", callback_data: "done-0" }]];

  const targetMessage = ctx.update.callback_query.message;
  if (!targetMessage) throw new Error("not found reply message");

  if ("text" in targetMessage) {
    await ctx.editMessageText("все еще не сделано", {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: newKeyboard },
    });
  }
});

const helpMsg = `Command reference:
/create - Create todo task
/help - Show this help page
`;

bot.command("help", (ctx) => {
  ctx.reply(helpMsg);
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
