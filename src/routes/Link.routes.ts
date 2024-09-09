import { Router, Request, Response } from "express"
import multer from "multer"
import b2 from "@/config/b2Config"
import LinkService from "@/services/Link"
import HandableService from "@/services/Handable"
import { validateJWT } from "@/middlewares/"
import { validateMiddleware } from "@/middlewares/validate"
import { CreateLinkDto } from "@/dto/Link"
import { IdRequest } from "@/interface/requests/constant"

const router = Router()
const linkService = new LinkService()
const handableService = new HandableService()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get("/:Id", validateJWT, async (req: IdRequest, res: Response) => {
  const { Id } = req.params
  try {
    const link = await linkService.getLinkById(Id)
    res.status(200).json(link)
  } catch (error: any) {
    res.status(500).json(error)
  }
})

router.post("/", validateJWT, validateMiddleware(CreateLinkDto), upload.none(), async (req: Request, res: Response) => {
  try {
    const { LinkType, HandableId, File, FileName } = req.body

    const handable = await handableService.getHandableById(HandableId)

    if(!handable)throw new Error("handable not found")

    let savedLink

    if (LinkType === "FILE") {
      if (!File) {
        return res.status(400).json({ error: "No file uploaded" })
      }

      const buffer = Buffer.from(File, 'base64');

      await b2.authorize()
      const response = await b2.getUploadUrl({
        bucketId: process.env["B2_BUCKET_ID"] || ""
      })
      const uploadUrl = response.data.uploadUrl
      const uploadAuthToken = response.data.authorizationToken

      const uploadResponse = await b2.uploadFile({
        uploadUrl,
        uploadAuthToken,
        fileName: `${Date.now()}-${FileName}`,
        data: buffer,
      })


      const publicUrl = `https://f002.backblazeb2.com/file/${process.env["B2_BUCKET_NAME"]}/${uploadResponse.data.fileName}`

      const newLink = {
        Link: publicUrl,
        LinkType: "FILE",
        Handable: handable,
        FileId: uploadResponse.data.fileId,
      }

      savedLink = await linkService.createLink(newLink)
    } else {
      const newLink = {
        Link: req.body.Link,
        LinkType: req.body.LinkType,
        Handable: handable
      }
      savedLink = await linkService.createLink(newLink)
    }

    return res.status(201).json(savedLink)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
})

export default router
