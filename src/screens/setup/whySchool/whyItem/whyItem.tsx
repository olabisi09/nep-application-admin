/* eslint-disable no-undef */
import { useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Button as AntButton, App, Card, Dropdown, MenuProps, Modal, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useParams } from 'react-router-dom';

import { ReactComponent as Plus } from '../../../../assets/add.svg';
import { ReactComponent as Ellipsis } from '../../../../assets/ellipsis.svg';
import { Button } from '../../../../custom';
import { deleteWhyItem, getAllWhyItemsByWhyId } from '../../../../requests';
import { limitString } from '../../../../utils/sanitizeAndLimitString';
import DeleteModalContent from '../../../deleteModal/deleteModal';

import { SetupWhyItem } from './setup';

const WhyItem = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [indexData, setIndexData] = useState({} as WhyItem);

  const { notification } = App.useApp();

  const deleteWhyItemMutation = useMutation({ mutationFn: deleteWhyItem });

  const handleEdit = (data: WhyItem) => {
    setIndexData(data);
    setOpenEdit(true);
  };

  const handleDelete = (data: WhyItem) => {
    setIndexData(data);
    setOpenDelete(true);
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['get-why-items-by-why-id'],
    queryFn: () => getAllWhyItemsByWhyId(id!),
    enabled: !!id,
  });

  const whyItems = data?.data as WhyItem[];

  const columns: ColumnsType<WhyItem> = [
    // {
    //   key: "id",
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: 'description',
      title: 'Description',
      dataIndex: 'description',
      render: (_, { description }) => limitString(description, 50),
    },
    {
      key: 'iconUrl',
      title: 'Icon',
      dataIndex: 'iconUrl',
      render: (_, { iconUrl }) => <img className="table-img" src={iconUrl} alt="" />,
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
            onClick: () => handleEdit(record),
          },
          {
            key: '2',
            label: 'Delete',
            onClick: () => handleDelete(record),
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

  const deleteWhyHandler = async () => {
    try {
      await deleteWhyItemMutation.mutateAsync(indexData.id, {
        onSuccess: (data) => {
          notification.success({
            message: 'Success',
            description: data?.message,
          });
          refetch();
          setOpenDelete(false);
        },
      });
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error?.response?.data?.message,
      });
    }
  };

  const handleOpen = () => {
    setIndexData({} as WhyItem);
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
        <h3>Why Item Setup</h3>
        <Button onClick={handleOpen} iconBefore={<Plus />} text="Setup" />
      </section>

      <br />

      <Card bordered={false}>
        <Table
          dataSource={whyItems}
          columns={columns}
          pagination={{ position: ['bottomCenter'] }}
          rowKey={(record) => record.id}
          scroll={{ x: true }}
        />
      </Card>

      <Modal open={open} onCancel={() => setOpen(false)} centered title="Create Why Item" footer={null}>
        <SetupWhyItem whyId={id!} refetch={refetch} whyItem={indexData} handleClose={() => setOpen(false)} />
      </Modal>

      <Modal open={openEdit} onCancel={() => setOpenEdit(false)} centered title="Edit Why Items Setup" footer={null}>
        <SetupWhyItem whyId={id!} whyItem={indexData} refetch={refetch} handleClose={() => setOpenEdit(false)} />
      </Modal>
      <Modal open={openDelete} onCancel={() => setOpenDelete(false)} centered title="Delete Why Setup" footer={null}>
        <DeleteModalContent
          isLoading={deleteWhyItemMutation.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteWhyHandler}
          title={indexData.name}
        />
      </Modal>
    </div>
  );
};

export default WhyItem;
