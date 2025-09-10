import { Spinner } from './components/spinner/spinner';
import { Button } from '@/components/ui/button';
const App = () => {
  return (
    <div>
      <Spinner />
      <Button>Нажми меня</Button>
      <Button variant="destructive">Удалить</Button>
      <Button variant="outline">Отмена</Button>
    </div>
  );
};

export default App;
