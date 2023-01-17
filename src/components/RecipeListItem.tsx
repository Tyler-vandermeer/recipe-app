import {
  IonItem,
  IonLabel
  } from '@ionic/react';
import { Recipe } from '../data/RecipeModel';
import './css/RecipeListItem.css';

interface RecipeListItemProps {
  recipe: Recipe;
}

const RecipeListItem: React.FC<RecipeListItemProps> = ({ recipe: recipe }) => {
  return (
    <IonItem routerLink={`/recipe/${recipe.id}`} detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {recipe.name}
        </h2>
        <p>
          {recipe.description}
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default RecipeListItem;
