import { useState } from 'react';
import { Recipe, get } from '../data/RecipeModel';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useParams } from 'react-router';
import './ViewRecipe.css';

function ViewRecipe() {
  const [recipe, setRecipe] = useState<Recipe>();
  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    const msg = {} as Recipe;// getMessage(parseInt(params.id, 10));
    setRecipe(msg);
  });

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Back" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {recipe ? (
          <>
            <IonItem>
              <IonIcon icon={personCircle} color="primary"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {recipe.name}
                </h2>
              </IonLabel>
            </IonItem>
          </>
        ) : (
          <div>Message not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewRecipe;
