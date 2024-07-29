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
image?: any;
imageUrl: string;
activeStatus: boolean;
isDeleted: boolean;
}