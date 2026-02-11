import { useState } from 'react';

import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { App, Card, Dropdown, Flex, Input, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { ReactComponent as Search } from '../../../assets/magnifier.svg';
import { ReactComponent as Ellipsis } from '../../../assets/ellipsis.svg';
import { usePagination } from '../../../hooks/usePagination';

import { admitApplicants, downloadStudentUsers, getAllStudentUser } from './request';
import { getAllApplicationBatch, getAllModeOfStudy, getAllPrograms, getAllProgramType } from '../../../requests/index';
import styles from '../styles.module.scss';
import { useDebounce } from '../../../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import Button from '../../../custom/button/button';
import { useDownload } from '../../../hooks/useDownload';

const StudentUser = () => {
  const { notification } = App.useApp();
  const { currentPage, onChange } = usePagination();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ApplicantParams>({
    programId: 0,
    modeOfStudyId: 0,
    programTypeId: 0,
    applicationBatchId: 0,
    name: '',
  });
  const [selectedApplicants, setSelectedApplicants] = useState<React.Key[]>([]);
  const debouncedName = useDebounce(filters.name || '', 500);
  const { downloadExcelFile } = useDownload();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: e.target.value });
  };

  const downloadApplicantsMutation = useMutation({
    mutationFn: downloadStudentUsers,
  });
  const admitApplicantsMutation = useMutation({
    mutationFn: admitApplicants,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['get-student-users', currentPage, { ...filters, name: debouncedName }],
    queryFn: () =>
      getAllStudentUser({
        PageNumber: currentPage,
        PageSize: 10,
        programId: filters.programId,
        modeOfStudyId: filters.modeOfStudyId,
        programTypeId: filters.programTypeId,
        applicationBatchId: filters.applicationBatchId,
        name: debouncedName,
      }),
  });

  const [programQuery, modeOfStudyQuery, programTypeQuery, batchQuery] = useQueries({
    queries: [
      {
        queryKey: ['programs'],
        queryFn: () => getAllPrograms(),
      },
      {
        queryKey: ['mode-of-study'],
        queryFn: getAllModeOfStudy,
      },
      {
        queryKey: ['program-types'],
        queryFn: getAllProgramType,
      },
      {
        queryKey: ['application-batches'],
        queryFn: getAllApplicationBatch,
      },
    ],
  });

  const programData = programQuery?.data?.data as Program[];
  const modeOfStudyData = modeOfStudyQuery?.data?.data as ModeOfStudy[];
  const programTypeData = programTypeQuery?.data?.data as ProgramType[];
  const batchData = batchQuery?.data?.data as ApplicationBatch[];

  const programOptions = programData?.map((program) => ({
    label: program.name,
    value: program.id,
  }));
  const modeOfStudyOptions = modeOfStudyData?.map((mode) => ({
    label: mode.name,
    value: mode.id,
  }));
  const programTypeOptions = programTypeData?.map((programType) => ({
    label: programType.name,
    value: programType.id,
  }));

  const batchOptions = batchData?.map((batch) => ({
    label: batch.batchName,
    value: batch.id,
  }));

  const viewApplicantDetails = (applicantId: string) => {
    navigate(`/applicants/${applicantId}`);
  };

  const columns: ColumnsType<User> = [
    {
      key: 'appNo',
      title: 'Application No',
      dataIndex: 'applicationNumber',
      //render: (_text, _record, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      key: 'firstName',
      title: 'First Name',
      dataIndex: 'firstName',
    },
    {
      key: 'lastName',
      title: 'Last Name',
      dataIndex: 'lastName',
    },
    {
      key: 'programName',
      title: 'Program Name',
      dataIndex: 'programName',
    },
    {
      key: 'programTypeName',
      title: 'Program Type',
      dataIndex: 'programTypeName',
    },
    {
      key: 'applicationBatchName',
      title: 'Application Batch',
      dataIndex: 'applicationBatchName',
    },
    {
      key: 'modeofStudyName',
      title: 'Mode of Study',
      dataIndex: 'modeofStudyName',
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 'phoneNo',
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
    },
    {
      key: 'action',
      title: 'Action',
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                label: 'View Details',
                key: '1',
                onClick: () => {
                  viewApplicantDetails(record.applicantId);
                },
              },
              // {
              //   label: 'Admit Student',
              //   key: '2',
              //   onClick: () => {
              //     console.log('Admit Student clicked');
              //   },
              // },
            ],
          }}
          trigger={['click']}
        >
          <Ellipsis />
        </Dropdown>
      ),
    },
  ];

  const userData = data?.data as User[];
  const userTotal = data?.totalSize as number;

  const handleDownloadApplicants = async () => {
    await downloadApplicantsMutation.mutateAsync(
      { ...filters, name: debouncedName },
      {
        onSuccess: (data) => {
          downloadExcelFile(data as Blob, 'Applicant_Report.xlsx');
        },
      },
    );
  };

  const handleAdmitApplicants = async () => {
    const payload = { applicationNumber: selectedApplicants as string[] };
    await admitApplicantsMutation.mutateAsync(payload, {
      onSuccess: (data) => {
        notification.success({
          message: 'Success',
          description: data?.message || 'Applicants admitted successfully',
        });
        setSelectedApplicants([]);
      },
    });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedApplicants(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: selectedApplicants,
    onChange: onSelectChange,
  };

  const hasSelected = selectedApplicants.length > 0;

  return (
    <div>
      <section className="space-between">
        <h3>Applicants</h3>
        <Button
          onClick={handleDownloadApplicants}
          text="Download Report"
          isLoading={downloadApplicantsMutation.isPending}
        />
      </section>

      <br />

      <Card bordered={false}>
        <div className={styles.filters}>
          <div>
            <h5>Filters</h5>
            <Flex gap="8px">
              <Select
                placeholder="Program"
                allowClear
                options={programOptions}
                loading={programQuery.isLoading}
                onChange={(value) => setFilters({ ...filters, programId: value })}
              />
              <Select
                placeholder="Mode of Study"
                allowClear
                options={modeOfStudyOptions}
                loading={modeOfStudyQuery.isLoading}
                onChange={(value) => setFilters({ ...filters, modeOfStudyId: value })}
              />
              <Select
                placeholder="Program Type"
                allowClear
                options={programTypeOptions}
                loading={programTypeQuery.isLoading}
                onChange={(value) => setFilters({ ...filters, programTypeId: value })}
              />
              <Select
                placeholder="Application Batch"
                allowClear
                options={batchOptions}
                loading={batchQuery.isLoading}
                onChange={(value) => setFilters({ ...filters, applicationBatchId: value })}
              />
            </Flex>
          </div>

          <Input
            prefix={<Search />}
            placeholder="Search applicant by name"
            onChange={handleSearch}
            allowClear
            className={styles.input}
          />
        </div>
        <br />
        {hasSelected && (
          <Button
            text="Admit Students"
            onClick={handleAdmitApplicants}
            isLoading={admitApplicantsMutation.isPending}
            disabled={admitApplicantsMutation.isPending}
          />
        )}
        <br />
        <p>
          Showing 1-{userData?.length} of {userTotal}
        </p>

        <Table
          dataSource={userData}
          columns={columns}
          rowKey={(record) => record.applicationNumber}
          rowSelection={rowSelection}
          scroll={{ x: true }}
          loading={isLoading}
          pagination={{
            position: ['bottomCenter'],
            current: currentPage,
            total: userTotal,
            onChange: onChange,
            pageSize: 10,
          }}
        />
      </Card>
    </div>
  );
};

export default StudentUser;
