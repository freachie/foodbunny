import { useRouteError } from 'react-router-dom';

const RouteError = () => {
  const err = useRouteError();
  return (
		<>
			<div>
				<div>{err.data}</div>
				<p>
					{err.status} : {err.statusText}
				</p>
			</div>
		</>
	);
}

export default RouteError;