import ICoord from "../types/coord";

export const actionTypes = {
    SET_STARTDRAGTEMPLATE: "SET_STARTDRAGTEMPLATE",
    SET_DRAGTEMPLATEPOS: "SET_DRAGTEMPLATEPOS",
    SET_ENDDRAG: "SET_ENDDRAG",
};

export interface IAction {
    type: string;
    dragTemplateStartPos?: ICoord;
    dragTemplateName?: string;
    dragTemplatePos?: ICoord;
}

export interface IState {
    dragTemplateName?: string;
    dragTemplateStartPos?: ICoord
    dragTemplatePos?: ICoord
}

export const initialState: IState = {
};

export type IReducer = (state: IState, action: IAction) => IState;

export interface IReducerDispatch {
    state: IState,
    dispatch: React.Dispatch<IAction>
};
