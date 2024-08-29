import CustomButton from '../customButton/CustomButton'
import info from '../../assets/info.svg'
import energy from '../../assets/energy.svg'
import energyWhite from '../../assets/energy_white.png'
import infoWhite from '../../assets/info_white.png'
import './index.scss'
import { useEffect, useState } from 'react'
import getCompaniesLocations from '../../core/services/getCompaniesLocations'
import getCompaniesAssets from '../../core/services/getCompaniesAssets'
import { TreeItem, TreeView } from '../treeView/TreeView'
import Detail from '../detail/Detail'


const Board = (props: any) => {
  const [listLocations, setListLocations] = useState<any[]>([])
  const [listAssets, setListAssets] = useState<any[]>([])
  const [loadList, setLoadList] = useState<boolean>(false)
  const [filterCritical, setFilterCritical] = useState<boolean>(false)
  const [filterEnergy, setFilterEnergy] = useState<boolean>(false)
  const [final, setFinal] = useState<any[]>([])
  const [itemDetail, setItemDetail] = useState<any>({})
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleGetLists = async () => {
    if (props.data.id !== undefined) {
      setFinal([])
      const resultLocations = await getCompaniesLocations(props.data.id);
      const resultAssets = await getCompaniesAssets(props.data.id);
      if(resultAssets.legth !== 0 && resultLocations.legth !== 0) {
        setListLocations(resultLocations)
        setListAssets(resultAssets)
      }
      setLoadList(true)
    }
  }
  useEffect(() => {
    handleGetLists()
  }, [props])

  useEffect(() => {
    if (loadList) {
      if (listLocations.length !== 0) {
        setFinal([{ name: 'Root', items: groupItems(listLocations.concat(listAssets)), parentId: null }])
        setLoadList(false)
      }
    }
  }, [loadList])

  useEffect(() => {
    const filteredData = filterItemsByCriteria(final, searchTerm, filterCritical, filterEnergy);
    setSearchResults(filteredData);
    if(!filterCritical && searchTerm === '' && !filterEnergy) {
      setSearchResults([])
    }
  }, [filterCritical, filterEnergy])

  const groupItems = (items: any[]) => {
    const itemMap: any = {};
    const tree: any[] = [];
    items.forEach(item => {
      itemMap[item.id] = { ...item, items: [] };
    });
    items.forEach(item => {
      if (item.parentId) {
        if (itemMap[item.parentId]) {
          itemMap[item.parentId].items.push(itemMap[item.id]);
        }
      } else if (item.locationId) {
        if (itemMap[item.locationId]) {
          itemMap[item.locationId].items.push(itemMap[item.id]);
        }
      } else {
        tree.push(itemMap[item.id]);
      }
    });
    return tree;
  };

  const renderSubtrees = (trees: any[]) => {
    return trees.map((tree) => {
      if (!tree?.items?.length) {
        return <TreeItem key={tree.id} tree={tree} onChangeValueComponent={onChangeValueComponent} selected={itemDetail.id === tree.id}/>;
      }

      return (
        <TreeItem key={tree.id} tree={tree} onChangeValueComponent={() => { }} isSearch={searchResults.length !== 0}>
          {renderSubtrees(tree?.items)}
        </TreeItem>
      );
    });
  };

  const filterItemsByCriteria: any = (items: any[], nameTerm: string, statusTerm: boolean, sensorTypeTerm: boolean) => {
    return items
      .map(item => {
        const matchesName = nameTerm ? item.name.toLowerCase().includes(nameTerm.toLowerCase()) : true;
        const matchesStatus = statusTerm ? (item.status && item.status.toLowerCase() === 'alert') : true;
        const matchesSensorType = sensorTypeTerm ? (item.sensorType && item.sensorType.toLowerCase() === 'energy') : true;
        const filteredItems = filterItemsByCriteria(item.items || [], nameTerm, statusTerm, sensorTypeTerm);
        if ((matchesName && matchesStatus && matchesSensorType) || filteredItems.length > 0) {
          return {
            ...item,
            items: filteredItems
          };
        }
        return null;
      })
      .filter(item => item !== null);
  }
  const handleSearch = (event: any) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const filteredData = filterItemsByCriteria(final, value, filterCritical, filterEnergy);
      setSearchResults(filteredData);


    } else {
      setSearchResults([]);
    }
  };

  const onChangeValueComponent = (value: any) => {
    setItemDetail(value)
    console.log(value);
  }

  return (
    <div className="board-container">
      <div className="board-container-header">
        <span> <strong>Ativos</strong> / {props.data.name} Unit</span>
        <div className="board-container-header__buttons">
          <CustomButton 
            color={filterEnergy ? '#FFFFFF' : '#77818C'}
            colorButton={filterEnergy? '#2188FF' :'#FFFFFF'}
            borderColor='#77818C'
            key={2} 
            title={
              <span className="board-container-header__buttons-button">
                <img className="board-container-header__buttons-button-image" src={filterEnergy ? energyWhite :energy}></img> Sensor de energia
              </span>
            } 
            onChange={() => { setFilterEnergy(!filterEnergy) }}
            />
          <CustomButton 
            color={filterCritical ? '#FFFFFF' :'#77818C'}
            colorButton={filterCritical? '#2188FF' :'#FFFFFF'}
            borderColor='#77818C'
            key={3}
            title={
              <span className="board-container-header__buttons-button">
                <img className="board-container-header__buttons-button-image" src={filterCritical? infoWhite: info}></img> Crítico
              </span>
            }
            onChange={() => { setFilterCritical(!filterCritical) }}
          />
        </div>
      </div>
      <div className="board-container-body">
        <div className="board-container-body-listItems">
          <div className="board-container-body-listItems__input">
            <input
              className="board-container-body-listItems__input-item"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Digite o nome para buscar..."
            />
          </div>
          <div className="board-container-body-listItems__list">
            { 
              searchTerm === '' && !filterCritical && !filterEnergy ?
                <TreeView>{renderSubtrees(final)}</TreeView>: 
                searchResults.length !== 0 ?
                <TreeView>{renderSubtrees(searchResults)}</TreeView> : <>No Result</>
            }
          </div>
        </div>
        <div className="board-container-body-item-detail">
          {
            itemDetail.gatewayId !== undefined || final.length !== 0 ? <Detail itemDetail={itemDetail} /> : <></>
          }
        </div>
      </div>
    </div>
  )

}

export default Board