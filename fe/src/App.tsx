import { GlobalStyles } from './style/GlobalStyles';

import { Header } from './components/Header';
import { Orders } from './components/Orders';

export function App() {
  return (
    <>
      <GlobalStyles />
      <Header/>
      <Orders/>
    </>
  );
}
