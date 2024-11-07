import { TaskDetailsPage } from './Details';
import { TaskListPage } from './List';

const TaskManagement = () => {
  return TaskListPage;
};

TaskManagement.List = TaskListPage;
TaskManagement.Details = TaskDetailsPage;
export default TaskManagement;
