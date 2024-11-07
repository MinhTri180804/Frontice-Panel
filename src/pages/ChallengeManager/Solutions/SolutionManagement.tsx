import { SolutionDetailsPage } from './Details';
import { SolutionListPage } from './List';
const SolutionManagement = () => {
  return SolutionListPage;
};

SolutionManagement.List = SolutionListPage;
SolutionManagement.Details = SolutionDetailsPage;

export default SolutionManagement;
