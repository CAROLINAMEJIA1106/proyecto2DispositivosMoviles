import { Redirect } from "expo-router";

export default function Index() {

  return (
    <Redirect
      //href="/(campeonatos)/listCampeonatos"
      href="/(paisGanador)/paisGanadorList"
    />
  );
}