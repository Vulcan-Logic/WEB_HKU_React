import React, { Component } from 'react';
// import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';


class Menu extends Component {

//   onDishSelect(dish) {
//       this.setState({ selectedDish: dish});
//   }

  render() {
      const menu = this.props.dishes.map(
          // map applies each item in dishes and passes dish to the function in which it returns a 
          // property of each dish. 
          (dish) => {
            return (
                <div  className="col-12 col-md-5 m-1">
                    {/* <Card key={dish.id} onClick={() => this.onDishSelect(dish)}> */}
                    <Card key={dish.id} onClick={() => this.props.onClick(dish.id)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

      return (
          <div className="container">
              <div className="row">
                  {menu}
              </div>
              {/* <div> 
                <DishDetail dish={this.state.selectedDish}/> 
              </div>
               */}
          </div>
      );
  }
}

export default Menu;