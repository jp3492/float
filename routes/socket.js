module.exports = socket => {
  socket.on('request', req => {
    console.log(req.origin);
  })
}
