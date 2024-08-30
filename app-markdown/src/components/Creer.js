import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ajouterFichier } from '../store/features/localstorage';

function Creer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function gererSubmit(e) {
    e.preventDefault();
    const type = e.target.type.value;
    const name = e.target.nom.value;
    const newFile = { id: Date.now(), name, type };
    dispatch(ajouterFichier(newFile));
    navigate('/liste');
  }

  return (
    <div>
      <h2>Créer Fichier/Dossier</h2>
      <form onSubmit={gererSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '.3em' }}>
        <label htmlFor="nom">Nom</label>
        <input type="text" name="nom" id="nom" required />
        <label htmlFor="type">Type</label>
        <select name="type" id="type">
          <option value="file">Fichier</option>
          <option value="folder">Dossier</option>
        </select>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default Creer;
