import { useSyncExternalStore } from 'react';
import { appStore, initialRootState, type RootState } from './AppStore';

const subscribe = (onStoreChange: () => void) =>
  appStore.subscribe({
    update: () => onStoreChange(),
  });

export function useAppStore(): RootState {
  return useSyncExternalStore(
    subscribe,
    () => appStore.getState(),
    () => initialRootState,
  );
}

export function useAppDispatch() {
  return appStore.dispatch.bind(appStore);
}
