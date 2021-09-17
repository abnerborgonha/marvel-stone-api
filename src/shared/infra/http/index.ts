import Server from './Server'

const server = new Server()

const port = 3333

server.api.listen(port, () => {
  // eslint-disable-next-line
  console.log(`listening in port ${port} 💎`)
})
