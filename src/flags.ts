import { cache } from "react"
import "server-only"

import { getCloudflareContext } from "@opennextjs/cloudflare"

export async function isGoogleSSOEnabled() {

  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
}

export async function isTurnstileEnabled() {
  const { env } = await getCloudflareContext()
  return Boolean(env.TURNSTILE_SECRET_KEY)
}

export const getConfig = cache(async () => {
  return {
    isGoogleSSOEnabled: await isGoogleSSOEnabled(),
    isTurnstileEnabled: await isTurnstileEnabled(),
  }
})
