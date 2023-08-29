# FoodBunny
Food Ordering App project which uses swiggy's api to fetch live restaurants data. This web app is only for project learning purpose.

<details><summary><font size=5>Redux store implementation - ( 6 easy steps ) : </font></summary>

### 1. configure store using `configureStore`
      const AppStore = configureStore();

### 2. provide the store using `Provider`
  ```
    <Provider store={appStore}>              // this is for store
      <AppContext.Provider value={...}>      // this is for context
        ....
        ....
      </AppContext.Provider>
    </Provider>
  ```
### 3. create slice using `createSlice`
  - #### give default name, initialState & reducers to the slice
  - #### export slice.reducer & all actions from it
  ```
      const cartSlice = createSlice({
        name: "cart",
        initialState: {
          items: [],
        },
        reducers: {
          addToCart: (state, action) => {
            state.items.push(action.payload);
          }
        },
      });

      export const { addToCart, ... } = cartSlice.actions; // this actions keyword is reserved
      export default cartSlice.reducer; // this reducer keyword is reserved
  ```
### 4. provide slice `reducer` to store reducer
  - #### slice reducer is used for slice & store reducer is used for store ( big object)
  ```
    const AppStore = configureStore({
      reducer: {
        cart: cartReducer,
        user: userReducer
      }
    });
  ```
### 5. dispatch an action using `useDispatch` hook
  ```
    const dispatch = useDispatch();
    dispatch(actionName(payload));
  ```
### 6. select the state OR subscribe to the state using `useSelector` hook
  ```
    const items = useSelector((store) => store.sliceName.items);
  ```
</details>

<details><summary><font size=5>Github pages deployment steps - ( 6 easy steps ) : </font></summary>


### 1. Add `predeploy` & `deploy` script in your root package.json
```
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "build": "react-scripts build",
  }
```
### 2. Run command - `npm run deploy`
### 3. Goto your github repository and click on `settings`
### 4. Click on `pages`
### 5. Select source - `Deploy from a branch`
### 6. Select branch as `gh-pages` - `/root` and save
## That's it. Your application is live now.
## To check the latest deployment, Goto github repository -> actions -> deployments -> active deployments
### If you are getting error like - `uncaught syntaxerror: unexpected token '<' on index.js`. It means, you are not deploying your app from `gh-pages`. Please change the branch source and re-run `npm run deploy`.
</details>


#
# Happy Learning ❤️❤️🕉️❤️❤️