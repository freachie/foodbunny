# FoodBunny
Food Ordering App project which uses swiggy's api to fetch live restaurants data. This web app is only for project learning purpose.


## Redux store implementation steps - 

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

      export const { addToCart, ... } = cartSlice.actions; // this action keyword is reserved
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