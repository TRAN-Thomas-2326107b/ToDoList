import '../css/Header.css'

const Header = ({taches = []}) => {
    const nbTaches = taches.length;
    return (
        <div className='Header'>
            {nbTaches} Tâches
        </div>
    )
}

export default Header