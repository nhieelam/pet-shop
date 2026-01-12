import { useListServices } from './hooks/useListServices';
import ListServicesView from './components/ListServicesView';

function ListServicesPage() {
  useListServices();

  return <ListServicesView />;
}

export default ListServicesPage;
