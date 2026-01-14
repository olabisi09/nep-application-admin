import { getAllPrograms } from '@edu/requests';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';

interface ApplicantFilterProps {
  programId?: number;
}

const useApplicantFilter = () => {
  const [filters, setFilters] = useState<ApplicantFilterProps>({
    programId: 0,
  });

  const [programs] = useQueries({
    queries: [
      {
        queryKey: ['programs'],
        queryFn: () => getAllPrograms,
      },
    ],
  });

  const handleFilterChange = (key: keyof ApplicantFilterProps, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return {
    filters,
    handleFilterChange,
  };
};

export default useApplicantFilter;
