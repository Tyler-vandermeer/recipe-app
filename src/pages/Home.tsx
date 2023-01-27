import RecipeListItem from '../components/RecipeListItem';
import React, { useRef, useState } from 'react';
import { IRecipe, get, set, IInstruction, IIngredient } from '../data/RecipeModel';
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
} from '@ionic/react';
import { add, addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  useIonViewWillEnter(async () => {
    setRecipes(await get('recipes'));
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const handleDeleteRecipe = (id: number) => {
    const filteredRecipes = recipes.filter((v) => v.id !== id);
    setRecipes(filteredRecipes);
    set('recipes', filteredRecipes);
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleNewRecipeClick = (event: React.MouseEvent<HTMLIonFabButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const [recipeName, setRecipeName] = useState<string>('');
  const modal = useRef<HTMLIonModalElement>(null);
  modal.current?.onWillDismiss().then(() => setIsOpen(false));

  const submit = (event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
    event.preventDefault();
    const newId = Math.max(...recipes.map(r => r.id)) + 1;

    const newRecipe = {
      id: newId,
      name: recipeName,
      ingredients: ingredients as IIngredient[],
      instructions: instructions.map(v => ({ description: v})) as IInstruction[]
    } as IRecipe;

    const newRecipes = [...recipes, newRecipe];

    setRecipes(newRecipes);
    set('recipes', newRecipes);

    setRecipeName('');
    setIngredients([{ name: '', amount: 0 }]);
    setInstructions(['']);

    setIsOpen(false)
  }

  const handleRecipeNameChane = (event: React.ChangeEvent<HTMLIonInputElement>) => {
    setRecipeName(`${event.currentTarget.value}`);
  }

  const [ingredients, setIngredients] = useState<any[]>([{ name: '', amount: 0 }]);

  const onIngredientNameChange = (event: React.ChangeEvent<HTMLIonInputElement>) => {
    const index = event.currentTarget.dataset.index;
    if (index !== undefined) {
      const newIngredients = ingredients
      newIngredients[+index].name = event.currentTarget.value;
      setIngredients(newIngredients);
    }
  }

  const onIngredientAmountChange = (event: React.ChangeEvent<HTMLIonInputElement>) => {
    const index = event.currentTarget.dataset.index;
    if (index !== undefined) {
      const newIngredients = ingredients
      newIngredients[+index].amount = event.currentTarget.value;
      setIngredients(newIngredients);
    }
  }

  const displayIngredients = () => {
    return ingredients.map((v, i) => {
      return (
        <IonItem key={i}>
          <IonInput type="text" placeholder="Ingredient Name" data-index={i} value={v.name} onInput={onIngredientNameChange} />
          <IonInput type="number" placeholder='1oz' data-index={i} value={v.amount} onInput={onIngredientAmountChange} />
        </IonItem>
      )
    });
  }

  const handleAddIngredientField = (event: React.MouseEvent<HTMLIonIconElement, MouseEvent>) => {
    event.preventDefault();
    setIngredients([...ingredients, { name: '', amount: 0 }]);
  }

  const handleRemoveIngredientField = (event: React.MouseEvent<HTMLIonIconElement, MouseEvent>) => {
    event.preventDefault();
    const newFields = ingredients;
    newFields.pop();
    setIngredients([...newFields]);
  }

  const [instructions, setInstructions] = useState<string[]>(['']);

  const onInstructionChange = (event: React.ChangeEvent<HTMLIonInputElement>) => {
    const index = event.currentTarget.dataset.index;
    if (index !== undefined) {
      const newInstructions = instructions
      const value = event.currentTarget.value as string;
      newInstructions[+index] = value;
      setInstructions(newInstructions);
    }
  }

  const displayInstructions = () => {
    return instructions.map((v, i) => {
      return (
        <IonItem key={i}>
          <IonInput type="text" placeholder="Instructiuon Description" data-index={i} value={v} onInput={onInstructionChange} />
        </IonItem>
      )
    });
  }

  const handleAddInstructionField = (event: React.MouseEvent<HTMLIonIconElement, MouseEvent>) => {
    event.preventDefault();
    setInstructions([...instructions, '']);
  }

  const handleRemoveInstructionField = (event: React.MouseEvent<HTMLIonIconElement, MouseEvent>) => {
    event.preventDefault();
    const newFields = instructions;
    newFields.pop();
    setInstructions([...newFields]);
  }

  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList>
          {recipes.map(r => <RecipeListItem key={r.id} recipe={r} handleDeleteRecipe={handleDeleteRecipe} />)}
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
                <IonButton strong={true} onClick={submit}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Recipe Name:</IonLabel>
              <IonInput type="text" placeholder="Recipe Name" onInput={handleRecipeNameChane} value={recipeName} />
            </IonItem>

            <IonItemGroup>
              <IonIcon icon={addCircleOutline} style={{ position: 'absolute', right: '1em' }} onClick={handleAddIngredientField} />
              <IonIcon icon={removeCircleOutline} style={{ position: 'absolute', right: '2.5em' }} onClick={handleRemoveIngredientField} />
              <IonLabel position="stacked">Ingredients:</IonLabel>
              <br />
              {displayIngredients()}
            </IonItemGroup>

            <IonItemGroup>
              <IonIcon icon={addCircleOutline} style={{ position: 'absolute', right: '1em' }} onClick={handleAddInstructionField} />
              <IonIcon icon={removeCircleOutline} style={{ position: 'absolute', right: '2.5em' }} onClick={handleRemoveInstructionField} />
              <IonLabel position="stacked">Instructions:</IonLabel>
              <br />
              {displayInstructions()}
            </IonItemGroup>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
