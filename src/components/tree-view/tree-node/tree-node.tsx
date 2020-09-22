import React, {useState} from 'react';
import './tree-node.css';
import ITreeNode from '../../../types/tree';
import TreeLeaf from "./tree-leaf";

interface IProps {
  node: ITreeNode;
}

const TreeNode = (props: IProps) => {
    
    const [isOpen, setOpen] = useState<boolean>(props.node.isOpen);
    const toggleOpen = () => {
        console.log(`toggleOpen`)
        setOpen(!isOpen);
    };


    const rows = [];    
    for(let i=0; isOpen && i<props.node.items.length; i++) {
        const it = props.node.items[i];
        const r = (
            <TreeLeaf key={i} node={it} />
        );
        rows.push(r);
    }
    let circle = "fa-plus-circle";
    if(isOpen) {
        circle = "fa-minus-circle";
    }
    return (        
          <li className="treenode">
              <a className="treenode-listheader" onClick={()=>{toggleOpen()}}>
                <i className={`fas ${circle} treenode-icon`}></i>
                <span className="treenode-menulabel noselect">
                    {props.node.label}                
                </span>
                <ul className="treenode">
                    {rows} 
                </ul>
              </a>
          </li>                                
    );
};

export default TreeNode;
  