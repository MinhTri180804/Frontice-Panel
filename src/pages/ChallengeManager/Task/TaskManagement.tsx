import { TaskDetailsPage } from "./Details";
import { TaskListPage } from "./List";
import { TaskReportsPage } from "./Report";
import { TaskReportDetailsPage } from "./ReportDetails";

const TaskManagement = () => {
  return TaskListPage;
};

TaskManagement.List = TaskListPage;
TaskManagement.Details = TaskDetailsPage;
TaskManagement.Reports = TaskReportsPage;
TaskManagement.ReportDetails = TaskReportDetailsPage;
export default TaskManagement;
