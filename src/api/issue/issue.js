import axiosInstance from 'api';

const PER_PAGE = 25;

export const getIssueMain = async () => {
  const { data } = await axiosInstance.get();

  return data;
};

export const getIssueList = async (page) => {
  const { data } = await axiosInstance.get(
    `/issues?sort=comments&per_page=${PER_PAGE}&page=${page}`
  );

  return data;
};

export const getIssue = async (number) => {
  const { data } = await axiosInstance.get(`/issues/${number}`);

  return data;
};
