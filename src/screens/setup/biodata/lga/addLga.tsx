import React, { useState, useEffect } from 'react';
import Input from "../../../../custom/input/input";
import { Form, Formik, FormikValues } from "formik";
import Button from "../../../../custom/button/button";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import {
  StatusOptions,
  createOrUpdateLGA,
  createOrUpdateState,
  getCountry,
  getState,
  getStateByCountryId,
} from "../../../../requests";
import * as Yup from "yup";
import { App } from "antd";
import Select from "../../../../custom/select/select";

interface Props {
  data?: LGA;
  handleClose: () => void;
}

const AddLga = ({ handleClose, data }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const [selectedCountry, setSelectedCountry] = useState<number>(0);
  const [stateOptions, setStateOptions] = useState<any[]>([]);

  const CreateLgaMutation = useMutation({
    mutationFn: createOrUpdateLGA,
    mutationKey: ["create-Lga"],
  });

  const CreateLgaHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<LGA> = {
      id: data?.id || 0,
      stateId: 5,
      activeStatus: values?.status === "true",
      countryId: values?.countryName,
      lgaName: values?.lgaName,
    };

    try {
      await CreateLgaMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-lga"],
          });
          handleClose();
          resetForm();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  const [getCountryQuery, getStateQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-counties"],
        queryFn: getCountry,
        refetchOnWindowFocus: false,
        retry: 0,
        enabled: true,
      },
      {
        queryKey: ["get-state-by-country-id"],
        queryFn: () => getStateByCountryId(selectedCountry),
        refetchOnWindowFocus: false,
        retry: 0,
        enabled: selectedCountry !== 0,
      },
    ],
  });

  useEffect(() => {
    if (selectedCountry) {
      // Fetch states when a country is selected
      getStateQuery.refetch();
    }
  }, [selectedCountry]);

  const CountryData = getCountryQuery?.data?.data as Country[];

  const CountryOptions: any =
    CountryData &&
    CountryData?.length > 0 &&
    CountryData?.map((item: any, index: number) => (
      <option value={item?.id} key={index}>
        {item?.countryName}
      </option>
    ));

  const StateData = getStateQuery?.data?.data as State[];

  useEffect(() => {
    if (StateData) {
      setStateOptions(StateData);
    }
  }, [StateData]);

  const StateOptions: any =
    stateOptions &&
    stateOptions?.length > 0 &&
    stateOptions?.map((item: any, index: number) => (
      <option value={item?.id} key={index}>
        {item?.stateName}
      </option>
    ));

  const validationSchema = Yup.object().shape({
    countryName: Yup.string().required("Country is required"),
    // stateName: Yup.string().required("State is required"),
    lgaName: Yup.string().required("Lga is required"),
    status: Yup.string().required("Active Status is required"),
  });
  console.log(selectedCountry, 'sed')

  return (
    <Formik
      initialValues={{
        lgaName: data?.lgaName || "",
        countryName: data?.countryId || "",
        stateName: data?.stateId || "",
        status: data?.activeStatus !== undefined ? String(data?.activeStatus) : "",
      }}
      onSubmit={(values, { resetForm }) => {
        CreateLgaHandler(values, resetForm);
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, setFieldValue }) => {
        return (
          <Form className="fields">
            <Select
              name="countryName"
              placeholder="Input Country Name"
              label="Country Name"
              options={CountryOptions}
              onChange={(e) => {
                const countryId = e.target.value;
                setSelectedCountry(parseInt(countryId));
                setFieldValue('countryName', countryId);
                setFieldValue('stateName', ''); // Reset state on country change
              }}
            />
            <Select
              name="stateName"
              placeholder="Input State/Province/District Name"
              label="State/Province/District Name"
              options={StateOptions}
              onChange={(e) => setFieldValue('stateName', e.target.value)}
            />
            <Input
              name="lgaName"
              placeholder="Input LGA Name"
              label="LGA Name"
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
              onChange={(e) => setFieldValue('status', e.target.value)}
            />
            <div className="btn-group">
              <Button onClick={handleClose} variant="text" text="Cancel" />
              <Button
                onClick={handleSubmit as any}
                disabled={CreateLgaMutation?.isPending}
                text={
                  data
                    ? (CreateLgaMutation?.isPending ? 'Updating' : 'Update')
                    : (CreateLgaMutation?.isPending ? 'Creating' : 'Create')
                }
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddLga;
