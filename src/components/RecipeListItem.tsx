import {
  IonIcon,
  IonItem,
  IonLabel
} from '@ionic/react';
import { IRecipe } from '../data/RecipeModel';
import './css/RecipeListItem.css';
import { trashOutline, wineOutline } from 'ionicons/icons';

interface RecipeListItemProps {
  recipe: IRecipe;
  handleDeleteRecipe: ( id: number) => void
}

const RecipeListItem: React.FC<RecipeListItemProps> = ({ recipe, handleDeleteRecipe }) => {
  return (
    <div style={{ position: 'relative' }}>
      <IonIcon icon={trashOutline} onClick={(e) => handleDeleteRecipe(recipe.id)} style={{ position: 'absolute', top: '1em', right: '1.5em', zIndex: '999' }} />
      <IonItem routerLink={`/recipe/${recipe.id}`}>
        <IonIcon icon={wineOutline} />
        <IonLabel className="ion-text-wrap">
          <h2>
            &nbsp;{recipe.name}
          </h2>
        </IonLabel>
      </IonItem>
    </div>
  );
};

export default RecipeListItem;
