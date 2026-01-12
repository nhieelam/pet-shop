import { useStock } from './hooks/useStock';
import StockView from './components/StockView';

function StockPage() {
  useStock();

  return <StockView />;
}

export default StockPage;
