import { useEffect, useState } from "react";

interface HealthResponse {
  message: string;
}

export default function CheckApiHealth() {
  const [health, setHealth] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/health` || ""
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data: HealthResponse = await res.json();
        setHealth(data.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <h1>{health ? health : "Error"}</h1>;
}
