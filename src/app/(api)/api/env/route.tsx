import { NextResponse } from "next/server";
import { getCloudflareContext } from '@opennextjs/cloudflare'

// eslint-disable-next-line
export async function GET() {

  const { env } = await getCloudflareContext()

  return NextResponse.json({
    env: process.env,
    // envFromCloudflare: env,
    TEST_VAR_FROM_CLOUDFLARE: env?.TEST_VAR || "",
    TEST_VAR_FROM_PROCESS_ENV: process?.env?.TEST_VAR || "",
  });
}
