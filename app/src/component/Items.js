
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { setType, getType } from '../store';
import React, { useState } from "react";
import { useParams } from 'react-router-dom';

const Items = (props) => {
    const { type } = useParams();
    const [typeObj, updateTypeObj] = useState(getType());
    const setTypeObj = (obj) => {
        setType(obj);
        updateTypeObj(obj);
    }
    const addItem = (key) => {
        let tmptypeObj = { ...typeObj };
        tmptypeObj[key].childs = tmptypeObj[key]?.childs ? tmptypeObj[key].childs : [];
        let fields = typeObj[key].fields;
        let childData = {}
        fields.map(ele => {
            childData[ele.id] =  '';
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
    console.log(props, type,typeObj);
    return (
        <Container>
            <Row className="text-sm-start">
                {Object.keys(typeObj).map(key => {
                    let items = typeObj[key]?.childs || [];
                    let fields = typeObj[key].fields;
                    
                   return items.map((item, index) => {
                        let ft = fields.find(a=> a.title === typeObj[key].title )
                        return (
                            <Col className={'mt-2'} xs={3} key={'item_' + key + index} >
                                <Card style={{ width: '18rem' }}>
                                    <Card.Header>
                                        {typeObj[key].type + ' - ' +  (item[ft.id] ? item[ft.id] :  'No title')}
                                        <CloseButton onClick={() => { deleteItem(key,index) }} className='float-end' />
                                    </Card.Header>
                                    <Card.Body>
                                        {fields.map((field, j) => {
                                            return (<InputGroup className="mb-3" key={'field_' + key + j}>
                                                {field.type === 'checkbox' ? 
                                                <Form.Check 
                                                type={'checkbox'}
                                                id={`default-${field.title}`}
                                                label={field.title}
                                              />
                                                :
                                                <>
                                                <Form.Label htmlFor="obj-type">{field.title}</Form.Label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control type={field.type} id="obj-type" placeholder={'Enter '+  field.title} value={item[field.id]} onChange={(e) => { updateItem(key, index, e.target.value, field.id) }} />
                                                </InputGroup></>
                                                }
                                            </InputGroup>)
                                        })}
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })
                })}
                <Col className={'m-2'} xs={2}>
                    {type ?
                        <Button variant="secondary" size="lg" onClick={() => { addItem(type) }}>
                            Add Item
                        </Button>
                        :
                        <DropdownButton id="dropdown-item-button" title="Add Item">
                            {Object.keys(typeObj).map((ele, j) => {
                                return <Dropdown.Item key={'dropdown_' + j} as="button" onClick={() => { addItem(ele) }}>{typeObj[ele].type}</Dropdown.Item>
                            })}
                        </DropdownButton>
                    }
                </Col>
            </Row>
        </Container>
    );
}
export default Items;