interface Response {
  statusCode: number;
  message: string;
}

interface GetResponse extends Response {
  data: Setup[]
}

interface AboutUs {
id: number;
title: string;
description: string;
imageUrl: string;
activeStatus: boolean;
isDeleted: boolean;
}

interface SessionResponse extends Response {
  data: Session[]
}

interface Session {
  id: number
  name: string
  activeStatus: boolean
  isDeleted: boolean
}

interface CategoryResponse extends Response{
  data: Category[]
}

interface Category {
  categoryCode: string
  name: string
  description: string
  id: number
  created: string
  createdBy: any
  activeStatus: boolean
}

interface LevelResponse extends Response {
  data: Level[]
}

interface Level {
  id: number
  levelName: string
  isActive: boolean
  isDeleted: boolean
}

interface TuitionResponse extends Response {
  data: Tuition[]
}

interface Tuition {
  id: number
  readmoreId: number
  description: string
  activeStatus: boolean
}

interface TuitionYearResponse extends Response{
  data: TuitionYear[]
}

interface TuitionYear {
  id: number
  tuitionId: number
  levelId: number
  readmoreId: number
  feeDescription: string
  isActive: boolean
  isDeleted: boolean
}

interface SocialMediaResponse extends Response {
  data: SocialMedia[]
}

interface Setup {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface SetupPayload {
  Id: number;
  Title: string;
  Description: string;
  ImageUrl: string;
  Image: any;
  ActiveStatus: boolean;
  IsDeleted: boolean;
}

interface SocialMedia {
  id: number;
  templateId: number;
  socialMediaName: string;
  socialMediaUrl: string;
  activeStatus: boolean;
  isDeleted: boolean;
}
interface GenderResponse extends Response {
  data: Gender[]
}

interface Gender {
  id: number;
  genderName: string;
activeStatus: boolean;
}
interface MaritalStatusResponse extends Response {
  data: MaritalStatus[]
}

interface MaritalStatus {
  id?: number;
  statusName: string;
activeStatus?: boolean;
}

interface CountryResponse extends Response {
  data: Country[]
}

interface Country {
  id?: number;
  countryName: string;
activeStatus?: boolean;
}
