import axiosInstance from 'api';

export const getIssueMain = async () => {
  const { data } = await axiosInstance.get();

  return data;
};

export const getIssueList = async (params) => {
  const { data } = await axiosInstance.get('/issues', { params });

  return data;
};

export const getIssue = async (issueNumber) => {
  const { data } = await axiosInstance.get(`/issues/${issueNumber}`);

  return data;
};
