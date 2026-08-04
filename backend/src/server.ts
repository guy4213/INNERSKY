import 'dotenv/config'
import app from './app'
import { startPurgeJob } from './jobs/purgeOldSubmissions'

const PORT = process.env.PORT ?? 8080

app.listen(PORT, () => {
  console.log(`InnerSky backend listening on port ${PORT}`)
  startPurgeJob()
})
