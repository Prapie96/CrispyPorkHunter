import { modeSelector } from "../const/map";


export type ModeSideBar = 'default' | 'saved' | 'hunt';

export type ActionButtonLocalStorage = Exclude<ModeSideBar,"default">;

// type mode = typeof modeSelector [keyof typeof modeSelector]