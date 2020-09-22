import {IAction, IState, IReducer, actionTypes} from "./types";

const reducer: IReducer = (state: IState, action: IAction) => {
    let nextState: IState = state;
    switch(action.type) {
        case actionTypes.SET_STARTDRAGTEMPLATE:
            if(action.dragTemplateStartPos && action.dragTemplateName) {
                nextState = {...state, dragTemplateStartPos: {...action.dragTemplateStartPos}, dragTemplateName: action.dragTemplateName};
                console.log(`SET_STARTDRAGTEMPLATE nextstate = `)
                console.dir(nextState)
            }
            break;
        case actionTypes.SET_DRAGTEMPLATEPOS:
            if(action.dragTemplatePos) {
                nextState = {...state, dragTemplatePos: {...action.dragTemplatePos}};
                console.log(`SET_DRAGTEMPLATEPOS nextstate = `)
                console.dir(nextState)
            }
            break;
        case actionTypes.SET_ENDDRAG:
            nextState = {...state, dragTemplatePos: undefined, dragTemplateName: undefined, dragTemplateStartPos: undefined};
            console.log(`SET_ENDDRAG nextstate = `)
            console.dir(nextState)
            break;
        }
    return nextState;
};
export default reducer;
