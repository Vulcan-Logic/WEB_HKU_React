import React, { Component } from 'react';
// import { Media } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
  CardTitle } from 'reactstrap';

  class DishDetail extends Component {
    
    renderDish(dish) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }


    renderComments(dish){
        var commentBlock;
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        if (dish != null){
            const comments=dish.comments;
            if (comments!=null){
                commentBlock = comments.map(comment=>{
                    // var d = new Date(comment.date);
                    // var day=d.getDay();
                    // var year=d.getFullYear();
                    // var dateString=months[d.getMonth()] + " " + day +", " + year;
                    
                    return (
                        <li>                    
                            <p> {comment.comment} </p>
                            {/* <p> <sm> -- {comment.author}, {dateString} </sm>  </p> */}
                            <p> 
                                <sm> -- {comment.author}, 
                                    { new Intl.DateTimeFormat('en-US', 
                                        { year: 'numeric', month: 'short', day: '2-digit'})
                                        .format(new Date(Date.parse(comment.date)))
                                    } 
                                </sm>  
                            </p>                           
                            <p>  </p>
                        </li>
                    );
                });
            }
            else {
                commentBlock = "No comments on record";
            }

            return(
                <Card>
                    <CardBody>
                        <CardTitle><h4> Comments </h4></CardTitle>
                        <CardText> <ul className="list-unstyled">{commentBlock}</ul></CardText>
                    </CardBody>
                </Card>
            );
        }
        else
            return(
                <div></div>
            );
      }

    render() {
        return(
        <div className="row">
            <div  className="col-12 col-md-5 m-1">
                {this.renderDish(this.props.dish)}
            </div>
            <div  className="col-12 col-md-5 m-1">
                {this.renderComments(this.props.dish)}
            </div>
        </div>
        );
    }

  }

  export default DishDetail;