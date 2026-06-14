

export type ModeSelector = 'All' | 'Save' | 'Hunt' | 'Statistic'; 

export type ModeLocalStorage = Extract<ModeSelector, 'Save' | 'Hunt'>;
