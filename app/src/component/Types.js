
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

import {setType, getType} from '../store';
import React, { useState } from "react";

const fieldType = ["text", "date", "checkbox", "number"];
const getUniqueId = () =>{
    return Math.floor(Date.now() / 1000)
}

const Types = () => {
    const [typeObj, updateTypeObj] = useState(getType());
    const setTypeObj = (obj) => {
        setType(obj)
        updateTypeObj(obj)
    }
    const addType = () => {
        let tmptypeObj = { ...typeObj }
        let id = getUniqueId();
        tmptypeObj[id] = { type: '', title: 'Title', fields: [{id:id, title: 'Title', type: fieldType[0] }] }
        console.log(tmptypeObj)
        setTypeObj(tmptypeObj)
    }
    const updateType = (key, val, typeKey) => {
        let tmptypeObj = { ...typeObj }
        tmptypeObj[key][typeKey] = val;
        setTypeObj(tmptypeObj);
    }
    const deleteType = (key) => {
        let tmptypeObj = { ...typeObj }
        delete tmptypeObj[key]
        setTypeObj(tmptypeObj)
    }
    const addField = (key, type) => {
        let tmptypeObj = { ...typeObj }
        let id = getUniqueId();
        tmptypeObj[key].fields.push({ id: id, title: "", type: type });
        setTypeObj(tmptypeObj);
    }
    const updateField = (key, index, val, typeKey) => {
        let tmptypeObj = { ...typeObj }
        tmptypeObj[key].fields[index][typeKey] = val;
        setTypeObj(tmptypeObj);
    }
    const deleteField = (key, index) => {
        let tmptypeObj = { ...typeObj }
        tmptypeObj[key].fields.splice(index, 1);
        setTypeObj(tmptypeObj);
    }

    return (
        <Container>
            <Row className="text-sm-start">
                {Object.keys(typeObj).map(key => {
                    return (
                        <Col xs={3} key={'key_' + key} >
                            <Card style={{ width: '18rem' }}>
                                <Card.Header>
                                    {typeObj[key].type}
                                    <CloseButton onClick={() => { deleteType(key) }} className='float-end' />
                                </Card.Header>
                                <Card.Body>
                                    <Form.Label htmlFor="obj-type">Object Type</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control id="obj-type" placeholder="Enter Type" value={typeObj[key].type}  onChange={(e) => { updateType(key, e.target.value, 'type') }} />
                                    </InputGroup>
                                    <Form.Label htmlFor="obj-title">Object Title</Form.Label>

                                    <InputGroup className="mb-3">
                                        <Form.Select aria-label="Title" value={typeObj[key].title}  onChange={(e) => { updateType(key, e.target.value, 'title') }}>
                                            {typeObj[key].fields.map((field, i) => {
                                                return <option key={'option_'+i} value={field.title}>{field.title}</option>
                                            })}
                                        </Form.Select>
                                    </InputGroup>
                                    <Form.Label htmlFor="fields">Fields</Form.Label>
                                    {typeObj[key].fields.map((field, i) => {
                                        return (<InputGroup className="mb-3" key={'field_' + key + i}>
                                            <Form.Control id="fields" placeholder="Enter Field Name" value={field.title} onChange={(e) => { updateField(key, i, e.target.value, 'title') }} />
                                            <InputGroup.Text id="basic-addon2">
                                                <DropdownButton variant={'transparent'} id="dropdown-item-button" title={field.type}>
                                                    {fieldType.map((ele, j) => {
                                                        return <Dropdown.Item key={'dropdown_' + j} as="button" onClick={(e) => { updateField(key, i, ele, 'type') }}>{ele}</Dropdown.Item>
                                                    })}
                                                    <Dropdown.Item as="button" onClick={() => { deleteField(key, i) }}>remove</Dropdown.Item>
                                                </DropdownButton>
                                            </InputGroup.Text>
                                        </InputGroup>)
                                    })}
                                    <DropdownButton id="dropdown-item-button" title="Add Field">
                                        {fieldType.map((ele, j) => {
                                            return <Dropdown.Item key={'dropdown_' + j} as="button" onClick={() => { addField(key, ele) }}>{ele}</Dropdown.Item>
                                        })}
                                    </DropdownButton>
                                </Card.Body>
                            </Card>
                        </Col>)
                })}
                <Col xs={2}>
                    <Button variant="secondary" size="lg" onClick={addType}>
                        Add Type
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
export default Types;