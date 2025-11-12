// import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import { useState } from 'react';

import { Button as AntButton, Dropdown, MenuProps, Modal, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useSetAtom } from 'jotai';

import { ReactComponent as Add } from '../../../assets/add.svg';
import { ReactComponent as Ellipsis } from '../../../assets/ellipsis.svg';
import { ReactComponent as Search } from '../../../assets/search.svg';
import Button from '../../../custom/button/button';
import SearchInput from '../../../custom/searchInput/searchInput';
import { useDeleteDiscountMutation } from '../../../hooks/api/useDeleteDiscountMutation';
import { useGetAllDiscountQuery } from '../../../hooks/api/useGetAllDiscountQuery';
import { usePagination } from '../../../hooks/usePagination';
import { useSearchTerms } from '../../../hooks/useSearchTerms';
import { DiscountsDatum } from '../../../types/discount';
import { isEditAtom } from '../../../utils/store';
import DeleteModalContent from '../../deleteModal/deleteModal';
import styles from '../styles.module.scss';

import AddDiscount from './addDiscount';

const DiscountFee = () => {
  const [showSearch, setShowSearch] = useState(false);
  // const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [item, setItem] = useState<DiscountsDatum>({} as DiscountsDatum);
  const [openDelete, setOpenDelete] = useState(false);

  const setIsEdit = useSetAtom(isEditAtom);

  const { currentPage, onChange } = usePagination();
  const { searchTerm, handleSearch } = useSearchTerms();

  const { data, isLoading, isError, errorMessage } = useGetAllDiscountQuery();
  const { deleteDiscountHandler, isDeleteLoading } = useDeleteDiscountMutation(item?.id || 0, setOpenDelete);

  const discountData = data?.data ?? [];

  const filteredData = discountData
    ?.filter(
      (item) =>
        item?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        item?.discountType?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        item?.code?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        item?.applicationBatch?.batchName?.toLowerCase()?.includes(searchTerm.toLowerCase()),
    )
    ?.map((item) => ({ ...item, key: item.id }));

  const columns: ColumnsType<DiscountsDatum> = [
    {
      key: 'name',
      title: 'Discount Name',
      dataIndex: 'name',
    },
    {
      key: 'useCount',
      title: 'Use Count',
      dataIndex: 'couponUseCount',
    },
    {
      key: 'code',
      title: 'Code',
      dataIndex: 'code',
    },
    {
      key: 'amount',
      title: 'Amount',
      dataIndex: 'discountAmount',
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
              setIsEdit(true);
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
    setItem({} as DiscountsDatum);
    setShowAddModal((prevState) => !prevState);
    setIsEdit(false);
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError) {
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Discount Fee Setup</h3>
        <Button onClick={handleShowModal} iconBefore={<Add />} text="Setup" />
      </section>

      <section className={styles.card}>
        <div className={styles.inside}>
          <p>
            Showing 1-{filteredData?.length} of {discountData?.length}
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
            total: filteredData?.length,
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
        title="Discount Fee Setup"
        footer={null}
      >
        <AddDiscount
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
        title="Delete Discount Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={isDeleteLoading}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteDiscountHandler}
          title={'this item'}
          isActive={false}
        />
      </Modal>
    </main>
  );
};

export default DiscountFee;
