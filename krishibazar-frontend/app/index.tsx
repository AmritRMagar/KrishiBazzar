import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function Index() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync("token").then((storedToken) => {
      setToken(storedToken);
      setLoading(false);
    });
  }, []);

  if (loading) return null;
  return <Redirect href={token ? "/(tabs)" : "/login"} />;
}