import RecipeListItem from '../components/RecipeListItem';
import React, { MouseEventHandler, useRef, useState } from 'react';
import { Recipe, get } from '../data/RecipeModel';
import {
  IonContent,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonItemGroup,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { add, addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import './Home.css';
import { OverlayEventDetail } from '@ionic/core/components';

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

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleNewRecipeClick = (event: React.MouseEvent<HTMLIonFabButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const modal = useRef<HTMLIonModalElement>(null);
  modal.current?.onWillDismiss().then(() => setIsOpen(false));


  function submit() {

  }

  const [ingredientFields, setIngredientFields] = useState<React.ReactElement[]>([<IonItem><IonInput type="text" placeholder="Ingredient Name" /><IonInput type="number" placeholder='1oz'/></IonItem>]);
  const handleAddIngredientField= (event: React.MouseEvent<HTMLIonIconElement, MouseEvent>) => {
    event.preventDefault();
    setIngredientFields([...ingredientFields, <IonItem><IonInput type="text" placeholder="Ingredient Name" /><IonInput type="number" placeholder='1oz'/></IonItem>]);
  }

  const handleRemoveIngredientField= (event: React.MouseEvent<HTMLIonIconElement, MouseEvent>) => {
    event.preventDefault();
    const newFields = InstructionFields;
    newFields.pop();
    setInstructionFields([...newFields]);
  }
  
  const [InstructionFields, setInstructionFields] = useState<React.ReactElement[]>([<IonItem><IonInput type="text" placeholder="Instruction Name" /></IonItem>]);
  const handleAddInstructionField= (event: React.MouseEvent<HTMLIonIconElement, MouseEvent>) => {
    event.preventDefault();
    setInstructionFields([...InstructionFields, <IonItem><IonInput type="text" placeholder="Instruction Name" /></IonItem>]);
  }

  const handleRemoveInstructionField= (event: React.MouseEvent<HTMLIonIconElement, MouseEvent>) => {
    event.preventDefault();
    const newFields = InstructionFields;
    newFields.pop();
    setInstructionFields([...newFields]);
  }

  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList>
          {recipes.map(r => <RecipeListItem key={r.id} recipe={r} />)}
        </IonList>
        <IonFab slot="fixed" vertical='bottom' horizontal="end">
          <IonFabButton onClick={handleNewRecipeClick}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonModal ref={modal} isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Add Recipe</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => submit()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">

            <IonItem>
              <IonLabel position="stacked">Recipe Name:</IonLabel>
              <IonInput type="text" placeholder="Recipe Name" />
            </IonItem>

            <IonItemGroup>
              <IonIcon icon={addCircleOutline} style={{ position:'absolute', right:'1em'}} onClick={handleAddIngredientField}/>
              <IonIcon icon={removeCircleOutline} style={{ position:'absolute', right:'2.5em'}} onClick={handleRemoveIngredientField}/>
              <IonLabel position="stacked">Ingredients:</IonLabel>
              {ingredientFields}
            </IonItemGroup>

            <IonItemGroup>
              <IonIcon icon={addCircleOutline} style={{ position:'absolute', right:'1em'}} onClick={handleAddInstructionField}/>
              <IonIcon icon={removeCircleOutline} style={{ position:'absolute', right:'2.5em'}} onClick={handleRemoveInstructionField}/>
              <IonLabel position="stacked">Instructions:</IonLabel>
              {InstructionFields}
            </IonItemGroup>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
