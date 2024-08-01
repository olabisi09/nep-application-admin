interface Response {
  statusCode: number;
  message: string;
}

interface AboutUsResponse extends Response {
  data: AboutUs[]
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

