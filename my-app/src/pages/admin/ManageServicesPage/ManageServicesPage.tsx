import { useManageServices } from './hooks/useManageServices';
import ManageServicesView from './components/ManageServicesView';

function ManageServicesPage() {
  useManageServices();

  return <ManageServicesView />;
}

export default ManageServicesPage;
