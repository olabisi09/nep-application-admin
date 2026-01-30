import { Table, TableColumnsType } from 'antd';

const EmailTemplates = () => {
  const templates = [
    {
      name: 'Welcome Email',
      key: 'welcome-email',
    },
    {
      name: 'Password Reset',
      key: 'password-reset',
    },
    {
      name: 'Account Verification',
      key: 'account-verification',
    },
  ];
  const columns: TableColumnsType = [
    {
      title: 'S/N',
      dataIndex: 'key',
      key: 'sn',
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'Template Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  return (
    <div>
      <h1>Email Templates</h1>
      <Table dataSource={templates} columns={columns} rowKey="key" />
    </div>
  );
};

export default EmailTemplates;
