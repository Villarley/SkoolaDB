import B2 from 'backblaze-b2'
import dotenv from 'dotenv'
dotenv.config()

const applicationKey:string = process.env["B2_APPLICATION_KEY"] || ""
const applicationKeyId:string = process.env["B2_APPLICATION_KEY_ID"] || ""

const b2 = new B2({
  applicationKeyId: applicationKeyId!,
  applicationKey: applicationKey!
})

export default b2
