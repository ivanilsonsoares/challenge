import { useEffect, useState } from "react";
import "./index.scss";
import Arrow from '../../assets/arrow.svg'
import Locations from '../../assets/location.svg'
import Bolt from '../../assets/bolt.png'
import ComponentBlue from '../../assets/ComponentBlue.png'
import Component from '../../assets/component_white.png'
import Asset from '../../assets/asset.svg'

export function TreeItem(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(props.isSearch)
  }, [props.isSearch])

  const onChangeValueComponent = (tree: any) => {
    if (props.tree.gatewayId !== undefined) {
      props.onChangeValueComponent(tree)
    }
  }

  return (
    <div className="list" onClick={() => onChangeValueComponent(props.tree)}>
      <div className={`list-item${props.selected ? 'select' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <div className="list-item__icon">{props.children ? (ArrowIcon(isOpen)) : ""}</div>
        <div className={`list-item__title ${props.selected ? 'select' : ''}`} >
          {SetIcons(props.tree, props.selected)}{props.tree.name} 
          <>
            {
              props.tree.sensorType === 'energy' ? <img src={Bolt} alt="Bolt" /> : 
              props.tree?.status !== undefined && props.tree?.status !== null ? <div className={props.tree.status === "alert" ? "list-item__title-alert" : "list-item__title-status" }></div> : <></>
            }
          </>
        </div>
      </div>
      {isOpen && <div className="list-item-subtree">{props.children}</div>}
    </div>
  );
}

const ArrowIcon = (isOpen: boolean) => {
  return (<img src={Arrow} alt="arrow" className={isOpen ? 'open' : 'close'} />)
}

const SetIcons = (tree: any, selected: boolean) => {
  if (tree.parentId === null && tree.locationId === null && tree.gatewayId) {
    return (<img src={selected ? Component :ComponentBlue} alt="ComponentBlue" />)
  }

  if (tree.parentId === null && tree.locationId === undefined) {
    return (<img src={Locations} alt="Locations" />)
  }

  if (tree.parentId === null && tree.locationId !== null) {
    return (<img src={Asset} alt="Asset" />)
  }

  if (tree.parentId !== null && tree.gatewayId) {
    return (<img src={selected ? Component :ComponentBlue} alt="ComponentBlue" />)
  }

  if (tree.locationId !== null && tree.gatewayId !== undefined && tree.parentId === null) {
    return (<img src={Asset} alt="Asset" />)
  }

  return (<img src={Asset} alt="Asset" />)
}

export function TreeView(props: any) {
  return <>{props.children}</>;
}
