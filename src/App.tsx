import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ViewRecipe from './pages/ViewRecipe';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { useEffect } from 'react';
import { createStore, get, set, Recipe, Ingredient, Instruction } from './data/RecipeModel';

setupIonicReact();

const App: React.FC = () => {

  useEffect(() => {
    const setUpStore = async () => {
      await createStore('RecipeStore');
      set('recipes', [{
        id: 0,
        name: 'Butterd Noodles',
        description: 'The best god damn dish in the world',
        ingredients: [
          {
            id: 0,
            name: 'Black Pepper',
            amount: 'Enough'
          } as Ingredient
        ],
        instructions: [
          {
            step: 0,
            description: 'Boil Water'
          } as Instruction
        ]
      } as Recipe]);
    }

    setUpStore();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={true}>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact={true}>
            <Home />
          </Route>
          <Route path="/recipe/:id">
            <ViewRecipe />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
