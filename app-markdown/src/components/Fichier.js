import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { renommerFichier, supprimerFichier } from '../store/features/localstorage';

function Fichier() {
  const navigate = useNavigate();
  const { fichierId } = useParams();
  const fichiers = useSelector((state) => state.storage.data.files);
  const dispatch = useDispatch();
  const [fichier, setFichier] = useState({});

  useEffect(() => {
    setFichier(fichiers.find(({ id }) => id === parseInt(fichierId)));
  }, [fichiers]);

  function gererNom() {
    const nouveauNom = window.prompt('Nouveau nom ?', fichier.name);
    if (nouveauNom) dispatch(renommerFichier({ id: fichier.id, newName: nouveauNom }));
  }

  function gererSuppressionFichier() {
    if (window.confirm('Supprimer le fichier/dossier ?')) {
      dispatch(supprimerFichier(fichier.id));
      navigate('/liste');
    }
  }

  return (
    <div>
      <h2>Fichier/Dossier: {fichier.name}</h2>
      <div>
        <h3>Actions</h3>
        <button onClick={gererNom}>Renommer</button>
        <button onClick={gererSuppressionFichier}>Supprimer</button>
      </div>
    </div>
  );
}

export default Fichier;
