import { v2 as cloudinary } from "cloudinary"

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET

let configured = false

function ensureConfigured() {
  if (configured) return
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    throw new Error(
      "CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET must be set"
    )
  }
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true,
  })
  configured = true
}

export interface UploadedPdf {
  secureUrl: string
  publicId: string
}

export async function uploadResumePdf(
  userId: string,
  resumeId: string,
  versionNum: number,
  pdf: Buffer
): Promise<UploadedPdf> {
  ensureConfigured()

  const publicId = `resumes/${userId}/${resumeId}/v${versionNum}`

  return new Promise<UploadedPdf>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        public_id: publicId,
        overwrite: true,
        format: "pdf",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed with no result"))
          return
        }
        resolve({ secureUrl: result.secure_url, publicId: result.public_id })
      }
    )
    uploadStream.end(pdf)
  })
}
