const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')
const cheerio = require('cheerio')
const message = require('./messages')
const settings = require('./settings')
const assert = require('assert')


const bot = new TelegramBot(settings.token, { polling: true })


bot.onText(/\/pesquisa (.+)/, (msg, match) => {
  let text = match[1]
  text = text.replace(/ /g, '+')
  console.log('entrei aqui')
  let list = ''
  axios.get('https://manjariando.wordpress.com/?s=' + text).then((response) => {
    if (response.status === 200) {
      const html = response.data
      const $ = cheerio.load(html)

      $('article').each(function (i, elem) {
        list = list + '**_' + $(this).find('h2').text().trim() + '_**\n' + 'link: ' + $(this).find('a').attr('href') + '\n\n'
      })

      if (list === '') {
        const userID = msg.from.id
        bot.sendMessage(msg.chat.id, 'Não foram encontrados resultados para a pesquisa.', { parse_mode: 'Markdown' }).catch((error) => { bot.sendMessage(msg.chat.id, 'Ocorreu um erro durante a busca.') })

      } else {
        const userID = msg.from.id
        bot.sendMessage(msg.chat.id, list, { parse_mode: 'Markdown' }).catch((error) => { bot.sendMessage(msg.chat.id, 'Ocorreu um erro durante a busca.') })

      }
      console.log('Resposta Enviada.')
    }
  }, (error) => {
    console.log('Ocorreu um erro durante a busca.')
  })
})
