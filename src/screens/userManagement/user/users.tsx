/* eslint-disable no-undef */
import { useState } from 'react';

import { useQueries, useQuery } from '@tanstack/react-query';
import { Button, Card, Flex, Input, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { ReactComponent as Search } from '../../../assets/magnifier.svg';
import { ReactComponent as Eye } from '../../../assets/eye.svg';
import { usePagination } from '../../../hooks/usePagination';

import { getAllStudentUser } from './request';
import { getAllApplicationBatch, getAllModeOfStudy, getAllPrograms, getAllProgramType } from '../../../requests/index';
import styles from '../styles.module.scss';
import { useDebounce } from '../../../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';

const StudentUser = () => {
  const { currentPage, onChange } = usePagination();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ApplicantParams>({
    programId: 0,
    modeOfStudyId: 0,
    programTypeId: 0,
    applicationBatchId: 0,
    name: '',
  });
  const debouncedName = useDebounce(filters.name || '', 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: e.target.value });
  };

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

  const columns: ColumnsType<User> = [
    {
      key: 'appNo',
      title: 'Application Number',
      dataIndex: 'applicationNumber',
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
        <Button type="text" onClick={() => navigate(`/student-user/${record.applicantId}`)} icon={<Eye />} />
      ),
    },
  ];

  const userData = data?.data as User[];
  const userTotal = data?.totalSize as number;

  return (
    <div>
      <section className="space-between">
        <h3>Applicants</h3>
      </section>

      <br />

      <Card bordered={false}>
        <div className={styles.filters}>
          <div>
            <h5>Filters</h5>
            <Flex gap="8px" wrap="wrap">
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
            placeholder="Search by applicant name"
            onChange={handleSearch}
            allowClear
            className={styles.input}
          />
        </div>
        <br />
        <p>
          Showing 1-{userData?.length} of {userTotal}
        </p>

        <Table
          dataSource={userData}
          columns={columns}
          rowKey={(record) => record.applicantId}
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
