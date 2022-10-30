import { IssueProvider } from 'modules/context/IssueContext';
import Routes from 'router/Routes';

function App() {
  return (
    <IssueProvider>
      <Routes />
    </IssueProvider>
  );
}

export default App;
