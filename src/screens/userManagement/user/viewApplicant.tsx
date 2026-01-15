import { useParams } from 'react-router-dom';
import { useApplicantDetails } from '../../../hooks/api/useApplicantDetails';
import { Card, Divider, Spin } from 'antd';
import { formatFullDate } from '../../../utils/formatDate';
import styles from '../styles.module.scss';

const ViewApplicant = () => {
  const { id: applicantId } = useParams<{ id: string }>();
  const { personalInfo, institutions, workHistory, isLoading, isError } = useApplicantDetails(applicantId || '');

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error loading applicant details.</div>;
  }

  return (
    <div>
      <h2>Applicant Details</h2>
      <Card>
        <h4>Bio-data</h4>
        <p>First name: {personalInfo?.fName}</p>
        <p>Last name: {personalInfo?.lName}</p>
        <p>Middle name: {personalInfo?.mNane}</p>
        <p>Applicant ID: {personalInfo?.applicantId}</p>
        <p>Gender: {personalInfo?.gender}</p>
        <Divider />
        <h4>Institutions</h4>
        {institutions?.map((institution) => (
          <div key={institution.id}>
            <p>Institution Name: {institution.institutionName}</p>
            <p>Discipline: {institution.discipline}</p>
            <p>CGPA: {institution.cgpa}</p>
            <p>
              Duration: {formatFullDate(institution.startDate)} - {formatFullDate(institution.endDate)}
            </p>
            <a className={styles.link} href={institution.certificateUrl} target="_blank" rel="noopener noreferrer">
              View Certificate
            </a>
            <Divider />
          </div>
        ))}
        <h4>Work History</h4>
        {workHistory?.map((work) => (
          <div key={work.id}>
            <p>Company Name: {work.companyName}</p>
            <p>Position: {work.position}</p>
            <p>
              Duration: {formatFullDate(work.startDate)} -{' '}
              {work.endDate === '0001-01-01T00:00:00' ? 'Present' : formatFullDate(work.endDate)}
            </p>
            <a className={styles.link} href={work.employmentUrl} target="_blank" rel="noopener noreferrer">
              View Employment Letter
            </a>
            <Divider />
          </div>
        ))}
      </Card>
    </div>
  );
};

export default ViewApplicant;
