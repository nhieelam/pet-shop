import { useManageProductCategory } from './hooks/useManageProductCategory';
import ManageProductCategoryView from './components/ManageProductCategoryView';

function ManageProductCategoryPage() {
  useManageProductCategory();

  return <ManageProductCategoryView />;
}

export default ManageProductCategoryPage;
