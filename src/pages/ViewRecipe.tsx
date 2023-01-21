import { useState } from 'react';
import { IRecipe, getById } from '../data/RecipeModel';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { wineOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import './ViewRecipe.css';

function ViewRecipe() {
  const [recipe, setRecipe] = useState<IRecipe>();
  const params = useParams<{ id: string }>();

  useIonViewWillEnter(async () => {
    setRecipe(await getById('recipes', +params.id));
  });

  const displayIngredients = () => {
    return recipe?.ingredients.map((v, i) => {
      return (
        <IonItem key={i}>
          <IonLabel>{v.name}, {v.amount}</IonLabel>
        </IonItem>
      )
    })
  }

  const displayInstructions = () => {
    return recipe?.instructions.map((v, i) => {
      return (
        <IonItem key={i}>
          <IonLabel>{v.description}</IonLabel>
        </IonItem>
      )
    })
  }

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
              <IonLabel><h2>{recipe.name}</h2></IonLabel>
            </IonItem>
            <IonItem lines='none'>
              <IonLabel><h2>Ingredients:</h2></IonLabel>
            </IonItem>
            <IonList inset={true} style={{ marginTop: '0', marginBottom: '0' }}>
              {displayIngredients()}
            </IonList>
            <IonItem style={{ height: '0' }}/>
            <IonItem lines='none'>
              <IonLabel><h2>Instructions:</h2></IonLabel>
            </IonItem>
            <IonList inset={true} style={{ marginTop: '0' }}>
              {displayInstructions()}
            </IonList>
          </>
        ) : (
          <div>Message not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewRecipe;
