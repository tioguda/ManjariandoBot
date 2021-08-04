const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')
const cheerio = require('cheerio')
const message = require('./messages')
const settings = require('./settings')
const assert = require('assert')


const bot = new TelegramBot(settings.token, { polling: true })

bot.on('new_chat_members', (msg) => {
  bot.sendMessage(msg.chat.id, 'Olá ' + msg.from.first_name + ', ' + message.welcome)
})

bot.on('left_chat_member', (msg) => {
  bot.sendMessage(userID, 'Até a próxima ' + msg.from.first_name + '. ' + message.by)
})

bot.onText(/\/pesquisa (.+)/, (msg, match) => {
  let text = match[1]
  text = text.replace(/ /g, '+')
  console.log('entrei aqui')
  let list = ''
  axios.get('https://manjariando.com.br/?s=' + text).then((response) => {
    if (response.status === 200) {
      const html = response.data
      const $ = cheerio.load(html)

      $('article').each(function (i, elem) {
        list = list + '**_' + $(this).find('h2').text().trim() + '_**\n' + 'link: ' + $(this).find('a').attr('href') + '\n\n'
      })

      if (list === '') {
        const userID = msg.from.id
        bot.sendMessage(msg.chat.id, 'Não foram encontrados resultados para a pesquisa.', { parse_mode: 'Markdown' }).catch((error) => { bot.sendMessage(msg.chat.id, message.searcherror) })

      } else {
        const userID = msg.from.id
        bot.sendMessage(msg.chat.id, list, { parse_mode: 'Markdown' }).catch((error) => { bot.sendMessage(msg.chat.id, message.searcherror) })

      }
      console.log('Resposta Enviada.')
    }
  }, (error) => {
    console.log('Ocorreu um erro durante a busca.')
  })
})

bot.onText(/\/comandos/, (msg) => {
  const userID = msg.from.id
  bot.sendMessage(msg.chat.id, message.comandos, { parse_mode: 'Markdown' }).catch((error) => { bot.sendMessage(msg.chat.id, + message.before) })
})

bot.onText(/\/repositorio/, (msg) => {
  const userID = msg.from.id
  bot.sendMessage(msg.chat.id, message.repositorio, { parse_mode: 'Markdown' }).catch((error) => { bot.sendMessage(msg.chat.id, + message.before) })
})

bot.onText(/\/apoiar/, (msg) => {
  const userID = msg.from.id
  bot.sendMessage(msg.chat.id, message.apoiar, { parse_mode: 'Markdown' }).catch((error) => { bot.sendMessage(msg.chat.id, + message.before) })
})

bot.onText(/\/chavegpg/, (msg) => {
  const userID = msg.from.id
  bot.sendMessage(msg.chat.id, message.chavegpg, { parse_mode: 'Markdown' }).catch((error) => { bot.sendMessage(msg.chat.id, + message.before) })
})

bot.onText(/\/dualboot/, (msg) => {
  const userID = msg.from.id
  bot.sendMessage(msg.chat.id, message.dualboot, { parse_mode: 'Markdown' }).catch((error) => { bot.sendMessage(msg.chat.id, + message.before) })
})

bot.onText(/\/grub/, (msg) => {
  const userID = msg.from.id
  bot.sendMessage(msg.chat.id, message.grub, { parse_mode: 'Markdown' }).catch((error) => { bot.sendMessage(msg.chat.id, + message.before) })
})

bot.onText(/\/pastatmp/, (msg) => {
  const userID = msg.from.id
  bot.sendMessage(msg.chat.id, message.pastatmp, { parse_mode: 'Markdown' }).catch((error) => { bot.sendMessage(msg.chat.id, + message.before) })
})

bot.onText(/\/branchcompare/, (msg) => {
  const userID = msg.from.id
  bot.sendMessage(msg.chat.id, message.branchcompare, { parse_mode: 'Markdown' }).catch((error) => { bot.sendMessage(msg.chat.id, + message.before) })
})

bot.onText(/\/mirrorstatus/, (msg) => {
  const userID = msg.from.id
  bot.sendMessage(msg.chat.id, message.mirrorstatus, { parse_mode: 'Markdown' }).catch((error) => { bot.sendMessage(msg.chat.id, + message.before) })
})

bot.onText(/\/regras/, (msg) => {
  const userID = msg.from.id
  bot.sendMessage(msg.chat.id, message.regras, { parse_mode: 'Markdown' }).catch((error) => { bot.sendMessage(msg.chat.id, 'Ei ' + msg.from.first_name + ',' + message.before) })
})
