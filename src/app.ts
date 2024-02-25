import express, { Application, Request, Response } from "express"
import morgan from "morgan"
import UserRoute from "./routes/user"

const app: Application = express()
const port = process.env.PORT || 4000

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response) => {
  res.send("Aingaran's Express MySQL REST API")
})

app.use("/user", UserRoute)

app.post("/login")

app.get("*", (req: Request, res: Response) => {
  res.send("Page not found")
})

app.listen(4000, () => {
  console.log("Server is running on port 5000")
})
