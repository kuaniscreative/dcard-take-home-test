import { hot } from 'react-hot-loader/root';
import 'modern-normalize';
import './global.scss';
import Home from './domains/home/Home';

function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default hot(App);
