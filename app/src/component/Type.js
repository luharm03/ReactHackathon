
import React from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


const Type = (props) => {
    console.log(props)
    let typeObj = props.data.typeObj;
    let key = props.data.key;
    let fieldType = props.data.fieldType;
    return (
        <Col className={'mt-2'} sm key={'key_' + key} >
            <Card style={{ width: '18rem' }}>
                <Card.Header>
                    {typeObj[key].type}
                    <CloseButton onClick={() => { props.event({type:'deleteType',key}) }} className='float-end' />
                </Card.Header>
                <Card.Body>
                    <Form.Label htmlFor="obj-type">Object Type</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control id="obj-type" placeholder="Enter Type" value={typeObj[key].type} onChange={(e) => { props.event({type:'updateType',key, val: e.target.value,typeKey: 'type'}) }} />
                    </InputGroup>
                    <Form.Label htmlFor="obj-title">Object Title</Form.Label>

                    <InputGroup className="mb-3">
                        <Form.Select aria-label="Title" value={typeObj[key].title} onChange={(e) => { props.event({type:'updateType',key, val: e.target.value,typeKey: 'title'}) }}>
                            {typeObj[key].fields.map((field, i) => {
                                return <option key={'option_' + i} value={field.title}>{field.title}</option>
                            })}
                        </Form.Select>
                    </InputGroup>
                    <Form.Label htmlFor="fields">Fields</Form.Label>
                    {typeObj[key].fields.map((field, i) => {
                        return (<InputGroup className="mb-3" key={'field_' + key + i}>
                            <Form.Control id="fields" placeholder="Enter Field Name" value={field.title} onChange={(e) => { props.event({type:'updateField',key,index: i, val: e.target.value,  typeKey:'title'}) }} />
                            <InputGroup.Text id="basic-addon2">
                                <DropdownButton variant={'transparent'} id="dropdown-item-button" title={field.type}>
                                    {fieldType.map((ele, j) => {
                                        return <Dropdown.Item key={'dropdown_' + j} as="button" onClick={(e) => { props.event({type:'updateField',key,index: i, val:ele, typeKey:'type'}) }}>{ele}</Dropdown.Item>
                                    })}
                                    <Dropdown.Item as="button" onClick={() => { props.event({type:'deleteField',key,index: i }) }}>remove</Dropdown.Item>
                                </DropdownButton>
                            </InputGroup.Text>
                        </InputGroup>)
                    })}
                    <DropdownButton id="dropdown-item-button" title="Add Field">
                        {fieldType.map((ele, j) => {
                            return <Dropdown.Item key={'dropdown_' + j} as="button" onClick={() => { props.event({type:'addField',key, typeKey: ele}) }}>{ele}</Dropdown.Item>
                        })}
                    </DropdownButton>
                </Card.Body>
            </Card>
        </Col>
    );
}
export default Type;