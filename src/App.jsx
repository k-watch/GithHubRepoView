import { IssueProvider } from 'modules/context/IssueContext';
import Router from 'router/Router';

function App() {
  return (
    <IssueProvider>
      <Router />
    </IssueProvider>
  );
}

export default App;
