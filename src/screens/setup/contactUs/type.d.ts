interface ContactUsResponse {
  statusCode: number;
  message: string;
  data: ContactUsData[];
}

interface ContactUsData {
  id: number;
  applicantId: string;
  title: string;
  fName: string;
  lName: string;
  email: string;
  phone: string;
  message: string;
}
