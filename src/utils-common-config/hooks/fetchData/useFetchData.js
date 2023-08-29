import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData(url);
  }, []);

  const getData = async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		setData(data);
	};

  return data;
}

export default useFetchData;