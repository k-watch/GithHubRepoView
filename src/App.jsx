import { IssueProvider } from 'modules/context/IssueContext';
import GlobalStyles from 'styles/GlobalStyles';
import Routes from 'router/Routes';

function App() {
  return (
    <IssueProvider>
      <GlobalStyles />
      <Routes />
    </IssueProvider>
  );
}

export default App;
