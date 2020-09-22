import React, {useState, useRef} from 'react';
import './tree-leaf.css';
import ICoord from "../../../../types/coord";
import { ITreeRow } from '../../../../types/tree';
import noOp from "../../../../noop";

interface IProps {
    node: ITreeRow;
}

const TreeLeaf = (props: IProps) => {
   
    const [startDragPos, setStartDragPos] = useState<ICoord|undefined>(undefined);
    const [startBlockPos, setStartBlockPos] = useState<ICoord|undefined>(undefined);    
    const [blockPos, setBlockPos] = useState<ICoord|undefined>(undefined);    
    

    const startDrag = (p: ICoord) => {
        setStartDragPos({...p});
        if(ref.current) {
            ref.current.addEventListener("selectstart", noOp);
            setStartBlockPos({x: ref.current.offsetLeft, y: ref.current.offsetTop});
        }
    };

    const mouseDown = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const p = {x: e.clientX, y: e.clientY};
        startDrag(p);
    };

    const touchStart = (e: React.TouchEvent<HTMLElement>) => {
        e.preventDefault();
        const p = {x: e.touches[0].clientX, y: e.touches[0].clientY};
        startDrag(p);
    };

    const dragging = (pos: ICoord) => {
        if(startDragPos && startBlockPos) {
            const deltaX = pos.x - startDragPos.x;
            const deltaY = pos.y - startDragPos.y;    
            setBlockPos({x: startBlockPos.x+deltaX, y: startBlockPos.y+deltaY});
        }            
    };

    const mouseMove = (e: React.MouseEvent<HTMLElement>) => {    
        const pos = {x: e.clientX, y:e.clientY};
        dragging(pos);
    };
  
    const touchMove = (e: React.TouchEvent<HTMLElement>) => {
        const pos = {x: e.touches[0].clientX, y: e.touches[0].clientY};
        dragging(pos);
    };

    const stopDrag = (p: ICoord) => {
        setStartDragPos(undefined);
        setStartBlockPos(undefined);
    }

    const mouseUp = (e: React.MouseEvent<HTMLElement>) => {    
        e.stopPropagation();
        e.preventDefault()
        const pos = {x: e.clientX, y:e.clientY};        
        stopDrag(pos);
    };

    const touchEnd = (e: React.TouchEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault()
        const pos = {x: e.touches[0].clientX, y: e.touches[0].clientY};
        stopDrag(pos);
    };

    const ref = useRef<HTMLLIElement|null>(null);

    let style={};    
    if(blockPos && ref.current) {
        style = {left: blockPos.x, top: blockPos.y, position: "absolute"};
        console.log(`dragging ${props.node.name} style=`)
        console.dir(style)
    };

    let r;
    if(startDragPos) {
        r= (
            <li ref={ref}
                className="treeleaf"  
                style={style}                
            >
                {props.node.icon}
                <span className="treeleaf-label noselect">
                    {props.node.name}
                </span>
            </li>
        );
    } else {
        r= (
            <li ref={ref}
                className="treeleaf"  
                onMouseDown = {(e) => mouseDown(e)}      
                onTouchStart = {(e) => touchStart(e)}
            >
                {props.node.icon}
                <span className="treeleaf-label noselect">
                    {props.node.name}
                </span>
            </li>
        );
    }

    return r;
};

export default TreeLeaf;