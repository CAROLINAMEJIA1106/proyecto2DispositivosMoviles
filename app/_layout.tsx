import { Stack } from "expo-router";
import { useEffect } from "react";
import { testDatabaseConnection } from "../domain/data/local/connection";

export default function RootLayout() {

  useEffect(() => {
    testDatabaseConnection();
  }, []);

  return <Stack />;
}
