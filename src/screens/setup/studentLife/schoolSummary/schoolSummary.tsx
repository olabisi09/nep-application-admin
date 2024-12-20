/* eslint-disable no-undef */
import { useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Button as AntButton, App, Card, Dropdown, MenuProps, Modal, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useParams } from 'react-router-dom';

import { ReactComponent as Plus } from '../../../../assets/add.svg';
import { ReactComponent as Ellipsis } from '../../../../assets/ellipsis.svg';
import { Button } from '../../../../custom';
import { deleteSchoolSummary, getSchoolSummaryByStudentLifeId } from '../../../../requests';
import DeleteModalContent from '../../../deleteModal/deleteModal';

import SchoolSummaryForm from './schoolSummaryForm';

const SchoolSummary = () => {
  const { notification } = App.useApp();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [schoolSummaryItems, setSchoolSummaryItems] = useState<SchoolSummary>({} as SchoolSummary);
  const [openDelete, setOpenDelete] = useState(false);

  const deleteSchoolSummaryMutation = useMutation({
    mutationFn: deleteSchoolSummary,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['get-school-summary'],
    queryFn: () => getSchoolSummaryByStudentLifeId(id!),
    enabled: !!id,
  });

  const deleteSchoolSummaryHandler = async () => {
    try {
      await deleteSchoolSummaryMutation.mutateAsync(schoolSummaryItems?.id, {
        onSuccess: (data) => {
          notification.success({
            message: 'Success',
            description: data?.message,
          });
          refetch();
          setOpenDelete((prevState) => !prevState);
        },
      });
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error?.response?.data?.message,
      });
    }
  };

  const columns: ColumnsType<SchoolSummary> = [
    {
      key: 'title',
      title: 'Title',
      dataIndex: 'title',
    },
    {
      key: 'figure',
      title: 'Figure',
      dataIndex: 'figure',
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'activeStatus',
      render: (_, { activeStatus }) => (activeStatus ? 'Active' : 'Inactive'),
    },
    {
      key: 'action',
      title: '',
      render: (_, record) => {
        const items: MenuProps['items'] = [
          {
            key: '1',
            label: 'Edit',
            onClick: () => {
              setSchoolSummaryItems({ ...schoolSummaryItems, ...record });
              setOpenEdit(true);
            },
          },
          {
            key: '2',
            label: 'Delete',
            onClick: () => {
              setSchoolSummaryItems(record);
              setOpenDelete(true);
            },
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={['click']}>
            <AntButton type="text" icon={<Ellipsis />} />
          </Dropdown>
        );
      },
    },
  ];

  const schoolSummaryData = data?.data as SchoolSummary[];

  const handleOpenModal = () => {
    setSchoolSummaryItems({} as SchoolSummary);
    setOpen((prevState) => !prevState);
  };

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="space-between">
        <h3>Student Life: School Summary Setup</h3>
        <Button onClick={handleOpenModal} iconBefore={<Plus />} text="Setup" />
      </section>

      <br />

      <Card bordered={false}>
        <Table
          dataSource={schoolSummaryData}
          columns={columns}
          pagination={{ position: ['bottomCenter'] }}
          rowKey={(record) => record.id}
          scroll={{ x: true }}
        />
      </Card>

      <Modal open={open} onCancel={() => setOpen(false)} centered title="Create School Summary" footer={null}>
        <SchoolSummaryForm item={schoolSummaryItems} handleClose={() => setOpen(false)} />
      </Modal>

      <Modal open={openEdit} onCancel={() => setOpenEdit(false)} centered title="Edit School Summary" footer={null}>
        <SchoolSummaryForm item={schoolSummaryItems} handleClose={() => setOpenEdit(false)} />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete School Summary Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteSchoolSummaryMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteSchoolSummaryHandler}
          title={schoolSummaryItems?.title}
        />
      </Modal>
    </div>
  );
};

export default SchoolSummary;
