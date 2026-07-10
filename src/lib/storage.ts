import { put } from "@vercel/blob"

export async function uploadResumePdf(
  resumeId: string,
  versionNum: number,
  pdf: Buffer
): Promise<string> {
  const blob = await put(`resumes/${resumeId}/v${versionNum}.pdf`, pdf, {
    access: "public",
    contentType: "application/pdf",
  })
  return blob.url
}
