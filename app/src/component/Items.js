
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { setType, getType } from '../store';
import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import Item from './Item';

const Items = () => {
    const { type } = useParams();
    const [typeObj, setTypeObj] = useState(getType());
   
    const handleAction = (payload) =>{
        let tmptypeObj = { ...typeObj }
        switch(payload.type){
            case 'addItem':
                tmptypeObj[payload.key].childs = tmptypeObj[payload.key]?.childs ? tmptypeObj[payload.key].childs : [];
                let fields = typeObj[payload.key].fields;
                let childData = {}
                fields.map(ele => {
                    childData[ele.id] = '';
                });
                tmptypeObj[payload.key].childs.push(childData)
            break;
            case 'updateItem':
                tmptypeObj[payload.key].childs[payload.index][payload.typeKey] = payload.val;
            break;
            case 'deleteItem':
                tmptypeObj[payload.key].childs.splice(payload.index, 1);
            break;
            default: 
            break;
        }
        setType(tmptypeObj);
        setTypeObj(tmptypeObj);
    }
    const addItem = (key) => {
        let tmptypeObj = { ...typeObj };
        tmptypeObj[key].childs = tmptypeObj[key]?.childs ? tmptypeObj[key].childs : [];
        let fields = typeObj[key].fields;
        let childData = {}
        fields.map(ele => {
            childData[ele.id] = '';
        });
        tmptypeObj[key].childs.push(childData)
        setTypeObj(tmptypeObj);
    }
    const updateItem = (key, index, val, typeKey) => {
        let tmptypeObj = { ...typeObj };
        tmptypeObj[key].childs[index][typeKey] = val;
        setTypeObj(tmptypeObj);
    }
    const deleteItem = (key, index) => {
        let tmptypeObj = { ...typeObj }
        tmptypeObj[key].childs.splice(index, 1);
        setTypeObj(tmptypeObj);
    }
    return (
        <Container fluid="sm">
            <Row className="text-sm-start">
                {type ? <>
                    {
                      typeObj[type]?.childs &&  typeObj[type].childs.map((item, index) => {
                            let ft = typeObj[type].fields.find(a => a.title === typeObj[type].title)
                            return (<Item key={'item_' + type + index} data={{ item, fields: typeObj[type].fields, typeObj, key: type, index, ft }} event={handleAction} />)
                        })}
                </> : <>
                    {Object.keys(typeObj).map(key => {
                        let items = typeObj[key]?.childs || [];
                        let fields = typeObj[key].fields;
                        return items.map((item, index) => {
                            let ft = fields.find(a => a.title === typeObj[key].title)
                            return (<Item key={'item_' + key + index} data={{ item, fields, typeObj, key, index, ft }} event={handleAction} />)
                        })
                    })}</>}
                <Col className={'m-2'} sm>
                    {type ?
                        <Button variant="primary" size="md" onClick={() => { handleAction({type:'addItem', key: type}) }}>
                            Add Item
                        </Button>
                        :
                        <DropdownButton id="dropdown-item-button" title="Add Item">
                            {Object.keys(typeObj).map((ele, j) => {
                                return <Dropdown.Item key={'dropdown_' + j} as="button" onClick={() => { handleAction({type:'addItem', key: ele}) }}>{typeObj[ele].type}</Dropdown.Item>
                            })}
                        </DropdownButton>
                    }
                </Col>
            </Row>
        </Container>
    );
}
export default Items;