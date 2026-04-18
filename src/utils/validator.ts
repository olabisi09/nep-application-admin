import { string } from 'yup';
import * as Yup from 'yup';

export const validator = {
  programName: string().required('Department Name is required'),
  programType: string().required('Program Type is required'),
  status: string().required('Status is required'),
  description: string().required('Description is required'),
  title: string().required('Title is required'),
  file: Yup.mixed().required('A File is required'),
  amount: Yup.number().required('An Amount is required'),
  modeOfStudy: string().required('Mode of study is required'),
  applicationBatch: string().required('Application Batch is required'),
  session: string().required('Session is required'),
  program: string().required('Program is required'),
  codeName: string().required('Code name is required'),
  codeValue: string().required('Code value is required'),
  admissionReqDetailName: string().required('Admission requirement detail name is required'),
  careerProspectItemName: string().required('Career prospect item name is required'),
  tabNumber: Yup.number().required('Tab number is required'),
  tabName: string().required('Tab name is required'),
  email: string().email('Invalid email Address').required('Email Address  is required'),
  password: string()
    .required('Password is required')
    .max(20, 'Password must have a maximum length of 20 characters')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/, 'Password must have Upper case, Lower case and number '),

  newPassword: string()
    .required('Password is required')
    .max(20, 'Password must have a maximum length of 20 characters')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/, 'Password must have Upper case, Lower case and number '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Enter Confirm Password'),
  startDate: Yup.date()
    .required('Start Date is required')
    .transform((value) => (value ? new Date(value) : null)) // Ensure date is parsed
    .typeError('Invalid date format'),
  endDate: Yup.date()
    .required('End Date is required')
    .transform((value) => (value ? new Date(value) : null))
    .typeError('Invalid date format')
    .min(Yup.ref('startDate'), 'End Date cannot be before Start Date'),
  lateApplicationStartDate: Yup.date()
    .required('Late Application Start Date is required')
    .transform((value) => (value ? new Date(value) : null))
    .typeError('Invalid date format')
    .min(Yup.ref('startDate'), 'Late Application Start Date cannot be before Start Date')
    .max(Yup.ref('endDate'), 'Late Application Start Date cannot be after End Date'),
  lateApplicationEndDate: Yup.date()
    .required('Late Application End Date is required')
    .transform((value) => (value ? new Date(value) : null))
    .typeError('Invalid date format')
    // .min(
    //   Yup.ref("lateApplicationStartDate"),
    //   "Late Application End Date cannot be before Late Application Start Date"
    // )
    .max(Yup.ref('endDate'), 'Late Application End Date cannot be after End Date'),
  applicationStartDate: Yup.date()
    .required('Application Start Date is required')
    .transform((value) => (value ? new Date(value) : null))
    .typeError('Invalid date format'),
  applicationEndDate: Yup.date()
    .required('Application End Date is required')
    .transform((value) => (value ? new Date(value) : null))
    .typeError('Invalid date format')
    .min(Yup.ref('applicationStartDate'), 'Application End Date cannot be before Application Start Date'),

  lateRegStartDate: Yup.date()
    .required('Late Application Start Date is required')
    .transform((value) => (value ? new Date(value) : null))
    .typeError('Invalid date format')
    .min(Yup.ref('applicationStartDate'), 'Late Application Start Date cannot be before Application Start Date')
    .max(Yup.ref('applicationEndDate'), 'Late Application Start Date cannot be after Application End Date'),

  lateRegEndDate: Yup.date()
    .required('Late Application End Date is required')
    .transform((value) => (value ? new Date(value) : null))
    .typeError('Invalid date format')
    .min(Yup.ref('lateRegStartDate'), 'Late Application End Date cannot be before Late Application Start Date')
    .max(Yup.ref('applicationEndDate'), 'Late Application End Date cannot be after Application End Date'),
  discountName: string().required('Discount name is required'),
  discountCode: string()
    .required('Discount code is required')
    .min(5, 'Discount code must be at least 5 characters')
    .max(10, 'Discount code must be at most 10 characters')
    .matches(/^[A-Z0-9_-]+$/i, 'Discount code can contain letters, numbers, dash or underscore'),
  discountType: string().required('Discount type is required'),
  discountAmount: Yup.number()
    .required('Discount amount is required')
    .typeError('Discount amount must be a number')
    .min(0, 'Discount amount cannot be negative'),
  cap: Yup.number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .typeError('Cap must be a number')
    .min(0, 'Cap cannot be negative'),
  couponUseLimit: Yup.number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .typeError('Coupon use limit must be a number')
    .integer('Coupon use limit must be an integer')
    .min(0, 'Coupon use limit cannot be negative'),
  acceptanceFee: Yup.number().required('Acceptance Fee is required'),
};
