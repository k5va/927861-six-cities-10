import {AppStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import {getAppStatus} from '../../store/selectors';
import './styles.css';

function Spinner(): JSX.Element| null {
  const appStatus = useAppSelector(getAppStatus);

  if (appStatus !== AppStatus.Pending) {
    return null;
  }

  return <div role='progressbar' className="spin"></div>;
}

export default Spinner;
