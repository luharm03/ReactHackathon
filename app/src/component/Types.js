
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {setType, getType} from '../store';
import React, { useState } from "react";
import Type from './Type';

const fieldType = ["text", "date", "checkbox", "number"];
const getUniqueId = () =>{
    return Math.floor(Date.now() / 1000)
}

const Types = () => {
    const [typeObj, setTypeObj] = useState(getType());
    const handleAction = (payload) =>{
        let tmptypeObj = { ...typeObj }
        let id = getUniqueId();
        switch(payload.type){
            case 'addType':
                tmptypeObj[id] = { type: '', title: 'Title', fields: [{id:id, title: 'Title', type: fieldType[0] }] }
            break;
            case 'updateType':
                tmptypeObj[payload.key][payload.typeKey] = payload.val;
            break;
            case 'deleteType':
                delete tmptypeObj[payload.key];
            break;
            case 'addField':
                tmptypeObj[payload.key].fields.push({ id: id, title: "", type: payload.typeKey });
            break;
            case 'updateField':
                tmptypeObj[payload.key].fields[payload.index][payload.typeKey] = payload.val;
            break;
            case 'deleteField':
                tmptypeObj[payload.key].fields.splice(payload.index, 1);
            break;
            default: 
            break;
        }
        setType(tmptypeObj);
        setTypeObj(tmptypeObj);
    }
    return (
        <Container>
            <Row className="text-sm-start">
                {Object.keys(typeObj).map(key => {
                    return (<Type key={'key_' + key } data={{ typeObj, key,fieldType }} event={handleAction} />)
                })}
                <Col sm>
                    <Button variant="secondary" size="lg" onClick={()=>{handleAction({type:'addType'})}}>
                        Add Type
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
export default Types;