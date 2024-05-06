# Store

## store 디렉토리

전역에서 관리할 상태들 정의
상태관리 라이브러리: [zustand](https://zustand-demo.pmnd.rs/)

## Concept

- 단일 store를 사용하지 않고 아래와 같이 하나의 store는 하나의 상태에 대해서만 관리 하도록 지향한다.
- store에는 State만 정의 한다.
- Action은 분리해서 작성한다.
- 파생 상태가 필요하면 `useStore(selector)`를 직접 작성하지 않고 Action-get~(e.g.getCartKeys)으로 작성한다.
- 파생 상태를 가져오는 get 함수를 작성 할때 `eslint-disable-next-line react-hooks/rules-of-hooks` 규칙을 disabled 해준다.
- 결국 Component에서는 { useCartSelector, useCartAction } 두가지만 사용하면 된다.

## Example

```ts
...
// State 타입 정의
type Item = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};
type CartState = {
  cart: Map<string, Item>;
};
const initCartState: CartState = {
  cart: new Map<string, Item>(),
};

const useCartStore = create(devtools<CartState>(() => initCartState, { name: 'cartStore' }));
export const useCartSelector = withSelector(useCartStore);

// 액션 함수들 타입 정의
type CartAction = {
  addCart: (item: Item) => void;
  removeCart: (itemId: Item['id']) => void;
  updateItemQuantity: (itemId: Item['id']) => void;
  updateItemPrice: (itemId: Item['id']) => void;
  getCartKeys: () => string[];
  getCartSize: () => number;
  getCartItem: (itemId: Item['id']) => Item | undefined;
  getItemName: (itemId: Item['id']) => Item['name'];
  getItemPrice: (itemId: Item['id']) => Item['price'];
  getItemQuantity: (itemId: Item['id']) => Item['quantity'];
};

// 액션 함수 개별 작성
const addCart: CartAction['addCart'] = (item) => {
  const prevCart = useCartStore.getState().cart;
  if (prevCart.get(item.id)) return;
  const newCart = new Map(prevCart);
  newCart.set(item.id, item);
  useCartStore.setState(() => ({ cart: newCart }));
};
const removeCart: CartAction['removeCart'] = (itemId) => {
  const prevCart = useCartStore.getState().cart;
  if (!prevCart) return;
  const newCart = new Map(prevCart);
  newCart.delete(itemId);
  useCartStore.setState(() => ({ cart: newCart }));
};
const updateItemQuantity: CartAction['updateItemQuantity'] = (itemId) => {
  const prevCart = useCartStore.getState().cart;
  const prevItem = prevCart.get(itemId);
  if (!prevItem) return;
  const newCart = new Map(prevCart);
  const updatedItem = { ...prevItem, quantity: prevItem.quantity + 1 };
  newCart.set(itemId, updatedItem);
  useCartStore.setState(() => ({ cart: newCart }));
};
const updateItemPrice: CartAction['updateItemPrice'] = (itemId) => {
  const prevCart = useCartStore.getState().cart;
  const prevItem = prevCart.get(itemId);
  if (!prevItem) return;
  const newCart = new Map(prevCart);
  const updatedItem = { ...prevItem, price: prevItem.price + 1 };
  newCart.set(itemId, updatedItem);
  useCartStore.setState(() => ({ cart: newCart }));
};

// 파생 상태 getter 함수 정의(일반적으로 리렌더링 최적화를 위해 필요함)
const getCartKeys = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cartKeys = useCartStore((state) => [...state.cart.keys()], shallow);
  return cartKeys;
};
const getCartSize = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cartSize = useCartStore((state) => state.cart.size, shallow);
  return cartSize;
};
const getCartItem = (itemId: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cartItem = useCartStore((state) => state.cart.get(itemId));
  return cartItem;
};
const getItemName = (itemId?: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const itemName = useCartStore((state) => {
    if (!itemId) return '';
    const item = state.cart.get(itemId);
    if (!item) return '';
    return item.name;
  });
  return itemName;
};
const getItemPrice = (itemId?: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const itemPrice = useCartStore((state) => {
    if (!itemId) return 0;
    const item = state.cart.get(itemId);
    if (!item) return 0;
    return item.price;
  });
  return itemPrice;
};
const getItemQuantity = (itemId?: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const itemQuantity = useCartStore((state) => {
    if (!itemId) return 0;
    const item = state.cart.get(itemId);
    if (!item) return 0;
    return item.quantity;
  });
  return itemQuantity;
};

// 액션 함수 모음 useCartAction export
export const useCartAction = (): CartAction => ({
  addCart,
  removeCart,
  updateItemQuantity,
  updateItemPrice,
  getCartKeys,
  getCartSize,
  getCartItem,
  getItemName,
  getItemPrice,
  getItemQuantity,
});

```

## Usage

### 예시파일1: store/useCountStore.ts
