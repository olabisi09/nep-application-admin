/* eslint-disable no-undef */
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Button as AntButton, Card, Dropdown, MenuProps, Modal, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Plus } from '../../../assets/add.svg';
import { ReactComponent as Ellipsis } from '../../../assets/ellipsis.svg';
import Button from '../../../custom/button/button';
import { getStudentLife } from '../../../requests';
import { sanitizeAndLimitString } from '../../../utils/sanitizeAndLimitString';

import {
  CreateStudentLife,
  EditStudentLife,
} from './setup';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const forms = [
  'Create',
  'Edit',
  'Overview',
  'School Summary',
  'Campus Experience',
  'Fitness & Athletics',
  'Support & Guidance',
  'Student Activities',
] as const;

const StudentLife = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Setup>({} as Setup);
  const [currentForm, setCurrentForm] = useState<(typeof forms)[number] | ''>('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['get-student-life'],
    queryFn: getStudentLife,
  });

  const onFormClick = (form: (typeof forms)[number]) => {
    setCurrentForm(form);
    setOpen(true);
  };

  const renderForms = () => {
    switch (currentForm) {
      case 'Create':
        return <CreateStudentLife handleClose={() => setOpen(false)} />;
      case 'Edit':
        return <EditStudentLife item={item} handleClose={() => setOpen(false)} />;
      default:
        return <CreateStudentLife handleClose={() => setOpen(false)} />;
    }
  };

  const columns: ColumnsType<Setup> = [
    {
      key: 'title',
      title: 'Title',
      dataIndex: 'title',
    },
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
      key: 'activeStatus',
      title: 'Active Status',
      dataIndex: 'activeStatus',
      render: (text: boolean) => (text ? 'Active' : 'Inactive'),
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
              setItem(record);
              onFormClick('Edit');
            },
          },
          {
            key: '2',
            label: 'Overview',
            onClick: () => navigate(`/student-life/${record.id}/overview`),
          },
          {
            key: '3',
            label: 'School Summary',
            onClick: () => navigate(`/student-life/${record.id}/school-summary`),
          },
          {
            key: '4',
            label: 'Campus Experience',
            onClick: () => navigate(`/student-life/${record.id}/campus-experience`),
          },
          {
            key: '5',
            label: 'Fitness & Athletics',
            onClick: () => navigate(`/student-life/${record.id}/fitness-and-athletics`),
          },
          {
            key: '6',
            label: 'Support & Guidance',
            onClick: () => navigate(`/student-life/${record.id}/support-and-guidance`),
          },
          {
            key: '7',
            label: 'Student Activities',
            onClick: () => navigate(`/student-life/${record.id}/student-activities`),
          },
          {
            key: '8',
            label: 'Delete',
            onClick: () => {},
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

  const studentLife = data?.data as Setup[];

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="space-between">
        <h3>Student Life Setup</h3>

        {studentLife?.length === 0 && (
          <Button onClick={() => onFormClick('Create')} iconBefore={<Plus />} text="Setup" />
        )}
      </section>

      <br />
      
      <Card bordered={false} style={{ minWidth: '720px' }}>
        <Table
          dataSource={studentLife}
          columns={columns}
          pagination={{ position: ['bottomCenter'] }}
          rowKey={(record) => record.id}
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        centered
        title={currentForm || 'Student Life Setup'}
        footer={null}
        width={500}
      >
        {renderForms()}
      </Modal>
    </div>
  );
};

export default StudentLife;