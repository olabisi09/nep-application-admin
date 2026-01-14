export const buildQuery = (params: Record<string, any>) => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '' && value !== 0)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return query ? `?${query}` : '';
};
