import './index.scss'
import tractianLogo from '../../assets/logo_tractian.svg'
import gold from '../../assets/gold.svg'
import CustomButton from '../customButton/CustomButton'
import { useEffect, useState } from 'react'

export const Header = (props: any) => {
    const [selected, setSelected] = useState(0)
    useEffect(() => {
        if(props.companiesList.length !== 0) props.data(props.companiesList[0])
        
    },[props.companiesList])
    return(
        <div className="header-container">
            <img className="header-container__image" src={tractianLogo} alt="Logo Tractian" />
            <div className="header-container-buttons">
                {props.companiesList.map((x: any, index: number) => 
                    <CustomButton 
                        color='#FFFFFF'
                        colorButton={selected === index? '#2188FF' : '#023B78'} 
                        borderColor={selected === index? '#2188FF' : '#023B78'} 
                        key={index} 
                        title={
                            <span>
                                <img src={gold}></img> {x.name} Unit
                            </span>
                        }
                        onChange={
                            () => {
                                props.data(x)
                                setSelected(index)
                            }
                        }
                    />
                )}
            </div>
        </div>
    )
}


export default Header