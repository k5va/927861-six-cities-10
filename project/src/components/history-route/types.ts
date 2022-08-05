import type {BrowserHistory} from 'history';

type HistoryRouterProps = {
  history: BrowserHistory;
  basename?: string;
  children?: React.ReactNode;
}

export type {HistoryRouterProps};
