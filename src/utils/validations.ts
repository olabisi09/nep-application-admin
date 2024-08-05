import * as Yup from 'yup'

export const validateSetup = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.mixed().required('Image is required'),
  status: Yup.string().required('Status is required'),
})