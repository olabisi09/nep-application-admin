import { useParams } from 'react-router-dom';
import { useApplicantDetails } from '../../../hooks/api/useApplicantDetails';
import { Button, Card, Collapse, CollapseProps, Divider, Flex, Spin, Table } from 'antd';
import { formatFullDate } from '../../../utils/formatDate';
import styles from '../styles.module.scss';
import { useDownload } from '../../../hooks/useDownload';
import { ColumnsType } from 'antd/es/table';

const ViewApplicant = () => {
  const { id: applicantId } = useParams<{ id: string }>();
  const { personalInfo, institutions, workHistory, qualifications, isLoading, isError } = useApplicantDetails(
    applicantId || '',
  );

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error loading applicant details.</div>;
  }

  return (
    <div>
      <h3>Applicant Details</h3>
      <Card>
        {personalInfo?.fName && <Biodata personalInfo={personalInfo} />}
        {institutions && institutions.length > 0 && <Institution institutions={institutions} />}
        {qualifications && qualifications.length > 0 && <QualificationDetails qualifications={qualifications} />}
        {workHistory && workHistory.length > 0 && <WorkHistory workHistory={workHistory} />}
      </Card>
    </div>
  );
};

const Biodata = ({ personalInfo }: { personalInfo: PersonalInfo }) => (
  <div>
    <h4>Bio-data</h4>
    <img src={personalInfo?.imageUrl} alt="Applicant Photo" />
    <p>
      <b>First name: </b>
      {personalInfo?.fName}
    </p>
    <p>
      <b>Last name: </b>
      {personalInfo?.lName}
    </p>
    <p>
      <b>Middle name: </b>
      {personalInfo?.mNane}
    </p>
    <p>
      <b>Applicant Number: </b>
      {personalInfo?.applicationNumber}
    </p>
    <p>
      <b>Gender: </b>
      {personalInfo?.gender}
    </p>
    <Divider />
  </div>
);

const Institution = ({ institutions }: { institutions: Institution[] }) => {
  const { downloadFile, isDownloading } = useDownload();
  return (
    <div>
      <h4>Institutions</h4>
      {institutions?.map((institution) => (
        <div key={institution.id}>
          <p>
            <b>Institution Name: </b>
            {institution.institutionName}
          </p>
          <p>
            <b>Discipline: </b>
            {institution.discipline}
          </p>
          <p>
            <b>CGPA: </b>
            {institution.cgpa}
          </p>
          <p>
            <b>Duration: </b>
            {formatFullDate(institution.startDate)} - {formatFullDate(institution.endDate)}
          </p>
          <Flex gap={'16px'}>
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
          <Divider />
        </div>
      ))}
    </div>
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
    <div>
      <h4>Qualifications</h4>
      <Collapse items={items} size="small" />
      <Divider />
    </div>
  );
};

const WorkHistory = ({ workHistory }: { workHistory: WorkHistory[] }) => {
  const { downloadFile, isDownloading } = useDownload();
  const items: CollapseProps['items'] = workHistory.map((work) => ({
    key: work.id,
    label: work.companyName,
    children: (
      <div>
        <p>
          <b>Company Name: </b>
          {work.companyName}
        </p>
        <p>
          <b>Position: </b>
          {work.position}
        </p>
        <p>
          <b>Duration: </b>
          {formatFullDate(work.startDate)} -{' '}
          {work.endDate === '0001-01-01T00:00:00' ? 'Present' : formatFullDate(work.endDate)}
        </p>
        <br />
        <Flex gap={'16px'}>
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
      </div>
    ),
  }));

  return (
    <div>
      <h4>Work History</h4>
      <Collapse items={items} size="small" />
    </div>
  );
};

export default ViewApplicant;
