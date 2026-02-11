import { useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Button as AntButton, App, Dropdown, MenuProps, Modal, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { ReactComponent as Add } from '../../../assets/add.svg';
import { ReactComponent as Ellipsis } from '../../../assets/ellipsis.svg';
import { ReactComponent as Search } from '../../../assets/search.svg';
import Button from '../../../custom/button/button';
import SearchInput from '../../../custom/searchInput/searchInput';
import { usePagination } from '../../../hooks/usePagination';
import { useSearchTerms } from '../../../hooks/useSearchTerms';
import { deleteFeeSetup, getAllFeeSetup } from '../../../requests';
import DeleteModalContent from '../../deleteModal/deleteModal';
import styles from '../styles.module.scss';

import AddAcceptanceFee from './addAcceptanceFee';

const AcceptanceFee = () => {
  const [showSearch, setShowSearch] = useState(false);
  // const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [item, setItem] = useState<GetAllFeeSetup>({} as GetAllFeeSetup);
  const [openDelete, setOpenDelete] = useState(false);

  const { currentPage, onChange } = usePagination();
  const { searchTerm, handleSearch } = useSearchTerms();

  const { notification } = App.useApp();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['get-all-fee-setup', currentPage],
    queryFn: () => getAllFeeSetup(currentPage, 10),
  });

  const applicationFeeData = data?.data ?? [];

  const filteredData = applicationFeeData
    ?.filter(
      (item) =>
        item?.program?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        item?.programTypeName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        item?.applicationBatchName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        item?.modeOfStudy?.toLowerCase()?.includes(searchTerm.toLowerCase()),
    )
    ?.map((item) => ({ ...item, key: item.id }));

  const deleteApplicationFeeMutation = useMutation({
    mutationFn: deleteFeeSetup,
  });

  const deleteApplicationFeeHandler = async () => {
    try {
      await deleteApplicationFeeMutation.mutateAsync(item?.id, {
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

  const columns: ColumnsType<GetAllFeeSetup> = [
    {
      key: 'program',
      title: 'Program',
      dataIndex: 'program',
    },
    {
      key: 'programType',
      title: 'Program Type',
      dataIndex: 'programTypeName',
    },
    {
      key: 'modeOfStudy',
      title: 'Mode of Study',
      dataIndex: 'modeOfStudy',
    },
    {
      key: 'amount',
      title: 'Amount',
      dataIndex: 'acceptanceFee',
    },
    {
      key: ' applicationBatchName',
      title: 'Application Batch',
      dataIndex: 'applicationBatchName',
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'activeStatus',
      render: (_, { activeStatus }) => (activeStatus ? 'Active' : 'Inactive'),
    },
    {
      key: 'action',
      title: 'Action',
      render: (_, record) => {
        const items: MenuProps['items'] = [
          {
            key: '1',
            label: 'Edit',
            onClick: () => {
              setShowAddModal(true);
              setItem(record);
            },
          },
          {
            key: '2',
            label: 'Delete',
            onClick: () => {
              setOpenDelete(true);
              setItem(record);
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

  const handleShowModal = () => {
    setItem({} as GetAllFeeSetup);
    setShowAddModal((prevState) => !prevState);
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Acceptance Fee Setup</h3>
        <Button onClick={handleShowModal} iconBefore={<Add />} text="Setup" />
      </section>

      <section className={styles.card}>
        <div className={styles.inside}>
          <p>
            Showing 1-{filteredData?.length} of {applicationFeeData?.length}
          </p>

          <div>
            {!showSearch && (
              <span>
                <Search onClick={() => setShowSearch((showSearch) => !showSearch)} />
              </span>
            )}

            {showSearch && <SearchInput value={searchTerm} onChange={handleSearch} />}
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
          // scroll={{ x: 400 }}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Application Fee Setup"
        footer={null}
      >
        <AddAcceptanceFee
          record={item}
          handleClose={() => {
            setShowAddModal(false);
          }}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Application Fee Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteApplicationFeeMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteApplicationFeeHandler}
          title={'this item'}
          isActive={false}
        />
      </Modal>
    </main>
  );
};

export default AcceptanceFee;
