import type { NextApiRequest, NextApiResponse } from 'next'

type UserData = {
  name: string
  email: string
  password: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const userData: UserData = req.body
  
    //validation
    if(!userData.name || !userData.email || !userData.password) {
      res.status(400).json({
        message: 'Please fill all required fields'
      })
      return
    }
    //check password length
    if(userData.password.length < 6) {
      res.status(400).json({
        message: 'Password should be at least 6 characters long'
      })
    }
  
    res.status(200).json({ 
      message: 'Registration successful' ,
      userData
    })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
}
