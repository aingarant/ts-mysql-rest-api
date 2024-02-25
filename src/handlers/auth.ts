import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import db from "../lib/config/db"
import { RowDataPacket } from "mysql2"
import { UserResponse } from "../lib/types/userTypes"

export const getUserByEmail = async (
  email: string
): Promise<UserResponse | null> => {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT id, email, password FROM users WHERE email = ?",
    [email]
  )
  if (rows.length === 0) {
    return null
  }
  return rows[0] as UserResponse
}

const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    let foundUser = await getUserByEmail(email)
    if (!foundUser) {
      return res.status(400).json({ message: "Invalid credentials" })
    }
    const isMatch = await bcrypt.compare(password, foundUser.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }
    const payload = {
      user: {
        id: foundUser.id,
      },
    }
    jwt.sign(
      payload,
      process.env.JWT_SECRET || "",
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err: unknown) {
    console.error((err as Error).message)
    res.status(500).send("Server error")
  }
}
