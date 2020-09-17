import dotenv from 'dotenv'

dotenv.config()

function getFromEnv(name: string): string {
  if (!process.env[name]) throw Error(`Required env ${name}`)
  return process.env[name] as string
}

export default function config() {
    return {
      port: getFromEnv('SERVER_PORT')
    }
}
