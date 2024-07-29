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