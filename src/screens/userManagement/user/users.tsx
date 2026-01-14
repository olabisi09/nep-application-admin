/* eslint-disable no-undef */
import { useState } from 'react';

//import useApplicantFilter from '@edu/hooks/useApplicantFilter';
import { useQueries, useQuery } from '@tanstack/react-query';
import { Card, Flex, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { ReactComponent as Search } from '../../../assets/search.svg';
import { SearchInput } from '../../../custom';
import { usePagination } from '../../../hooks/usePagination';

import { getAllStudentUser } from './request';
import { getAllModeOfStudy, getAllPrograms, getAllProgramType } from '../../../requests/index';

const StudentUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { currentPage, onChange } = usePagination();
  //const { filters } = useApplicantFilter()
  const [filters, setFilters] = useState<ApplicantParams>({
    programId: 0,
    modeOfStudyId: 0,
    programTypeId: 0,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['get-student-users', currentPage, filters.programId, filters.modeOfStudyId, filters.programTypeId],
    queryFn: () =>
      getAllStudentUser({
        PageNumber: currentPage,
        PageSize: 10,
        programId: filters.programId,
        modeOfStudyId: filters.modeOfStudyId,
        programTypeId: filters.programTypeId,
      }),
  });

  const [programQuery, modeOfStudyQuery, programTypeQuery] = useQueries({
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
    ],
  });

  const programData = programQuery?.data?.data as Program[];
  const modeOfStudyData = modeOfStudyQuery?.data?.data as ModeOfStudy[];
  const programTypeData = programTypeQuery?.data?.data as ProgramType[];

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
      key: 'middleName',
      title: 'Middle Name',
      dataIndex: 'middleName',
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
      render: () => <span>View Details</span>,
    },
  ];

  const userData = data?.data as User[];

  const filteredData = userData?.filter(
    (user) =>
      user?.firstName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      user?.lastName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <section className="space-between">
        <h3>Applicants</h3>
      </section>

      <br />

      <Card bordered={false}>
        <div className="space-between">
          <Flex gap="16px">
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
          </Flex>

          <div>
            {!showSearch && (
              <span>
                <Search onClick={() => setShowSearch((showSearch) => !showSearch)} />
              </span>
            )}
            {showSearch && <SearchInput value={searchTerm} onChange={handleSearch} />}

            {/* {!showAllFilter && (
              <Filter
                onClick={() =>
                  setShowAllFilter((showAllFilter) => !showAllFilter)
                }
              />
            )} */}
          </div>
        </div>

        <p>
          Showing 1-{filteredData?.length} of {userData?.length}
        </p>

        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey={(record) => record.applicantId}
          scroll={{ x: true }}
          loading={isLoading}
          pagination={{
            position: ['bottomCenter'],
            current: currentPage,
            total: data?.totalSize,
            onChange: onChange,
            pageSize: 10,
          }}
        />
      </Card>
    </div>
  );
};

export default StudentUser;
