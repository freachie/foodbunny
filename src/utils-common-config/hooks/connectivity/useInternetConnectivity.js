import { useEffect, useState } from "react";

const useInternetConnectivity = () => {

  const [status, setStatus] = useState(true);

  useEffect(() => {

    const onlineStatus = window.addEventListener("online", () => {
      setStatus(true);
    });

    const offlineStatus = window.addEventListener("offline", () => {
			setStatus(false);
    });
    
    return () => {
      window.removeEventListener(onlineStatus, offlineStatus);
    }

  }, [])

  return status;
}

export default useInternetConnectivity;