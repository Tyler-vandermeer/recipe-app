import {
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';
import { Recipe } from '../data/RecipeModel';
import './RecipeListItem.css';

interface RecipeListItemProps {
  recipe: Recipe;
}

const RecipeListItem: React.FC<RecipeListItemProps> = ({ recipe: message }) => {
  return (
    <IonItem routerLink={`/message/${message.id}`} detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {message.name}
        </h2>
        <p>
          {message.description}
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default RecipeListItem;
