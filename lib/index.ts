import Jupiter from "jupiter-api"
import Server from "./server"

Jupiter.launch().then(async (jupiter) => {
    const port = 3000
    new Server(jupiter, port)
})