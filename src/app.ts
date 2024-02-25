import express, { Application, Request, Response } from "express"
import morgan from "morgan"

const app: Application = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response) => {
  res.send("Aingaran's Express MySQL REST API")
})

app.get("*", (req: Request, res: Response) => {
  res.send("Page not found")
})

app.listen(4000, () => {
  console.log("Server is running on port 5000")
})
