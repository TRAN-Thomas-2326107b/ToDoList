import './Header.css';
import Chart from '../Chart/Chart';

const Header = ({ taches = [] }) => {
    const nbTaches = taches.length;
    const nbTachesNonTerminees = taches.filter(tache => tache.etat !== "Reussi").length;

    return (
        <div className='Header'>
            <div className="header-info">
                <span>{nbTaches} Tâches - {nbTachesNonTerminees} En cours</span>
            </div>
            <div className="header-chart">
                <Chart taches={taches} />
            </div>
        </div>
    );
};

export default Header;
