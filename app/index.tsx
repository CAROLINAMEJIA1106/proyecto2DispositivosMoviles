import { Redirect } from 'expo-router';

export default function Index() {
  return (
    <Redirect
      href={{
        pathname: '/integrantes/listIntegrantes',
        params: {
          campeonatoId: '1',
          anio: '1958',
        },
      }}
    />
  );
}