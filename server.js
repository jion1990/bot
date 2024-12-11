const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

// استبدل "YOUR_BOT_TOKEN" بالتوكين الخاص بك
const bot = new TelegramBot('7905497608:AAFMpwd-SvRoGrSHRoE0VbZMyrFl_F18qTc', { polling: false });

// تحديد عنوان URL لتطبيق Vercel
const URL = 'https://bot-r6x8hneen-jionbofis-projects.vercel.app';  // استبدل بهذا الرابط

// إعداد Webhook
bot.setWebHook(`${URL}/bot7905497608:AAFMpwd-SvRoGrSHRoE0VbZMyrFl_F18qTc`);

// إنشاء تطبيق Express
const app = express();
app.use(express.static('public'));

// معالجة بيانات JSON الواردة من Telegram
app.use(bodyParser.json());


// التعامل مع طلبات Webhook من Telegram
app.post(`/bot7905497608:AAFMpwd-SvRoGrSHRoE0VbZMyrFl_F18qTc`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// عند بدء المحادثة
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "مرحبًا! أنا بوت التوصيات التقنية. اكتب /recommend للحصول على توصيات.");
});

// عند طلب التوصيات
bot.onText(/\/recommend/, (msg) => {
    let response = "إليك بعض التوصيات:\n";
    response += `1. [هاتف ذكي](https://s.click.aliexpress.com/e/_example1)\n`;
    response += `2. [سماعات بلوتوث](https://s.click.aliexpress.com/e/_example2)\n`;
    response += `3. [كاميرا رقمية](https://s.click.aliexpress.com/e/_example3)\n`;
    bot.sendMessage(msg.chat.id, response, { parse_mode: 'Markdown' });
});

// تشغيل الخادم على Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
