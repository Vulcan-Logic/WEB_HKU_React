// changed into a functional component from DishdetailComponent.1.js
// written by Vineet W. Singh

import React, {Component} from 'react';
// import { Media } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const required = (val) => val && val.length;


function RenderDish(props) {
    return(
        <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <Card>
                <CardBody>
                    <CardImg top src={baseUrl+props.dish.image} alt={props.dish.name} />
                    <CardTitle>{props.dish.name}</CardTitle>
                    <CardText>{props.dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

class CommentForm extends Component {
    
    constructor(props){
        super(props);

        this.state={
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        }); 
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
        // this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
        alert('Current State is: ' + JSON.stringify(values));
    }

    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fas fa-pencil-alt"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                    <Label htmlFor="rating" md={3}>First Name</Label>
                                    <Col md={9}>
                                        <Control.select model=".rating" id="rating" name="rating"
                                        validators={{required}}>
                                            <option></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Control.select>
                                        <Errors 
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                            required: "Required - Please select a rating"
                                        }}
                                        />
                                    </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={3}>Your Name</Label>
                                <Col md={9}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={3}>Comment</Label>
                                <Col md={9}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:9, offset: 3}}>
                                    <Button type="submit" color="primary">
                                    SUBMIT
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>       
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderComments({comments, postComment, dishId}){
    return(
        <Card>
            <CardBody>
                <CardTitle><h4> Comments </h4></CardTitle>
                    <ul className="list-unstyled"> 
                        <CardText> 
                            <Stagger in>
                                { comments.map((comment)=>{                  
                                    return(
                                        <Fade in>
                                            <li key={comment.id}>                                        
                                                {comment.comment}    
                                                <br />                                      
                                                <small>
                                                -- {comment.author}, 
                                                        { new Intl.DateTimeFormat('en-US', 
                                                            { year: 'numeric', month: 'short', day: '2-digit'})
                                                            .format(new Date(Date.parse(comment.date)))
                                                        }  
                                                </small>
                                                <br />
                                            </li>
                                        </Fade>
                                    );})
                                }
                                <CommentForm dishId={dishId} postComment={postComment} />
                            </Stagger>
                        </CardText>
                    </ul> 
            </CardBody>
        </Card>
    );
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return(
            <div className="container">
                <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                </div>
                
                <div className="row">
                    <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr />
                            </div> 
                    </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} 
                        postComment={props.postComment}
                        dishId={props.dish.id} 
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default DishDetail;