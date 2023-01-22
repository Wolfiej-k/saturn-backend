import express, { Request, Response } from "express"
import Jupiter from "jupiter-api"

class Server {
    private jupiter
    private port
    private app

    constructor(jupiter: Jupiter, port: number) {
        this.jupiter = jupiter
        this.port = port
        this.app = express()
        this.initialize()
        this.routes()
    }

    private initialize(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.listen(this.port, () => {
            console.log(`Successfully listening on port ${this.port}`)
        })
    }

    private routes(): void {
        this.app.get('*', (req: Request, res: Response) => {
            console.log(`Get request: ${req.body}`)
            res.send('404: Forbidden')
        })

        this.app.post('/student', (req: Request, res: Response) => {
            console.log(`Post request to /student: ${req.body}`)

            if (this.valid(req.body)) {
                this.jupiter.request({
                    id: req.body.id,
                    password: req.body.password,
                    school: req.body.school,
                    city: req.body.city,
                    state: req.body.state
                }).then(async (scraper) => {
                    const student = await scraper.data()
                    res.send(student.toString())
                })
            } else res.send('400: Bad request')
        })
    }

    private valid(body: Record<string, string>): boolean {
        if ('id' in body && 'password' in body && 'school' in body 
            && 'city' in body && 'state' in body)
                return true
        return false
    }
}

export default Server