import axiosInstance from 'api';

const PER_PAGE = 25;

export const getIssueMain = async () => {
  const { data } = await axiosInstance.get();

  return data;
};

export const getIssueList = async (params) => {
  axiosInstance.defaults.params = params;
  const { data } = await axiosInstance.get('/issues');

  return data;
};

export const getIssue = async (issueNumber) => {
  const { data } = await axiosInstance.get(`/issues/${issueNumber}`);

  return data;
};
