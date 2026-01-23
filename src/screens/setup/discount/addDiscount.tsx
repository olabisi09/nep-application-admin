import { FC } from 'react';

import { Form, Formik } from 'formik';
import { useAtomValue } from 'jotai';
import * as Yup from 'yup';

import { Button } from '../../../custom';
import Input from '../../../custom/input/input';
import Select from '../../../custom/select/select';
import { useCreateDiscountMutation } from '../../../hooks/api/useCreateDiscountMutation';
import { useEditDiscountMutation } from '../../../hooks/api/useEditDiscountMutation';
import { useGetAllApplicationBatchQuery } from '../../../hooks/api/useGetAllApplicationBatchQuery';
import { StatusOptions } from '../../../requests';
import { isEditAtom } from '../../../utils/store';
import { validator } from '../../../utils/validator';

interface ComponentProps {
  record: Discount;
  handleClose: () => void;
}

const AddDiscount: FC<ComponentProps> = ({ record, handleClose }) => {
  const isEdit = useAtomValue(isEditAtom);

  const { applicationBatchData } = useGetAllApplicationBatchQuery();
  const { createDiscountHandler, isLoading } = useCreateDiscountMutation(handleClose);
  const { editDiscountHandler, isEditLoading } = useEditDiscountMutation(record?.id || 0, handleClose);

  const validationSchema = Yup.object().shape({
    discountName: validator.discountName,
    discountCode: validator.discountCode,
    discountType: validator.discountType,
    discountAmount: validator.discountAmount,
    cap: validator.cap,
    couponUseLimit: validator.couponUseLimit,
    applicationBatch: validator.applicationBatch,
    status: validator.status,
  });

  const hasRecord = Object.keys(record)?.length > 0;

  const discountType = [
    { label: 'Percentage', value: 'PERCENTAGE' },
    { label: 'Fixed Amount', value: 'FIXED' },
  ];

  const applicationBatchOptions = applicationBatchData?.map((item) => (
    <option key={item?.id} value={item?.id}>
      {item?.batchName}
    </option>
  ));

  const discountTypeOptions = discountType?.map((item) => (
    <option key={item?.label} value={item?.value}>
      {item?.value}
    </option>
  ));

  return (
    <Formik
      initialValues={{
        discountName: record?.name || '',
        discountCode: record?.code || '',
        discountType: record?.discountType || '',
        discountAmount: record?.discountAmount || '',
        cap: record?.capAmount || '',
        couponUseLimit: record?.couponUseLimit || '',
        applicationBatch: record?.applicationBatchId?.toString() || '',
        status: record?.activeStatus?.toString() || '',
      }}
      onSubmit={(values, { resetForm }) => {
        if (isEdit) {
          editDiscountHandler(values, resetForm);
        } else {
          createDiscountHandler(values, resetForm);
        }
      }}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {() => {
        return (
          <Form>
            <section className="fields">
              <Input name="discountName" placeholder="Enter discount name" label="Discount Name" />
              <Input name="discountCode" placeholder="Enter discount code" label="Discount Code" />

              <Select
                name="discountType"
                placeholder="Select Discount Type"
                label="Discount Type"
                options={discountTypeOptions}
              />

              <Input name="discountAmount" placeholder="0.00" label="Discount Amount" />
              <Input name="cap" placeholder="0.00" label="Cap (Highest Limit)" />
              <Input name="couponUseLimit" placeholder="0.00" label="Coupon Use Limit" />

              <Select
                name="applicationBatch"
                placeholder="Select Application Batch"
                label="Application Batch"
                options={applicationBatchOptions}
              />

              <Select
                name="status"
                placeholder="Select Status"
                label="Status"
                options={
                  <>
                    {StatusOptions.map((option: any) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </>
                }
              />

              <div className="btn-group">
                <Button type="button" variant="text" text="Cancel" onClick={handleClose} />

                <Button
                  type="submit"
                  disabled={isEdit ? isEditLoading : isLoading}
                  isLoading={isEdit ? isEditLoading : isLoading}
                  text={hasRecord ? 'Update' : 'Create'}
                />
              </div>
            </section>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddDiscount;
