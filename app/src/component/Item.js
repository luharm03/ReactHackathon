
import React from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';


const Item = (props) => {
    let item = props.data.item;
    let index = props.data.index;
    let key = props.data.key;
    let ft = props.data.ft;
    return (
        <Col className={'mt-2'} sm >
            <Card style={{ width: '18rem' }}>
                <Card.Header>
                    {props.data.typeObj[key].type + ' - ' + (item[ft.id] ? item[ft.id] : 'No title')}
                    <CloseButton onClick={() => { props.event({type:'deleteItem',key, index}) }} className='float-end' />
                </Card.Header>
                <Card.Body>
                    {props.data.fields.map((field, j) => {
                        return (<InputGroup className="mb-3" key={'field_' + key + j}>
                            {field.type === 'checkbox' ?
                                <Form.Check
                                    type={'checkbox'}
                                    id={`default-${field.title}`}
                                    label={field.title}
                                    defaultChecked={item[field.id]}
                                    onClick={(e) => { props.event({type:'updateItem',key, index, val:e.target.checked, typeKey:field.id}) }}
                                />
                                :
                                <>
                                    <Form.Label htmlFor="obj-type">{field.title}</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control type={field.type} id="obj-type" placeholder={'Enter ' + field.title} value={item[field.id]} onChange={(e) => { props.event({type:'updateItem',key, index, val:e.target.value, typeKey:field.id}) }} />
                                    </InputGroup></>
                            }
                        </InputGroup>)
                    })}
                </Card.Body>
            </Card>
        </Col>
    );
}
export default Item;