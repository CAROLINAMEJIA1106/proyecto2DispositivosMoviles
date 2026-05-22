

import {
  useLocalSearchParams,
  useRouter
} from "expo-router";








import { UseCreatePaisGanador } from "../../domain/presentation/hook/useCreatePaisGanador";
import { UseUpdatePaisGanador } from "../../domain/presentation/hook/useUpdatePaisGanador";

export default function PaisGanadorEdit(){
    const router = useRouter();
    const {
        createPaisGanador,
        isLoading: isCreating,
        error: createError,
      } = UseCreatePaisGanador();

      const {
          updatePaisGanador,
          isLoading: isUpdating,
          error: updateError,
        } = UseUpdatePaisGanador();

        const {
            id,
            nombre,
            num_campeonatos ,
            bandera,
            anios
          } = useLocalSearchParams<{
        
            id?: string;
            nombre?: string;
            num_campeonatos?: string;
            bandera?: string;
            anios?: string;
          }>();

          const isEdit = Boolean(id);
          const goBack = () => {

    // TODO:
    // cambiar navegación hacia listPaises
    // cuando se integre módulo países

    router.back(); // cambiar navegación hacia listPaises: router.push("/(paises)/listPaises");
  };

}