/* eslint-disable no-undef */
import { useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Button as AntButton, App, Card, Dropdown, MenuProps, Modal, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useParams } from 'react-router-dom';

import { ReactComponent as Plus } from '../../../../../assets/add.svg';
import { ReactComponent as Ellipsis } from '../../../../../assets/ellipsis.svg';
import { Button } from '../../../../../custom';
import { deleteCampusExperienceItem, getCampusExperienceItemByCampusExperienceId } from '../../../../../requests';
import { sanitizeAndLimitString } from '../../../../../utils/sanitizeAndLimitString';
import DeleteModalContent from '../../../../deleteModal/deleteModal';

import CampusExperienceItemForm from './form';

const CampusExperienceItem = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [campus, setCampus] = useState<CampusExperienceItem>({} as CampusExperienceItem);

  const { notification } = App.useApp();
  const { id } = useParams();

  const deleteCampusExperienceItemMutation = useMutation({
    mutationFn: deleteCampusExperienceItem,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['get-campus-experience-by-id'],
    queryFn: () => getCampusExperienceItemByCampusExperienceId(id!),
    enabled: !!id,
  });

  const deleteCampusExperienceItemHandler = async () => {
    try {
      await deleteCampusExperienceItemMutation.mutateAsync(campus?.id, {
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

  const columns: ColumnsType<CampusExperienceItem> = [
    {
      key: 'description',
      title: 'Description',
      dataIndex: 'description',
      render: (_, { description }) => {
        const limitedCleanHtml = sanitizeAndLimitString(description);
        return <div dangerouslySetInnerHTML={{ __html: limitedCleanHtml }} />;
      },
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
              setCampus(record);
              setOpenEdit(true);
            },
          },
          {
            key: '2',
            label: 'Delete',
            onClick: () => {
              setCampus(record);
              setOpenDelete((prevState) => !prevState);
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

  const campusData = data?.data as CampusExperienceItem[];

  const handleOpenModal = () => {
    setCampus({} as CampusExperienceItem);
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
        <h3>Student Life: Campus Experience Item Setup</h3>
        <Button onClick={handleOpenModal} iconBefore={<Plus />} text="Setup" />
      </section>

      <br />

      <Card bordered={false}>
        <Table
          dataSource={campusData}
          columns={columns}
          pagination={{ position: ['bottomCenter'] }}
          rowKey={(record) => record.id}
          scroll={{ x: true }}
        />
      </Card>

      <Modal open={open} onCancel={() => setOpen(false)} centered title="Create Campus Experience Item" footer={null}>
        <CampusExperienceItemForm item={campus} handleClose={() => setOpen(false)} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Campus Experience Item"
        footer={null}
      >
        <CampusExperienceItemForm item={campus} handleClose={() => setOpenEdit(false)} />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Campus Experience Item Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteCampusExperienceItemMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteCampusExperienceItemHandler}
          title="this item"
        />
      </Modal>
    </div>
  );
};

export default CampusExperienceItem;
