// require("dotenv").config();
import OpenAI from "openai"
import express from "express"
import cors from "cors"


const app = express()
app.use(cors())
app.use(express.json())


const OPENAI_API_KEY = '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'

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});


app.post('/images', async (req,res) => {
  try {
    const response = await openai.images.generate({
      model:"dall-e-2",
      prompt: req.body.message,
      n: 1,
      size: "1024x1024"
    })

    

    console.log({ imageUrl: response.data[0].url })
    res.send({ imageUrl: response.data[0].url })
  } catch(error){
    console.error(error)
  }
})

const port = process.env.PORT || 3003

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
