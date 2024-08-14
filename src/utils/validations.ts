import * as Yup from 'yup'

export const validateSetup = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.mixed().required('Image is required'),
  status: Yup.string().required('Status is required'),
})

export const validateTemplate = Yup.object().shape({
  schoolName: Yup.string().required('School name is required'),
          logoUrl: Yup.mixed().required('Logo is required'),
          homePage: Yup.mixed().required('Home page img is required'),
          aboutUs: Yup.mixed().required('About us img is required'),
          loginBackground: Yup.mixed().required('Login background img is required'),
          phoneNumber: Yup.string().required('Phone number is required'),
          email: Yup.string().required('Email is required'),
          address: Yup.string().required('Address is required'),
})