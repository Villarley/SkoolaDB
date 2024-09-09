import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator"
import LinkType from "@/Enum/LinkType"

export class CreateLinkDto {
  @IsNotEmpty()
  @IsEnum(LinkType)
  LinkType: LinkType

  @ValidateIf(o => o.linkType === LinkType.EXTERNALLINK)
  @IsString()
  @IsNotEmpty()
  Link: string

  @ValidateIf(o => o.linkType === LinkType.FILE)
  @IsOptional()
  File: Express.Multer.File

  @IsNotEmpty()
  @IsString()
  HandableId: string
}
