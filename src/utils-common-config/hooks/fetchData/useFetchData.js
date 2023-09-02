import { useEffect, useState } from "react";
import { CORS_PROXY } from "../../constants";

const useFetchData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData(url);
  }, []);

  const getData = async (url) => {
		const res = await fetch(CORS_PROXY + url);
		const data = await res.json();
		setData(data);
	};

  return data;
}

export default useFetchData;