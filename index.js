const express = require('express');
const { Telegraf } = require('telegraf');

// ТОКЕН ВАШЕГО БОТА
const BOT_TOKEN = '8921375932:AAEqxFCBMwLnSomskDclTb_Ch-IF3b2hI5I';

const bot = new Telegraf(BOT_TOKEN);
const app = express();

// Настройка Webhook для Vercel
app.use(express.json());

// Обработчик команды /start
bot.start((ctx) => {
    // Получаем параметр после ?start=
    const startParam = ctx.message.text.replace('/start', '').trim();
    const ref = startParam.startsWith('ref_') ? startParam : null;
    
    console.log(`Пользователь ${ctx.from.id} зашёл с рефералом: ${ref}`);
    
    // Отправляем приветствие с кнопкой Web App
    ctx.reply(
        `🎮 Добро пожаловать в игру!\n\n` +
        (ref ? `👤 Вы приглашены пользователем: ${ref}\n` : '') +
        `👇 Нажмите на кнопку ниже, чтобы открыть игру.`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { 
                            text: '🚀 ЗАПУСТИТЬ ИГРУ 🚀', 
                            web_app: { url: 'https://shaxter-5.vercel.app' } 
                        }
                    ]
                ]
            }
        }
    );
});

// Обработчик команды /help
bot.help((ctx) => {
    ctx.reply('🤖 Команды бота:\n/start - начать игру\n/help - помощь');
});

// Вебхук для Vercel
app.post('/webhook', (req, res) => {
    bot.handleUpdate(req.body, res);
    res.status(200).send('OK');
});

// Для локального запуска (не используется на Vercel)
if (process.env.NODE_ENV !== 'production') {
    bot.launch();
    console.log('Бот запущен локально');
}

// Экспортируем app для Vercel
module.exports = app;
