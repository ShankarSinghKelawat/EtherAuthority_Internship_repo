function Cards(props){
    return(
        <div className="card">
        <img className='card-image' src={props.carImage}></img>
        <h2 className='card-title'>{props.title}</h2>
        <p className='card-text'>{props.para}</p>
        </div>
    );
}

export default Cards;