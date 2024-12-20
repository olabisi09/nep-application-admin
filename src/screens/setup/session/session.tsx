/* eslint-disable no-undef */
import { useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Button as AntButton, App, Dropdown, MenuProps, Modal, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { ReactComponent as Add } from '../../../assets/add.svg';
import { ReactComponent as Ellipsis } from '../../../assets/ellipsis.svg';
import { ReactComponent as Search } from '../../../assets/search.svg';
// import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import Button from '../../../custom/button/button';
import SearchInput from '../../../custom/searchInput/searchInput';
import { usePagination } from '../../../hooks/usePagination';
import { deleteSession, getAllAcademicSession } from '../../../requests';
import DeleteModalContent from '../../deleteModal/deleteModal';
import styles from '../styles.module.scss';

import { EditSession } from './AddSession';
import AddSession from './AddSession';

const Session = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // const [showAllFilter, setShowAllFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [session, setSession] = useState<Session>({} as Session);
  const [openDelete, setOpenDelete] = useState(false);

  const { notification } = App.useApp();

  const { currentPage, onChange } = usePagination();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['getAll-sessions'],
    queryFn: () => getAllAcademicSession(currentPage, 10),
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (data: Session) => {
    setSession(data);
    setOpenDelete(true);
  };

  const deleteSessionMutation = useMutation({ mutationFn: deleteSession });

  const deleteSessionHandler = async () => {
    try {
      await deleteSessionMutation.mutateAsync(session?.id, {
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

  const columns: ColumnsType<Session> = [
    {
      key: 'name',
      title: 'Session',
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
              setSession(record);
              setOpenEdit(true);
            },
          },
          {
            key: '2',
            label: 'Delete',
            onClick: async () => {
              handleDelete(record);
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

  const sessionData = data?.data as Session[];

  const filteredData = sessionData?.filter((item) => item?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()));

  const handleShowModal = () => {
    setOpen((prevState) => !prevState);
  };

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Session Setup</h3>
        <Button onClick={handleShowModal} iconBefore={<Add />} text="Setup" />
      </section>

      <section className={styles.card}>
        <div className={styles.inside}>
          <p>
            Showing 1-{filteredData?.length} of {sessionData?.length}
          </p>

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

        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{
            position: ['bottomCenter'],
            current: currentPage,
            total: data?.totalSize,
            onChange: onChange,
            pageSize: 10,
          }}
          rowKey={(record) => record?.id}
          scroll={{ x: true }}
        />
      </section>

      <Modal open={open} onCancel={() => setOpen(false)} centered title="Session Setup " footer={null}>
        <AddSession handleClose={() => setOpen(false)} />
      </Modal>

      <Modal open={openEdit} onCancel={() => setOpenEdit(false)} centered title="Edit Session Setup" footer={null}>
        <EditSession item={session} handleClose={() => setOpenEdit(false)} />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Session Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteSessionMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteSessionHandler}
          title={session?.name}
        />
      </Modal>
    </main>
  );
};

export default Session;
