/* eslint-disable no-undef */
import { useCallback, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Button as AntButton, App, Dropdown, MenuProps, Modal, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { ReactComponent as Add } from '../../../assets/add.svg';
import { ReactComponent as Ellipsis } from '../../../assets/ellipsis.svg';
import Button from '../../../custom/button/button';
import DeleteModalContent from '../../deleteModal/deleteModal';
import styles from '../styles.module.scss';

import AddProgram from './addProgramType';
import EditProgramType from './editProgramType';
import { deleteProgramType, getProgramTypes } from './request';

const ProgramSetUp = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [record, setRecord] = useState<ProgramType>({} as ProgramType);
  const [openDelete, setOpenDelete] = useState(false);

  const { notification } = App.useApp();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['get-program-types'],
    queryFn: getProgramTypes,
  });

  const programTypesData = data?.data ?? [];

  const deleteProgramTypeMutation = useMutation({
    mutationFn: deleteProgramType,
  });

  const deleteProgramTypeHandler = async () => {
    try {
      await deleteProgramTypeMutation.mutateAsync(record?.id, {
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

  const columns: ColumnsType<ProgramType> = [
    {
      key: 'Program Type',
      title: 'Name',
      dataIndex: 'name',
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
              setOpenEdit(true);
              setRecord(record);
            },
          },
          {
            key: '2',
            label: 'Delete',
            onClick: () => {
              setRecord(record);
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

  const handleClose = useCallback(() => {
    setShowAddModal((prevState) => !prevState);
  }, []);

  const handleEditClose = useCallback(() => {
    setOpenEdit((prevState) => !prevState);
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Program Type Setup</h3>
        <Button onClick={() => setShowAddModal(true)} iconBefore={<Add />} text="Setup" />
      </section>

      <section className={styles.card}>
        <Table
          dataSource={programTypesData}
          columns={columns}
          pagination={{ position: ['bottomCenter'] }}
          rowKey={(record) => record.id}
        />
      </section>

      <Modal open={showAddModal} onCancel={() => setShowAddModal(false)} centered title="Program Setup" footer={null}>
        <AddProgram handleClose={handleClose} />
      </Modal>

      <Modal open={openEdit} onCancel={() => setOpenEdit(false)} centered title="Program Type Setup" footer={null}>
        <EditProgramType handleClose={handleEditClose} record={record} />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Program Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteProgramTypeMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteProgramTypeHandler}
          title={record?.name}
        />
      </Modal>
    </main>
  );
};

export default ProgramSetUp;
