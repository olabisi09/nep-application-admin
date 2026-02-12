import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useApplicantDetails } from '../../../hooks/api/useApplicantDetails';
import {
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  CollapseProps,
  Divider,
  Flex,
  Row,
  Space,
  Spin,
  Table,
  Typography,
} from 'antd';
import { formatFullDate } from '../../../utils/formatDate';
import styles from '../styles.module.scss';
import { useDownload } from '../../../hooks/useDownload';
import { ColumnsType } from 'antd/es/table';
import { ReactComponent as Back } from '../../../assets/arrow.svg';
import { routes } from '../../../routes';

const { Text, Title } = Typography;

const ViewApplicant = () => {
  const { id: applicantId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { personalInfo, institutions, workHistory, qualifications, isLoading, isError } = useApplicantDetails(
    applicantId || '',
  );
  const applicationDetails = location.state?.applicationDetails as User | undefined;

  return (
    <div className={styles.page}>
      <Flex align="center" gap="8px" className={styles.headerBar}>
        <Button onClick={() => navigate(routes.userMgt.users)} variant="text">
          <Back />
        </Button>
        <h3>Applicant Details</h3>
      </Flex>
      <Divider style={{ margin: '12px 0 20px' }} />
      {isLoading ? (
        <Spin />
      ) : isError ? (
        <div>Error loading applicant details.</div>
      ) : (
        <Space direction="vertical" size={16} className={styles.sectionStack}>
          {personalInfo?.fName && <Biodata personalInfo={personalInfo} />}
          {applicationDetails && <ApplicationDetails applicationDetails={applicationDetails} />}
          {institutions && institutions.length > 0 && <Institution institutions={institutions} />}
          {qualifications && qualifications.length > 0 && <QualificationDetails qualifications={qualifications} />}
          {workHistory && workHistory.length > 0 && <WorkHistory workHistory={workHistory} />}
        </Space>
      )}
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value?: React.ReactNode }) => (
  <Col xs={24} sm={12} lg={8} className={styles.infoItem}>
    <Text className={styles.infoLabel}>{label}</Text>
    <div className={styles.infoValue}>{value || 'N/A'}</div>
  </Col>
);

const Biodata = ({ personalInfo }: { personalInfo: PersonalInfo }) => (
  <Card title="Bio-data" className={styles.sectionCard} bodyStyle={{ padding: 16 }}>
    <Flex gap="16px" align="center" className={styles.bioHeader}>
      <AvatarBlock personalInfo={personalInfo} />
      <div className={styles.identityBlock}>
        <Title level={4} className={styles.noMargin}>
          {personalInfo?.fName} {personalInfo?.mNane ? `${personalInfo?.mNane} ` : ''}
          {personalInfo?.lName}
        </Title>
        <Text type="secondary">Applicant No: {personalInfo?.applicationNumber}</Text>
      </div>
    </Flex>
    <Divider />
    <Row gutter={[16, 12]} className={styles.infoGrid}>
      <InfoItem label="First name" value={personalInfo?.fName} />
      <InfoItem label="Middle name" value={personalInfo?.mNane} />
      <InfoItem label="Last name" value={personalInfo?.lName} />
      <InfoItem label="Gender" value={personalInfo?.gender} />
      <InfoItem label="Date of Birth" value={formatFullDate(personalInfo?.dateOfBirth)} />
      <InfoItem label="Email" value={personalInfo?.email} />
      <InfoItem label="Phone Number" value={personalInfo?.phoneNo} />
      <InfoItem label="Address" value={personalInfo?.address} />
      <InfoItem label="Country" value={personalInfo?.countryName} />
      <InfoItem label="State of Origin" value={personalInfo?.stateOfOrigin} />
      <InfoItem label="LGA" value={personalInfo?.lga} />
    </Row>
  </Card>
);

const ApplicationDetails = ({ applicationDetails }: { applicationDetails: User }) => (
  <Card title="Application Details" className={styles.sectionCard} bodyStyle={{ padding: 16 }}>
    <Row gutter={[16, 12]} className={styles.infoGrid}>
      <InfoItem label="Application No" value={applicationDetails?.applicationNumber} />
      <InfoItem label="Program Name" value={applicationDetails?.programName} />
      <InfoItem label="Program Type" value={applicationDetails?.programTypeName} />
      <InfoItem label="Application Batch" value={applicationDetails?.applicationBatchName} />
      <InfoItem label="Mode of Study" value={applicationDetails?.modeofStudyName} />
    </Row>
  </Card>
);

const AvatarBlock = ({ personalInfo }: { personalInfo: PersonalInfo }) => {
  const { downloadFile, isDownloading } = useDownload();
  const photoUrl = personalInfo?.imageUrl;

  return (
    <Space direction="vertical" align="center" size={8} className={styles.avatarBlock}>
      <Avatar size={96} shape="square" src={photoUrl} className={styles.avatar}>
        {personalInfo?.fName?.[0] || 'A'}
      </Avatar>
      <Button
        size="small"
        type="default"
        disabled={!photoUrl}
        loading={isDownloading}
        onClick={() => photoUrl && downloadFile(photoUrl, 'applicant_photo.jpg')}
      >
        Download photo
      </Button>
    </Space>
  );
};

const Institution = ({ institutions }: { institutions: Institution[] }) => {
  const { downloadFile, isDownloading } = useDownload();

  const items: CollapseProps['items'] = institutions.map((institution) => ({
    key: institution.id,
    label: institution.institutionName,
    children: (
      <Row gutter={[16, 12]} className={styles.infoGrid}>
        <InfoItem label="Institution Name" value={institution.institutionName} />
        <InfoItem label="Discipline" value={institution.discipline} />
        <InfoItem label="CGPA" value={institution.cgpa} />
        <InfoItem
          label="Duration"
          value={`${formatFullDate(institution.startDate)} - ${formatFullDate(institution.endDate)}`}
        />
        <Col span={24}>
          <Flex gap="12px" wrap="wrap" className={styles.listActions}>
            <a className={styles.link} href={institution.certificateUrl} target="_blank" rel="noopener noreferrer">
              View Certificate
            </a>
            <Button
              variant="text"
              loading={isDownloading}
              onClick={() => downloadFile(institution.certificateUrl, 'certificate.pdf')}
            >
              Download Certificate
            </Button>
          </Flex>
        </Col>
      </Row>
    ),
  }));
  return (
    <Card title="Institutions" className={styles.sectionCard} bodyStyle={{ padding: 16 }}>
      <Collapse items={items} size="small" />
    </Card>
  );
};

const QualificationDetails = ({ qualifications }: { qualifications: Qualification[] }) => {
  const columns: ColumnsType<Subject> = [
    {
      key: 'appNo',
      title: 'S/N',
      render: (_text, _record, index) => index + 1,
    },
    {
      key: 'subject',
      title: 'Subject',
      dataIndex: 'subject',
    },
    {
      key: 'grade',
      title: 'Grade',
      dataIndex: 'grade',
    },
  ];

  const items: CollapseProps['items'] = qualifications.map((qualification) => ({
    key: qualification.id,
    label: qualification.qualificationType,
    children: (
      <Table
        dataSource={qualification.subjects}
        columns={columns}
        rowKey={(record) => record.id}
        scroll={{ x: true }}
      />
    ),
  }));
  return (
    <Card title="Qualifications" className={styles.sectionCard} bodyStyle={{ padding: 16 }}>
      <Collapse items={items} size="small" />
    </Card>
  );
};

const WorkHistory = ({ workHistory }: { workHistory: WorkHistory[] }) => {
  const { downloadFile, isDownloading } = useDownload();
  const items: CollapseProps['items'] = workHistory.map((work) => ({
    key: work.id,
    label: work.companyName,
    children: (
      <Row gutter={[16, 12]} className={styles.infoGrid}>
        <InfoItem label="Company Name" value={work.companyName} />
        <InfoItem label="Position" value={work.position} />
        <InfoItem
          label="Duration"
          value={`${formatFullDate(work.startDate)} - ${
            work.endDate === '0001-01-01T00:00:00' ? 'Present' : formatFullDate(work.endDate)
          }`}
        />
        <Col span={24}>
          <Flex gap="12px" wrap="wrap" className={styles.listActions}>
            <a className={styles.link} href={work.employmentUrl} target="_blank" rel="noopener noreferrer">
              View Employment Letter
            </a>
            <Button
              type="text"
              loading={isDownloading}
              onClick={() => downloadFile(work.employmentUrl, `employment_letter.pdf`)}
            >
              Download Employment Letter
            </Button>
          </Flex>
        </Col>
      </Row>
    ),
  }));

  return (
    <Card title="Work History" className={styles.sectionCard} bodyStyle={{ padding: 16 }}>
      <Collapse items={items} size="small" />
    </Card>
  );
};

export default ViewApplicant;
