import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useRef,
  useState,
} from 'react';

const AppLauncherContext = createContext(null);

// ─── Reducer & Initial State ───

const initialState = {
  launchedApp: null,
  appOrigin: null,
  phase: 'idle', // "idle" | "opening" | "open" | "closing"
};

const ACTION_TYPES = {
  LAUNCH_APP: 'LAUNCH_APP',
  FINISH_OPENING: 'FINISH_OPENING',
  START_CLOSING: 'START_CLOSING',
  FINISH_CLOSING: 'FINISH_CLOSING',
};

function launcherReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.LAUNCH_APP:
      if (state.phase !== 'idle') return state;
      return {
        ...state,
        launchedApp: action.payload.app,
        appOrigin: action.payload.origin,
        phase: 'opening',
      };

    case ACTION_TYPES.FINISH_OPENING:
      if (state.phase !== 'opening') return state;
      return {
        ...state,
        phase: 'open',
      };

    case ACTION_TYPES.START_CLOSING:
      if (state.phase !== 'open') return state;
      return {
        ...state,
        appOrigin: action.payload.origin || state.appOrigin,
        phase: 'closing',
      };

    case ACTION_TYPES.FINISH_CLOSING:
      if (state.phase !== 'closing') return state;
      return {
        launchedApp: null,
        appOrigin: null,
        phase: 'idle',
      };

    default:
      return state;
  }
}

// ─── Provider Component ───

export function AppLauncherProvider({ children }) {
  const [state, dispatch] = useReducer(launcherReducer, initialState);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [headerOffset, setHeaderOffset] = useState(0);

  const iconRefs = useRef({});
  const phoneFrameRef = useRef(null);

  const registerIconRef = useCallback((appId, ref) => {
    if (ref) {
      iconRefs.current[appId] = ref;
    }
  }, []);

  const registerPhoneFrameRef = useCallback((ref) => {
    phoneFrameRef.current = ref;
  }, []);

  const recalculateOrigin = useCallback((appId) => {
    const iconEl = iconRefs.current[appId];
    const frameEl = phoneFrameRef.current;
    if (!iconEl || !frameEl) return null;

    const iconRect = iconEl.getBoundingClientRect();
    const frameRect = frameEl.getBoundingClientRect();

    return {
      x: iconRect.left - frameRect.left,
      y: iconRect.top - frameRect.top,
      width: iconRect.width,
      height: iconRect.height,
    };
  }, []);

  const launchApp = useCallback(
    (app) => {
      const origin = recalculateOrigin(app.id);
      if (!origin) return;

      dispatch({
        type: ACTION_TYPES.LAUNCH_APP,
        payload: { app, origin },
      });
    },
    [recalculateOrigin]
  );

  const closeApp = useCallback(() => {
    setIsFullscreen(false);
    const freshOrigin = state.launchedApp
      ? recalculateOrigin(state.launchedApp.id)
      : null;

    dispatch({
      type: ACTION_TYPES.START_CLOSING,
      payload: { origin: freshOrigin },
    });
  }, [state.launchedApp, recalculateOrigin]);

  const onAnimationComplete = useCallback(() => {
    if (state.phase === 'opening') {
      dispatch({ type: ACTION_TYPES.FINISH_OPENING });
    } else if (state.phase === 'closing') {
      dispatch({ type: ACTION_TYPES.FINISH_CLOSING });
    }
  }, [state.phase]);

  const isAppOpen = state.phase !== 'idle';

  return (
    <AppLauncherContext.Provider
      value={{
        ...state,
        isAppOpen,
        isFullscreen,
        setIsFullscreen,
        headerOffset,
        setHeaderOffset,
        launchApp,
        closeApp,
        onAnimationComplete,
        registerIconRef,
        registerPhoneFrameRef,
      }}
    >
      {children}
    </AppLauncherContext.Provider>
  );
}

// ─── Custom Hook ───

// eslint-disable-next-line react-refresh/only-export-components
export function useAppLauncher() {
  const ctx = useContext(AppLauncherContext);
  if (!ctx) {
    throw new Error('useAppLauncher must be used within AppLauncherProvider');
  }
  return ctx;
}
