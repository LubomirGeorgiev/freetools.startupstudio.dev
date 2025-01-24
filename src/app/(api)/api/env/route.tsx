import { NextResponse } from "next/server";
import { getCloudflareContext } from '@opennextjs/cloudflare'

// eslint-disable-next-line
export async function GET() {

  const { env } = await getCloudflareContext()

  return NextResponse.json({
    env: process.env,
    // envFromCloudflare: env,
    TEST_VAR_FROM_CLOUDFLARE: env.TEST_VAR || "",
    EMAIL_REPLY_TO: env.EMAIL_REPLY_TO || "",
    GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID || "",
    TEST_VAR_FROM_PROCESS_ENV: process.env.TEST_VAR || "",
  });
}
