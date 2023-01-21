import {
  IonItem,
  IonLabel
  } from '@ionic/react';
import { IRecipe } from '../data/RecipeModel';
import './css/RecipeListItem.css';

interface RecipeListItemProps {
  recipe: IRecipe;
}

const RecipeListItem: React.FC<RecipeListItemProps> = ({ recipe }) => {
  return (
    <IonItem routerLink={`/recipe/${recipe.id}`} detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {recipe.name}
        </h2>
      </IonLabel>
    </IonItem>
  );
};

export default RecipeListItem;
