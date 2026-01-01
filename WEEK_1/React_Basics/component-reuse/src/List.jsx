function List(){
    const cars = [{name:"innova", colour:"silver"},
                  {name:"elvate",colour:"black"},
                  {name:"virtus",colour:"red"},
                  {name:"hilux",colour:"blue"},
                  {name:"defender",colour:"grey"}];
    const listItems = cars.map(car => <li key={car.name}>{car.name}: &nbsp;<b>{car.colour}</b></li>)
    return(<ol>{listItems}</ol>)
}

export default List;