const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const TOKEN = '7905497608:AAFMpwd-SvRoGrSHRoE0VbZMyrFl_F18qTc'; // استبدل بـ Token الخاص بك
const URL = 'https://bot-hx82j9cq7-jionbofis-projects.vercel.app'; // استبدل باسم النطاق الخاص بتطبيقك في Vercel

const bot = new TelegramBot(TOKEN, { webHook: true });
const app = express();

// إعداد Webhook
bot.setWebHook(`${URL}/bot${TOKEN}`);

// تحليل بيانات JSON
app.use(express.json());

// معالجة طلبات Webhook
app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// قائمة المنتجات مع روابط الإحالة
const products = [
    { name: "هاتف ذكي", link: "https://s.click.aliexpress.com/e/_example1" },
    { name: "سماعات بلوتوث", link: "https://s.click.aliexpress.com/e/_example2" },
    { name: "كاميرا رقمية", link: "https://s.click.aliexpress.com/e/_example3" },
];

// عند بدء المحادثة
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "مرحبًا! أنا بوت التوصيات التقنية. اكتب /recommend للحصول على توصيات.");
});

// عند طلب التوصيات
bot.onText(/\/recommend/, (msg) => {
    let response = " إليك بعض التوصيات مع الطعام الساخن:\n\n";
    products.forEach((product, index) => {
        response += `${index + 1}. [${product.name}](${product.link})\n`;
    });
    bot.sendMessage(msg.chat.id, response, { parse_mode: 'Markdown' });
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

