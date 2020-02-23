import {BehaviorSubject} from "rxjs";

export class GameState {
    private static _instance: GameState;

    private readonly _paused$: BehaviorSubject<boolean>;
    public get paused$() {return this._paused$}
    public get paused() {return this._paused$.value};
    public set paused(newState:boolean) {
        this._paused$.next(newState);
    }

    private readonly _score$: BehaviorSubject<number>;
    public get score$() {return this._score$}
    public get score() {return this._score$.value};
    public set score(newState:number) {
        this._score$.next(newState);
    }

    private constructor() {
        this._paused$ = new BehaviorSubject<boolean>(false);
        this._score$ = new BehaviorSubject<number>(0);
    }

    public static get instance() {
        if (!this._instance) {
            this._instance = new GameState();
        }

        return this._instance;
    }


}
