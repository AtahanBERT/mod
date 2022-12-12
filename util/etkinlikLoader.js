const reqEvent = (event) => require(`../etkinlik/${event}`);
module.exports = client => {
  client.on('messageCreate', reqEvent('mesaj'))
};
