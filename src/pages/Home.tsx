import RecipeListItem from '../components/RecipeListItem';
import { useState } from 'react';
import { Recipe, get } from '../data/RecipeModel';
import {
  IonContent,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useIonViewWillEnter(async () => {
    setRecipes(await get('recipes'));
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList>
          {recipes.map(r => <RecipeListItem key={r.id} recipe={r} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
